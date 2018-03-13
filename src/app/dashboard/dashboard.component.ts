import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {Breadcrumb} from '../utility/breadcrumb';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private breadcrumbsService: BreadcrumbsService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb('/dashboard', 'COMMON.DASHBOARD', true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
  }

}
