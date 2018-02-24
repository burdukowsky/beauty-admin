import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './layout-elements/header/header.component';
import {
  SidebarComponent,
  AppSidebarNavDropdownComponent,
  AppSidebarNavItemComponent,
  AppSidebarNavLinkComponent,
  AppSidebarNavTitleComponent
} from './layout-elements/sidebar/sidebar.component';
import {BreadcrumbsComponent} from './layout-elements/breadcrumbs/breadcrumbs.component';
import {FooterComponent} from './layout-elements/footer/footer.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {AsideComponent} from './layout-elements/aside/aside.component';
import {
  SidebarToggleDirective,
  SidebarMinimizeDirective,
  BrandMinimizeDirective,
  MobileSidebarToggleDirective,
  AsideToggleDirective,
  NavDropdownDirective,
  NavDropdownToggleDirective,
  ReplaceDirective
} from './directives/layout/layout.directive';
import {environment} from '../environments/environment';
import {UtilityService} from './utility/utility.service';
import {globals} from './globals';
import {UsersComponent} from './users/users.component';
import {MyCompaniesComponent} from './my-companies/my-companies.component';
import {CompaniesComponent} from './companies/companies.component';
import {CategoriesComponent} from './categories/categories.component';
import {MyServicesComponent} from './my-services/my-services.component';
import {UserService} from './users/user.service';
import {NgxPaginationModule} from 'ngx-pagination';

export function tokenGetter() {
  return localStorage.getItem(globals.localStorageKeys.accessToken);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    AsideComponent,
    AppSidebarNavDropdownComponent,
    AppSidebarNavItemComponent,
    AppSidebarNavLinkComponent,
    AppSidebarNavTitleComponent,
    SidebarToggleDirective,
    SidebarMinimizeDirective,
    BrandMinimizeDirective,
    MobileSidebarToggleDirective,
    AsideToggleDirective,
    NavDropdownDirective,
    NavDropdownToggleDirective,
    ReplaceDirective,
    UsersComponent,
    MyCompaniesComponent,
    CompaniesComponent,
    CategoriesComponent,
    MyServicesComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [UtilityService.removeUrlProtocol(environment.apiEndpoint)]
      }
    }),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxPaginationModule
  ],
  providers: [AuthService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
