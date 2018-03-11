import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';
import {Gender} from '../gender.enum';
import {Role} from '../role';
import {RoleEnum} from '../role.enum';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {globals} from '../../globals';

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

  constructor(private route: ActivatedRoute, private userService: UserService) {
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => this.user = user);
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

}
