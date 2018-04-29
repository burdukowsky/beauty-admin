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

  updateCategory(category: Category): Observable<Category> {
    return this.http.patch<any>(`${environment.apiEndpoint}/categories/${category.id}`, category)
      .map(Category.buildFromResponse);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiEndpoint}/categories/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<any>(`${environment.apiEndpoint}/categories`, category).map(Category.buildFromResponse);
  }

  constructor(private http: HttpClient) {
  }

}
