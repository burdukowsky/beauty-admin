import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Breadcrumb} from './breadcrumb';

@Injectable()
export class BreadcrumbsService {

  private breadcrumbsSource = new Subject<Array<Breadcrumb>>();
  public breadcrumbs$ = this.breadcrumbsSource.asObservable();

  public setBreadcrumbs(breadcrumbs: Array<Breadcrumb>): void {
    this.breadcrumbsSource.next(breadcrumbs);
  }
}
