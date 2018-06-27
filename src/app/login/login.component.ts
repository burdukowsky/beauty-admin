import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {HttpResponse} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {globals} from '../globals';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  form: FormGroup;
  languagesClasses = {};
  errorMessage: boolean;
  private _error = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              public translate: TranslateService) {
    this.languagesClasses[globals.languageCodes.ru] = 'flag-icon-ru';
    this.languagesClasses[globals.languageCodes.en] = 'flag-icon-us';
  }

  ngOnInit() {
    this._error.subscribe((state) => this.errorMessage = state);
    debounceTime.call(this._error, globals.alertTimeout).subscribe(() => this.errorMessage = false);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.auth.loggedIn()) {
      this.router.navigateByUrl(this.returnUrl);
    }

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value)
        .subscribe(
          (response: HttpResponse<any>) => {
            /**
             * Если успешно авторизовались, то удалим информацию о старом userId
             */
            localStorage.removeItem(globals.localStorageKeys.userId);
            /**
             * Затем сохраним access_token и пустим на сайт
             */
            const authorizationHeader: string = response.headers.get('Authorization');
            localStorage.setItem(globals.localStorageKeys.accessToken, authorizationHeader.split(' ')[1]);
            this.router.navigateByUrl(this.returnUrl);
          },
          error => {
            this._error.next(true);
            console.error(error);
          }
        );
    }
  }

  onLanguageSelect(value) {
    localStorage.setItem(globals.localStorageKeys.language, value);
    this.translate.use(value);
  }
}
