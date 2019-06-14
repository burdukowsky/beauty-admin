import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CompaniesResponse} from './companiesResponse';
import {environment} from '../../environments/environment';
import {Company} from './company';
import {User} from '../users/user';
import {CompanyRest} from './companyRest';
import {Service} from '../categories/service';

@Injectable()
export class CompanyService {

  getCompanies(page: number, limit: number): Observable<CompaniesResponse> {
    let params = new HttpParams();
    params = params.append('page', (page - 1).toString());
    params = params.append('limit', limit.toString());
    params = params.append('sort', 'name');

    return this.http.get<any>(`${environment.apiEndpoint}/companies`, {params: params})
      .pipe(map(response => new CompaniesResponse(response._embedded.companies, response.page.totalElements)));
  }

  getCompaniesByOwnerId(ownerId: number): Observable<Array<Company>> {
    let params = new HttpParams();
    params = params.append('id', ownerId.toString());

    return this.http.get<any>(`${environment.apiEndpoint}/companies/search/findAllByOwner_IdOrderByNameAsc`, {params: params})
      .pipe(map(response => response._embedded.companies.map(Company.buildFromResponse)));
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<any>(`${environment.apiEndpoint}/companies/${id}`).pipe(map(Company.buildFromResponse));
  }

  getCompanyOwner(companyId: number): Observable<User> {
    return this.http.get(`${environment.apiEndpoint}/companies/${companyId}/owner`).pipe(map(User.buildFromResponse));
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.patch<any>(`${environment.apiEndpoint}/companies/${company.id}`, new CompanyRest(company))
      .pipe(map(Company.buildFromResponse));
  }

  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiEndpoint}/companies/${companyId}`);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<any>(`${environment.apiEndpoint}/companies`, new CompanyRest(company)).pipe(map(Company.buildFromResponse));
  }

  getServicesByCompanyId(companyId: number): Observable<Array<Service>> {
    return this.http.get<any>(`${environment.apiEndpoint}/companies/${companyId}/services`)
      .pipe(map(response => response._embedded.services.map(Service.buildFromResponse)));
  }

  replaceCompanyServices(companyId: number, servicesIds: Array<number>): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'text/uri-list');
    const body: string = servicesIds.map(id => `${environment.apiEndpoint}/services/${id}`).join('\n');
    return this.http.put(`${environment.apiEndpoint}/companies/${companyId}/services`, body, {headers: headers});
  }

  setRatingForCompany(companyId: number, rating: number): Observable<any> {
    return this.http.patch<any>(`${environment.apiEndpoint}/companies/${companyId}/rating`, {value: rating});
  }

  updateCompanyImage(companyId: number, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this.http.patch<any>(`${environment.apiEndpoint}/companies/${companyId}/image`, formData);
  }

  constructor(private http: HttpClient) {
  }

}
