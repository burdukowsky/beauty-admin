import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../companies/company.service';
import {BreadcrumbsService} from '../../utility/breadcrumbs.service';
import {Subject} from 'rxjs/Subject';
import {Company} from '../../companies/company';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {globals} from '../../globals';
import {Breadcrumb} from '../../utility/breadcrumb';
import {Location} from '@angular/common';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../users/user';
import {Role} from '../../users/role';
import {Gender} from '../../users/gender.enum';
import {RoleEnum} from '../../users/role.enum';
import {CompanyType} from '../../companies/companyType.enum';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
  company: Company;
  companyTypes = CompanyType;
  companyTypesKeys = Object.keys(this.companyTypes);
  loadErrorMessage: boolean;
  successMessage: boolean;
  errorMessage: boolean;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private companyService: CompanyService,
              private authService: AuthService,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.loadErrorMessage = false;
    this._success.subscribe((state) => this.successMessage = state);
    this._error.subscribe((state) => this.errorMessage = state);
    debounceTime.call(this._success, globals.alertTimeout).subscribe(() => this.successMessage = false);
    debounceTime.call(this._error, globals.alertTimeout).subscribe(() => this.errorMessage = false);

    this.getCompany();
  }

  getCompany(): void {
    if (this.router.url === '/new-my-company') {
      this.company = new Company(null, '', '', '', '', '', '', CompanyType.Salon, null);
      const breadcrumbs: Array<Breadcrumb> = [
        new Breadcrumb('/my-companies', 'COMMON.MY_COMPANIES', true, false),
        new Breadcrumb(null, 'COMMON.ADD', true, true)
      ];
      this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompany(id).subscribe(company => {
        this.company = company;
        const breadcrumbs: Array<Breadcrumb> = [
          new Breadcrumb('/my-companies', 'COMMON.MY_COMPANIES', true, false),
          new Breadcrumb(null, this.company.name, false, true)
        ];
        this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
      },
      error => {
        console.error(error);
        this.loadErrorMessage = true;
      });
  }

  delete(): void {
    this.companyService.deleteCompany(this.company.id).subscribe(response => {
      this.location.back();
    }, error => {
      this._error.next(true);
      console.error(error);
    });
  }

  onSubmit(): void {
    if (this.company.id === null) {
      this.authService.getUserId().subscribe(userId => {
        this.company.owner = new User(userId, '', '', '', '', '', null, Gender.Unknown, [new Role(RoleEnum.Member)]);
        this.companyService.createCompany(this.company).subscribe(company => {
          this.location.back();
        }, error => {
          this._error.next(true);
          console.error(error);
        });
      }, error => {
        this._error.next(true);
        console.error(error);
      });
      return;
    }
    this.companyService.updateCompany(this.company).subscribe(company => {
      this._success.next(true);
    }, error => {
      this._error.next(true);
      console.error(error);
    });
  }

}
