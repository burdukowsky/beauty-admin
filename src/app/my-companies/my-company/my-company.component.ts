import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {Company} from '../../companies/company';
import {globals} from '../../globals';
import {Breadcrumb} from '../../utility/breadcrumb';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../users/user';
import {Role} from '../../users/role';
import {Gender} from '../../users/gender.enum';
import {RoleEnum} from '../../users/role.enum';
import {CompanyType} from '../../companies/companyType.enum';
import {CompanyService} from '../../companies/company.service';
import {BreadcrumbsService} from '../../utility/breadcrumbs.service';

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
  image: File = null;
  imagePrefix: string = globals.imagePrefix;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();
  errorSubmitImageMessage: boolean;
  private _errorSubmitImage = new Subject<boolean>();

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
    this._success.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.successMessage = false);

    this._error.subscribe((state) => this.errorMessage = state);
    this._error.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorMessage = false);

    this._errorSubmitImage.subscribe((state) => this.errorSubmitImageMessage = state);
    this._errorSubmitImage.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorSubmitImageMessage = false);

    this.getCompany();
  }

  getCompany(): void {
    if (this.router.url === '/new-my-company') {
      this.company = new Company(null, '', '', '', '', '', '', null, null, CompanyType.Salon, null);
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

  public handleImageInput(files: FileList): void {
    this.image = files.item(0);
  }

  public updateImage(): void {
    this.companyService.updateCompanyImage(this.company.id, this.image).subscribe(response => {
      this.company.image = response.image;
      this.image = null;
    }, error => {
      this._errorSubmitImage.next(true);
      console.error(error);
    });
  }

}
