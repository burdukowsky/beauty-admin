import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UsersResponse} from './usersResponse';
import {User} from './user';
import {RoleEnum} from './role.enum';
import {AppConfig} from '../app-config.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private appConfig: AppConfig) {
  }

  getUsers(page: number, limit: number): Observable<UsersResponse> {
    let params = new HttpParams();
    params = params.append('page', (page - 1).toString());
    params = params.append('limit', limit.toString());
    params = params.append('sort', 'email');

    return this.http.get<any>(`${this.appConfig.api}/users`, {params: params}).pipe(map(response =>
      new UsersResponse(response._embedded.users, response.page.totalElements)));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<any>(`${this.appConfig.api}/users/${id}`).pipe(map(User.buildFromResponse));
  }

  replaceUser(user: User): Observable<User> {
    return this.http.put<any>(`${this.appConfig.api}/users/${user.id}`, user).pipe(map(User.buildFromResponse));
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<any>(`${this.appConfig.api}/users/${user.id}`, user).pipe(map(User.buildFromResponse));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.appConfig.api}/users/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(`${this.appConfig.api}/users`, user).pipe(map(User.buildFromResponse));
  }

  getUsersByRole(role: RoleEnum): Observable<Array<User>> {
    let params = new HttpParams();
    params = params.append('role', role);
    return this.http.get<any>(`${this.appConfig.api}/users/search/findAllByRolesNameOrderByFirstNameAscLastNameAsc`, {params: params})
      .pipe(map(response => response._embedded.users.map(User.buildFromResponse)));
  }

}
