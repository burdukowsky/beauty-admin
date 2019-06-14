import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {debounceTime} from 'rxjs/operators';

import {globals} from '../../globals';
import {BreadcrumbsService} from '../../utility/breadcrumbs.service';
import {Breadcrumb} from '../../utility/breadcrumb';
import {User} from 'app/users/user';
import {UserService} from '../../users/user.service';
import {RoleEnum} from '../../users/role.enum';
import {Gender} from '../../users/gender.enum';
import {Role} from '../../users/role';
import {CompanyType} from '../companyType.enum';
import {Company} from '../company';
import {CompanyService} from '../company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyTypes = CompanyType;
  companyTypesKeys = Object.keys(this.companyTypes);
  company: Company;
  originalRating: number = null;
  ownerId: string;
  members: Array<User>;
  loadErrorMessage: boolean;
  successMessage: boolean;
  errorMessage: boolean;
  image: File = null;
  imagePrefix: string = globals.imagePrefix;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();
  errorSubmitRatingMessage: boolean;
  private _errorSubmitRating = new Subject<boolean>();
  errorSubmitImageMessage: boolean;
  private _errorSubmitImage = new Subject<boolean>();

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
    this._success.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.successMessage = false);

    this._error.subscribe((state) => this.errorMessage = state);
    this._error.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorMessage = false);

    this._errorSubmitRating.subscribe((state) => this.errorSubmitRatingMessage = state);
    this._errorSubmitRating.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorSubmitRatingMessage = false);

    this._errorSubmitImage.subscribe((state) => this.errorSubmitImageMessage = state);
    this._errorSubmitImage.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorSubmitImageMessage = false);

    this.getCompany();
    this.getMembers();
  }

  getCompany(): void {
    if (this.router.url === '/new-company') {
      this.company = new Company(null, '', '', '', '', '', '', null, null, CompanyType.Salon, null);
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
        this.originalRating = company.rating;
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

  public submitRating(): void {
    this.companyService.setRatingForCompany(this.company.id, this.company.rating).subscribe(response => {
      this.originalRating = this.company.rating;
    }, error => {
      this._errorSubmitRating.next(true);
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
