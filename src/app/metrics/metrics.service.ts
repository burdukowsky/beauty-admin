import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AdminMetrics} from './adminMetrics';
import {MemberMetrics} from './memberMetrics';
import {AppConfig} from '../app-config.service';

@Injectable()
export class MetricsService {

  constructor(private http: HttpClient, private appConfig: AppConfig) {
  }

  getAdminMetrics(): Observable<AdminMetrics> {
    return this.http.get<any>(`${this.appConfig.api}/metrics/admin`).pipe(map(AdminMetrics.buildFromResponse));
  }

  getMemberMetrics(): Observable<MemberMetrics> {
    return this.http.get<any>(`${this.appConfig.api}/metrics/member`).pipe(map(MemberMetrics.buildFromResponse));
  }

}
