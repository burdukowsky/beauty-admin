import {Component, OnInit} from '@angular/core';
import {Company} from '../company';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CompanyService} from '../company.service';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {globals} from '../../globals';
import {BreadcrumbsService} from '../../utility/breadcrumbs.service';
import {Breadcrumb} from '../../utility/breadcrumb';
import {User} from 'app/users/user';
import {UserService} from '../../users/user.service';
import {RoleEnum} from '../../users/role.enum';
import {Gender} from '../../users/gender.enum';
import {Role} from '../../users/role';
import {CompanyType} from '../companyType.enum';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyTypes = CompanyType;
  companyTypesKeys = Object.keys(this.companyTypes);
  company: Company;
  ownerId: string;
  members: Array<User>;
  loadErrorMessage: boolean;
  successMessage: boolean;
  errorMessage: boolean;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private companyService: CompanyService,
              private userService: UserService,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.loadErrorMessage = false;
    this._success.subscribe((state) => this.successMessage = state);
    this._error.subscribe((state) => this.errorMessage = state);
    debounceTime.call(this._success, globals.alertTimeout).subscribe(() => this.successMessage = false);
    debounceTime.call(this._error, globals.alertTimeout).subscribe(() => this.errorMessage = false);

    this.getCompany();
    this.getMembers();
  }

  getCompany(): void {
    if (this.router.url === '/new-company') {
      this.company = new Company(null, '', '', CompanyType.Salon, null);
      this.company.owner = new User(null, '', '', '', '', '', null, Gender.Unknown, [new Role(RoleEnum.Member)]);
      const breadcrumbs: Array<Breadcrumb> = [
        new Breadcrumb('/companies', 'COMMON.COMPANIES', true, false),
        new Breadcrumb(null, 'COMMON.ADD', true, true)
      ];
      this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompany(id).subscribe(company => {
        this.company = company;
        const breadcrumbs: Array<Breadcrumb> = [
          new Breadcrumb('/companies', 'COMMON.COMPANIES', true, false),
          new Breadcrumb(null, this.company.name, false, true)
        ];
        this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
        this.companyService.getCompanyOwner(this.company.id).subscribe(owner => {
            this.ownerId = String(owner.id);
            this.company.owner = owner;
          },
          error => {
            console.error(error);
            this.loadErrorMessage = true;
          });
      },
      error => {
        console.error(error);
        this.loadErrorMessage = true;
      });
  }

  getMembers(): void {
    this.userService.getUsersByRole(RoleEnum.Member).subscribe(users => {
        this.members = users;
      },
      error => {
        console.error(error);
        this.loadErrorMessage = true;
      });
  }

  setNewOwner(userId: string): void {
    this.company.owner = this.members.find(user => user.id === Number(userId));
  }

  public onSubmit() {
    if (this.company.id === null) {
      this.companyService.createCompany(this.company).subscribe(company => {
          this.location.back();
        },
        error => {
          this._error.next(true);
          console.error(error);
        });
      return;
    }
    this.companyService.updateCompany(this.company).subscribe(company => {
        this._success.next(true);
      },
      error => {
        this._error.next(true);
        console.error(error);
      });
  }

  public delete(): void {
    this.companyService.deleteCompany(this.company.id).subscribe(response => {
      this.location.back();
    }, error => {
      this._error.next(true);
      console.error(error);
    });
  }

}
