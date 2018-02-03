import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {globals} from '../globals';

@Injectable()
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService, private http: HttpClient, private router: Router) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
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
    return this.http.post(environment.apiEndpoint + '/login', user, {responseType: 'text', observe: 'response'})
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  logout() {
    localStorage.removeItem(globals.localStorageKeys.accessToken);
    this.router.navigateByUrl('login');
  }

}
