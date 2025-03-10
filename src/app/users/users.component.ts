import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Breadcrumb} from '../utility/breadcrumb';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  itemsPerPage: number;
  currentPage: number;
  startPage: number;
  totalUsers: number;
  loadErrorMessage: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
              private breadcrumbsService: BreadcrumbsService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.USERS', true, true)
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
      this.getUsers();
    });
  }

  private getUsers(): void {
    this.userService.getUsers(this.currentPage, this.itemsPerPage).subscribe(usersResponse => {
      this.users = usersResponse.users;
      this.totalUsers = usersResponse.total;
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

  public pageChanged(event): void {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['page'] = event;
    this.router.navigate(['users'], {queryParams: queryParams});
  }

}
