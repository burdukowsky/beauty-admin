import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {Breadcrumb} from '../utility/breadcrumb';
import {globals} from '../globals';
import {User} from '../users/user';
import {AuthService} from '../auth/auth.service';
import {Gender} from '../users/gender.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  genders = Gender;
  gendersKeys: Array<string>;
  ngbDatepickerConfig = globals.ngbDatepickerConfig;
  loadErrorMessage: boolean;
  successMessage: boolean;
  errorMessage: boolean;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();

  constructor(private breadcrumbsService: BreadcrumbsService, private authService: AuthService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.PROFILE', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);

    this.gendersKeys = Object.keys(this.genders);
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    this._success.subscribe((state) => this.successMessage = state);
    this._success.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.successMessage = false);

    this._error.subscribe((state) => this.errorMessage = state);
    this._error.pipe(debounceTime(globals.alertTimeout)).subscribe(() => this.errorMessage = false);

    this.getUser();
  }

  getUser(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

  onSubmit(): void {
    if (this.user.password === '') {
      this.user.password = undefined;
    }
    this.authService.updateUser(this.user).subscribe(user => {
        this.user = user;
        this._success.next(true);
      },
      error => {
        this._error.next(true);
        console.error(error);
      });
  }

}
