import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CompaniesResponse} from './companiesResponse';
import {Company} from './company';
import {User} from '../users/user';
import {Service} from '../categories/service';
import {AppConfig} from '../app-config.service';

interface CompanyRest {
  id: number;
  name: string;
  description: string;
  timetable: string;
  site: string;
  phone: string;
  address: string;
  rating: number;
  image: string;
  companyType: string;
  owner: string;
}

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient, private appConfig: AppConfig) {
  }

  private getCompanyRest(company: Company): CompanyRest {
    return {
      id: company.id,
      name: company.name,
      description: company.description,
      timetable: company.timetable,
      site: company.site,
      phone: company.phone,
      address: company.address,
      rating: company.rating,
      image: company.image,
      companyType: company.companyType,
      owner: company.owner ? `${this.appConfig.api}/users/${company.owner.id}` : undefined
    };
  }

  getCompanies(page: number, limit: number): Observable<CompaniesResponse> {
    let params = new HttpParams();
    params = params.append('page', (page - 1).toString());
    params = params.append('limit', limit.toString());
    params = params.append('sort', 'name');

    return this.http.get<any>(`${this.appConfig.api}/companies`, {params: params})
      .pipe(map(response => new CompaniesResponse(response._embedded.companies, response.page.totalElements)));
  }

  getCompaniesByOwnerId(ownerId: number): Observable<Array<Company>> {
    let params = new HttpParams();
    params = params.append('id', ownerId.toString());

    return this.http.get<any>(`${this.appConfig.api}/companies/search/findAllByOwner_IdOrderByNameAsc`, {params: params})
      .pipe(map(response => response._embedded.companies.map(Company.buildFromResponse)));
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<any>(`${this.appConfig.api}/companies/${id}`).pipe(map(Company.buildFromResponse));
  }

  getCompanyOwner(companyId: number): Observable<User> {
    return this.http.get(`${this.appConfig.api}/companies/${companyId}/owner`).pipe(map(User.buildFromResponse));
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.patch<any>(`${this.appConfig.api}/companies/${company.id}`, this.getCompanyRest(company))
      .pipe(map(Company.buildFromResponse));
  }

  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete<any>(`${this.appConfig.api}/companies/${companyId}`);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<any>(`${this.appConfig.api}/companies`, this.getCompanyRest(company)).pipe(map(Company.buildFromResponse));
  }

  getServicesByCompanyId(companyId: number): Observable<Array<Service>> {
    return this.http.get<any>(`${this.appConfig.api}/companies/${companyId}/services`)
      .pipe(map(response => response._embedded.services.map(Service.buildFromResponse)));
  }

  replaceCompanyServices(companyId: number, servicesIds: Array<number>): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'text/uri-list');
    const body: string = servicesIds.map(id => `${this.appConfig.api}/services/${id}`).join('\n');
    return this.http.put(`${this.appConfig.api}/companies/${companyId}/services`, body, {headers: headers});
  }

  setRatingForCompany(companyId: number, rating: number): Observable<any> {
    return this.http.patch<any>(`${this.appConfig.api}/companies/${companyId}/rating`, {value: rating});
  }

  updateCompanyImage(companyId: number, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this.http.patch<any>(`${this.appConfig.api}/companies/${companyId}/image`, formData);
  }

}
