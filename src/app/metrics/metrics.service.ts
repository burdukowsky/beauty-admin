import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AdminMetrics} from './adminMetrics';
import {environment} from '../../environments/environment';
import {MemberMetrics} from './memberMetrics';

@Injectable()
export class MetricsService {

  getAdminMetrics(): Observable<AdminMetrics> {
    return this.http.get<any>(`${environment.apiEndpoint}/metrics/admin`).pipe(map(AdminMetrics.buildFromResponse));
  }

  getMemberMetrics(): Observable<MemberMetrics> {
    return this.http.get<any>(`${environment.apiEndpoint}/metrics/member`).pipe(map(MemberMetrics.buildFromResponse));
  }

  constructor(private http: HttpClient) {
  }

}
