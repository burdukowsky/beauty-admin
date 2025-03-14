import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../../../utility/breadcrumbs.service';
import {Breadcrumb} from '../../../utility/breadcrumb';
import {User} from '../../user';
import {Company} from '../../../companies/company';
import {UserService} from '../../user.service';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../../../companies/company.service';

@Component({
  selector: 'app-user-companies',
  templateUrl: './user-companies.component.html',
  styleUrls: ['./user-companies.component.scss']
})
export class UserCompaniesComponent implements OnInit {
  user: User;
  companies: Array<Company>;
  loadErrorMessage: boolean;

  constructor(private breadcrumbsService: BreadcrumbsService,
              private userService: UserService,
              private companyService: CompanyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadErrorMessage = false;
    this.getData();
  }

  getData(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;

      const breadcrumbs: Array<Breadcrumb> = [
        new Breadcrumb('/users', 'COMMON.USERS', true, false),
        new Breadcrumb(`/users/${this.user.id}`, this.user.getFullName(), false, false),
        new Breadcrumb(null, 'USER.USER_COMPANIES', true, true)
      ];
      this.breadcrumbsService.setBreadcrumbs(breadcrumbs);

      this.companyService.getCompaniesByOwnerId(userId).subscribe(companies => {
        this.companies = companies;
      }, error => {
        console.error(error);
        this.loadErrorMessage = true;
      });
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

}
