import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UsersResponse} from './usersResponse';
import {User} from './user';
import {Role} from './role';

@Injectable()
export class UserService {

  private toUser(response: any): User {
    return new User(response.id, response.email, response.password, response.firstName, response.middleName, response.lastName,
      response.dateBirth, response.gender, response.roles.map(role => new Role(role.name)));
  }

  getUsers(page: number, limit: number): Observable<UsersResponse> {
    let params = new HttpParams();
    params = params.append('page', (page - 1).toString());
    params = params.append('limit', limit.toString());

    return this.http.get<any>(`${environment.apiEndpoint}/users`, {params: params}).map(response =>
      new UsersResponse(response._embedded.users, response.page.totalElements));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<any>(`${environment.apiEndpoint}/users/${id}`).map(this.toUser);
  }

  replaceUser(user: User): Observable<User> {
    return this.http.put<any>(`${environment.apiEndpoint}/users/${user.id}`, user).map(this.toUser);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<any>(`${environment.apiEndpoint}/users/${user.id}`, user).map(this.toUser);
  }

  constructor(private http: HttpClient) {
  }

}
