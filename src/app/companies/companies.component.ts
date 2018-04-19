import {Component, OnInit} from '@angular/core';
import {Company} from './company';
import {CompanyService} from './company.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Breadcrumb} from '../utility/breadcrumb';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  itemsPerPage: number;
  currentPage: number;
  startPage: number;
  totalUsers: number;
  loadErrorMessage: boolean;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.COMPANIES', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);

    this.startPage = 1;
    this.currentPage = this.startPage;
    this.itemsPerPage = 10;
  }

  ngOnInit() {
    this.loadErrorMessage = false;
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] === undefined ? this.startPage : params['page'];
      this.getCompanies();
    });
  }

  private getCompanies(): void {
    this.companyService.getCompanies(this.currentPage, this.itemsPerPage).subscribe(companiesResponse => {
      this.companies = companiesResponse.companies;
      this.totalUsers = companiesResponse.total;
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

  public pageChanged(event): void {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['page'] = event;
    this.router.navigate(['companies'], {queryParams: queryParams});
  }
}
