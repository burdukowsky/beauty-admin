import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from '../utility/breadcrumb';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {Category} from './category';
import {CategoryService} from './category.service';
import {Service} from './service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category>;
  loadErrorMessage: boolean;

  constructor(private breadcrumbsService: BreadcrumbsService, private categoryService: CategoryService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.SERVICE_CATEGORIES', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
    this.loadErrorMessage = false;
    this.getCategories();
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      // TODO: remove
      this.categories.forEach(category => category.services = [new Service(1, 'test', 'desc')]);
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

}
