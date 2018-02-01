import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';

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
    ReplaceDirective
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080']
      }
    }),
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
