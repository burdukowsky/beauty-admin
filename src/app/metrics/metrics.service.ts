import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AdminMetrics} from './adminMetrics';
import {environment} from '../../environments/environment';
import {ResponseConverterService} from '../utility/response-converter.service';

@Injectable()
export class MetricsService {

  getAdminMetrics(): Observable<AdminMetrics> {
    return this.http.get<any>(`${environment.apiEndpoint}/metrics/admin`).map(ResponseConverterService.toAdminMetrics);
  }

  constructor(private http: HttpClient) {
  }

}
