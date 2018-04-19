import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {Breadcrumb} from '../utility/breadcrumb';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private breadcrumbsService: BreadcrumbsService, public authService: AuthService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.DASHBOARD', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
  }

}
