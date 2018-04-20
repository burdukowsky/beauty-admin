import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CompaniesResponse} from './companiesResponse';
import {environment} from '../../environments/environment';
import {Company} from './company';
import {User} from '../users/user';
import {CompanyRest} from './companyRest';
import {ResponseConverterService} from '../utility/response-converter.service';

@Injectable()
export class CompanyService {

  getCompanies(page: number, limit: number): Observable<CompaniesResponse> {
    let params = new HttpParams();
    params = params.append('page', (page - 1).toString());
    params = params.append('limit', limit.toString());

    return this.http.get<any>(`${environment.apiEndpoint}/companies`, {params: params}).map(response =>
      new CompaniesResponse(response._embedded.companies, response.page.totalElements));
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<any>(`${environment.apiEndpoint}/companies/${id}`).map(ResponseConverterService.toCompany);
  }

  getCompanyOwner(companyId: number): Observable<User> {
    return this.http.get(`${environment.apiEndpoint}/companies/${companyId}/owner`).map(ResponseConverterService.toUser);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.patch<any>(`${environment.apiEndpoint}/companies/${company.id}`, new CompanyRest(company))
      .map(ResponseConverterService.toCompany);
  }

  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiEndpoint}/companies/${companyId}`);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<any>(`${environment.apiEndpoint}/companies`, new CompanyRest(company))
      .map(ResponseConverterService.toCompany);
  }

  constructor(private http: HttpClient) {
  }

}
