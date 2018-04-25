import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from '../utility/breadcrumb';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {CompanyService} from '../companies/company.service';
import {Company} from '../companies/company';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.scss']
})
export class MyCompaniesComponent implements OnInit {
  companies: Array<Company>;
  loadErrorMessage: boolean;

  constructor(private breadcrumbsService: BreadcrumbsService, private companyService: CompanyService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.MY_COMPANIES', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
    this.loadErrorMessage = false;
    this.getCompanies();
  }

  private getCompanies() {
    this.companyService.getMyCompanies().subscribe(companies => {
      this.companies = companies;
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

}
