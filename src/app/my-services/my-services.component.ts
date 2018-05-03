import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from '../utility/breadcrumb';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {Company} from '../companies/company';
import {AuthService} from '../auth/auth.service';
import {CompanyService} from '../companies/company.service';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss']
})
export class MyServicesComponent implements OnInit {
  companies: Array<Company>;
  chosenCompany: Company;
  loadErrorMessage: boolean;

  constructor(private breadcrumbsService: BreadcrumbsService,
              private authService: AuthService,
              private companyService: CompanyService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.MY_SERVICES', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
    this.loadErrorMessage = false;
    this.getCompanies();
  }

  getCompanies(): void {
    this.authService.getUserId().subscribe(userId => {
      this.companyService.getCompaniesByOwnerId(userId).subscribe(companies => {
        this.companies = companies;
        if (this.companies.length > 0) {
          this.chosenCompany = this.companies[0];
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

  setChosenCompany(companyId: string): void {
    this.chosenCompany = this.companies.find(company => company.id === Number(companyId));
  }

}
