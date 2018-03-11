import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {globals} from '../globals';

@Injectable()
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService, private http: HttpClient, private router: Router) {
  }

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
    return !tokenExpired;
  }

  login(user: User) {
    return this.http.post(environment.apiEndpoint + '/login', user, {responseType: 'text', observe: 'response'});
  }

  logout() {
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

  hasAnyRole(roles: Array<string>) {
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

}
