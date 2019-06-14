import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Category} from './category';
import {Service} from './service';
import {AppConfig} from '../app-config.service';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient, private appConfig: AppConfig) {
  }

  getCategories(): Observable<Array<Category>> {
    let params = new HttpParams();
    params = params.append('limit', '1000');
    params = params.append('sort', 'name');

    return this.http.get<any>(`${this.appConfig.api}/categories`, {params: params})
      .pipe(map(response => response._embedded.categories.map(Category.buildFromResponse)));
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.patch<any>(`${this.appConfig.api}/categories/${category.id}`, category).pipe(map(Category.buildFromResponse));
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${this.appConfig.api}/categories/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<any>(`${this.appConfig.api}/categories`, category).pipe(map(Category.buildFromResponse));
  }

  getServicesByCategoryId(categoryId: number): Observable<Array<Service>> {
    let params = new HttpParams();
    params = params.append('id', categoryId.toString());

    return this.http.get<any>(`${this.appConfig.api}/services/search/findAllByCategory_IdOrderByNameAsc`, {params: params})
      .pipe(map(response => response._embedded.services.map(Service.buildFromResponse)));
  }

  createService(service: Service): Observable<Service> {
    const body = {
      id: service.id,
      name: service.name,
      description: service.description,
      category: service.category ? `${this.appConfig.api}/category/${service.category.id}` : undefined
    };
    return this.http.post<any>(`${this.appConfig.api}/services`, body).pipe(map(Service.buildFromResponse));
  }

  updateService(service: Service): Observable<Service> {
    return this.http.patch<any>(`${this.appConfig.api}/services/${service.id}`, service).pipe(map(Service.buildFromResponse));
  }

  deleteService(serviceId: number): Observable<any> {
    return this.http.delete<any>(`${this.appConfig.api}/services/${serviceId}`);
  }

  getCategoriesWithServices(): Observable<Array<Category>> {
    return this.http.get<any>(`${this.appConfig.api}/categories-with-services`)
      .pipe(map(response => {
        return response.map(category => {
          return new Category(category.id, category.name, category.description, category.services.map(service => {
            return new Service(service.id, service.name, service.description, null);
          }));
        });
      }));
  }

}
