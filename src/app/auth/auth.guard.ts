import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {globals} from '../globals';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.loggedIn()) {
      const roles = next.data['roles'] as Array<string>;
      return (roles === undefined || this.auth.hasAnyRole(roles));
    }
    localStorage.removeItem(globals.localStorageKeys.accessToken);
    this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
