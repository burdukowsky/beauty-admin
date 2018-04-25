import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Category} from './category';
import {environment} from '../../environments/environment';

@Injectable()
export class CategoryService {

  getCategories(): Observable<Array<Category>> {
    let params = new HttpParams();
    params = params.append('limit', '1000');

    return this.http.get<any>(`${environment.apiEndpoint}/categories`, {params: params}).map(response => {
      return response._embedded.categories.map(Category.buildFromResponse);
    });
  }

  constructor(private http: HttpClient) {
  }

}
