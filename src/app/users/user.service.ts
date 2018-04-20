import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UsersResponse} from './usersResponse';
import {User} from './user';
import {RoleEnum} from './role.enum';
import {Company} from '../companies/company';
import {ResponseConverterService} from '../utility/response-converter.service';

@Injectable()
export class UserService {

  getUsers(page: number, limit: number): Observable<UsersResponse> {
    let params = new HttpParams();
    params = params.append('page', (page - 1).toString());
    params = params.append('limit', limit.toString());

    return this.http.get<any>(`${environment.apiEndpoint}/users`, {params: params}).map(response =>
      new UsersResponse(response._embedded.users, response.page.totalElements));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<any>(`${environment.apiEndpoint}/users/${id}`).map(ResponseConverterService.toUser);
  }

  replaceUser(user: User): Observable<User> {
    return this.http.put<any>(`${environment.apiEndpoint}/users/${user.id}`, user).map(ResponseConverterService.toUser);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<any>(`${environment.apiEndpoint}/users/${user.id}`, user).map(ResponseConverterService.toUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiEndpoint}/users/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(`${environment.apiEndpoint}/users`, user).map(ResponseConverterService.toUser);
  }

  getUsersByRole(role: RoleEnum): Observable<Array<User>> {
    let params = new HttpParams();
    params = params.append('role', role);
    return this.http.get<any>(`${environment.apiEndpoint}/users/search/findAllByRolesName`, {params: params})
      .map(response => response._embedded.users.map(ResponseConverterService.toUser));
  }

  getUserCompanies(userId: number): Observable<Array<Company>> {
    return this.http.get<any>(`${environment.apiEndpoint}/users/${userId}/companies`)
      .map(response => response._embedded.companies.map(ResponseConverterService.toCompany));
  }

  constructor(private http: HttpClient) {
  }

}
