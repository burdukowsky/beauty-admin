import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {Breadcrumb} from '../utility/breadcrumb';
import {AuthService} from '../auth/auth.service';
import {MetricsService} from '../metrics/metrics.service';
import {AdminMetrics} from '../metrics/adminMetrics';
import {MemberMetrics} from '../metrics/memberMetrics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adminMetrics: AdminMetrics;
  memberMetrics: MemberMetrics;
  loadErrorMessage: boolean;

  constructor(private breadcrumbsService: BreadcrumbsService, private metricsService: MetricsService, public authService: AuthService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.DASHBOARD', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    if (this.authService.hasRole('ADMIN')) {
      this.getAdminMetrics();
    }
    if (this.authService.hasRole('MEMBER')) {
      this.getMemberMetrics();
    }
  }

  private getAdminMetrics(): void {
    this.metricsService.getAdminMetrics().subscribe(adminMetrics => {
      this.adminMetrics = adminMetrics;
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

  private getMemberMetrics(): void {
    this.metricsService.getMemberMetrics().subscribe(memberMetrics => {
      this.memberMetrics = memberMetrics;
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

}
