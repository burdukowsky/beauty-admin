import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {UsersComponent} from './users/users.component';
import {MyCompaniesComponent} from './my-companies/my-companies.component';
import {CompaniesComponent} from './companies/companies.component';
import {CategoriesComponent} from './categories/categories.component';
import {MyServicesComponent} from './my-services/my-services.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'companies',
        component: CompaniesComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']}
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']}
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ADMIN']}
      },
      {
        path: 'my-companies',
        component: MyCompaniesComponent,
        canActivate: [AuthGuard],
        data: {roles: ['MEMBER']}
      },
      {
        path: 'my-services',
        component: MyServicesComponent,
        canActivate: [AuthGuard],
        data: {roles: ['MEMBER']}
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
