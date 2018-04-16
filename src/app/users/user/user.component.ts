import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import {User} from '../user';
import {Gender} from '../gender.enum';
import {Role} from '../role';
import {RoleEnum} from '../role.enum';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {globals} from '../../globals';
import {Breadcrumb} from '../../utility/breadcrumb';
import {BreadcrumbsService} from '../../utility/breadcrumbs.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  genders = Gender;
  gendersKeys;
  user: User;
  roles: Array<Role>;
  successMessage: boolean;
  errorMessage: boolean;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private userService: UserService,
              private breadcrumbsService: BreadcrumbsService) {
    this.gendersKeys = Object.keys(this.genders);
    this.roles = [new Role(RoleEnum.Admin), new Role(RoleEnum.Member)];
  }

  ngOnInit() {
    this._success.subscribe((state) => this.successMessage = state);
    this._error.subscribe((state) => this.errorMessage = state);
    debounceTime.call(this._success, globals.alertTimeout).subscribe(() => this.successMessage = false);
    debounceTime.call(this._error, globals.alertTimeout).subscribe(() => this.errorMessage = false);

    this.getUser();
  }

  private getUser(): void {
    if (this.router.url === '/new-user') {
      this.user = new User(null, '', '', '', '', '', null, Gender.Unknown, [new Role(RoleEnum.Member)]);
      const breadcrumbs: Array<Breadcrumb> = [
        new Breadcrumb('/users', 'COMMON.USERS', true, false),
        new Breadcrumb(null, 'COMMON.NEW', true, true)
      ];
      this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      const breadcrumbs: Array<Breadcrumb> = [
        new Breadcrumb('/users', 'COMMON.USERS', true, false),
        new Breadcrumb(null, this.user.getFullName(), false, true)
      ];
      this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
    });
  }

  public roleExists(role: Role): boolean {
    const jsonRoles = this.user.roles.map(value => JSON.stringify(value));
    const jsonCheckedRole = JSON.stringify(role);
    return jsonRoles.indexOf(jsonCheckedRole) !== -1;
  }

  public onRoleCheck(role: Role): void {
    const jsonRoles = this.user.roles.map(value => JSON.stringify(value));
    const jsonCheckedRole = JSON.stringify(role);
    const index = jsonRoles.indexOf(jsonCheckedRole);
    if (index === -1) {
      this.user.roles.push(role);
    } else {
      this.user.roles.splice(index, 1);
    }
  }

  public onSubmit() {
    if (this.user.id === null) {
      this.userService.createUser(this.user).subscribe(user => {
          this.location.back();
        },
        error => {
          this._error.next(true);
          console.error(error);
        });
      return;
    }
    if (this.user.password === '') {
      this.user.password = undefined;
    }
    this.userService.updateUser(this.user).subscribe(user => {
        this.user = user;
        this._success.next(true);
      },
      error => {
        this._error.next(true);
        console.error(error);
      });
  }

  public delete(): void {
    this.userService.deleteUser(this.user.id).subscribe(response => {
      this.location.back();
    }, error => {
      this._error.next(true);
      console.error(error);
    });
  }

}
