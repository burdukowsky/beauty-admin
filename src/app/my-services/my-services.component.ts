import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {Breadcrumb} from '../utility/breadcrumb';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {AuthService} from '../auth/auth.service';
import {CompanyService} from '../companies/company.service';
import {CategoryService} from '../categories/category.service';
import {Category} from '../categories/category';
import {Service} from '../categories/service';
import {CompanyWithServices} from '../companies/companyWithServices';
import {globals} from '../globals';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss']
})
export class MyServicesComponent implements OnInit {
  companies: Array<CompanyWithServices>;
  chosenCompany: CompanyWithServices;
  categories: Array<Category>;
  loadErrorMessage: boolean;
  successMessage: boolean;
  errorMessage: boolean;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();

  constructor(private breadcrumbsService: BreadcrumbsService,
              private authService: AuthService,
              private companyService: CompanyService,
              private categoryService: CategoryService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.MY_SERVICES', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    this._success.subscribe((state) => this.successMessage = state);
    this._success.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.successMessage = false);

    this._error.subscribe((state) => this.errorMessage = state);
    this._error.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorMessage = false);

    this.getCompanies();
    this.getCategories();
  }

  getCompanies(): void {
    this.authService.getUserId().subscribe(userId => {
      this.companyService.getCompaniesByOwnerId(userId).subscribe(companies => {
        this.companies = companies.map(company => new CompanyWithServices(company, null));
        if (this.companies.length > 0) {
          this.chosenCompany = this.companies[0];
          this.getServicesForChosenCompany();
        }
      }, error => {
        console.error(error);
        this.loadErrorMessage = true;
      });
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

  getCategories(): void {
    this.categoryService.getCategoriesWithServices().subscribe(categories => this.categories = categories);
  }

  setChosenCompany(companyId: string): void {
    this.chosenCompany = this.companies.find(company => company.id === Number(companyId));
    this.getServicesForChosenCompany();
  }

  getServicesForChosenCompany(): void {
    if (this.chosenCompany.services === null) {
      this.companyService.getServicesByCompanyId(this.chosenCompany.id).subscribe(services => {
        this.chosenCompany.services = services;
      }, error => {
        console.error(error);
        this.loadErrorMessage = true;
      });
    }
  }

  onServiceCheck(service: Service): void {
    const jsonServices = this.chosenCompany.services.map(value => JSON.stringify(value));
    const jsonCheckedService = JSON.stringify(service);
    const index = jsonServices.indexOf(jsonCheckedService);
    if (index === -1) {
      this.chosenCompany.services.push(service);
    } else {
      this.chosenCompany.services.splice(index, 1);
    }
  }

  serviceExistsInChosenCompany(service: Service): boolean {
    if (this.chosenCompany && this.chosenCompany.services) {
      const jsonServices = this.chosenCompany.services.map(value => JSON.stringify(value));
      const jsonCheckedService = JSON.stringify(service);
      return jsonServices.indexOf(jsonCheckedService) !== -1;
    }
    return false;
  }

  onSubmit(): void {
    this.companyService.replaceCompanyServices(this.chosenCompany.id, this.chosenCompany.services.map(service => service.id))
      .subscribe(response => {
        this._success.next(true);
      }, error => {
        this._error.next(true);
        console.error(error);
      });
  }

}
