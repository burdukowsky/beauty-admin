import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {globals} from '../globals';
import {User} from '../users/user';
import {Credentials} from './credentials';
import {AppConfig} from '../app-config.service';

@Injectable()
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService,
              private http: HttpClient,
              private router: Router,
              private appConfig: AppConfig) {
  }

  loggedIn(): boolean {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
    return !tokenExpired;
  }

  login(user: Credentials) {
    return this.http.post(this.appConfig.api + '/login', user, {responseType: 'text', observe: 'response'});
  }

  logout(): void {
    localStorage.removeItem(globals.localStorageKeys.userId);
    localStorage.removeItem(globals.localStorageKeys.accessToken);
    this.router.navigateByUrl('login');
  }

  hasRole(role: string): boolean {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const roles: string[] = this.jwtHelperService.decodeToken(token).roles.split(',');
    return roles.includes(globals.roleAuthorityPrefix + role);
  }

  hasAnyRole(roles: Array<string>): boolean {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const userRoles: string[] = this.jwtHelperService.decodeToken(token).roles.split(',');
    return roles.some(function (role) {
      return userRoles.includes(globals.roleAuthorityPrefix + role);
    });
  }

  getSubject(): string {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return null;
    }
    return this.jwtHelperService.decodeToken(token).sub;
  }

  getUser(): Observable<User> {
    return this.http.get<any>(`${this.appConfig.api}/account`).pipe(map(User.buildFromResponse));
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<any>(`${this.appConfig.api}/account`, user).pipe(map(User.buildFromResponse));
  }

  getUserId(): Observable<number> {
    return Observable.create(observer => {
      const userId: string = localStorage.getItem(globals.localStorageKeys.userId);
      if (userId !== null) {
        observer.next(Number(userId));
      } else {
        this.getUser().subscribe(user => {
          localStorage.setItem(globals.localStorageKeys.userId, String(user.id));
          observer.next(user.id);
        }, observer.error);
      }
    });
  }

}
