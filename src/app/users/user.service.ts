import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UsersResponse} from './usersResponse';

@Injectable()
export class UserService {

  getUsers(page: number, limit: number): Observable<UsersResponse> {
    let params = new HttpParams();
    params = params.append('page', (page - 1).toString());
    params = params.append('limit', limit.toString());

    return this.http.get<any>(`${environment.apiEndpoint}/users`, {params: params}).map(response =>
      new UsersResponse(response._embedded.users, response.page.totalElements));
  }

  constructor(private http: HttpClient) {
  }

}
