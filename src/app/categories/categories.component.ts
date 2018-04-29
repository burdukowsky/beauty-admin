import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from '../utility/breadcrumb';
import {BreadcrumbsService} from '../utility/breadcrumbs.service';
import {Category} from './category';
import {CategoryService} from './category.service';
import {Service} from './service';
import {cloneDeep} from 'lodash';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {globals} from '../globals';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Array<Category>;
  loadErrorMessage: boolean;
  activeCategory: Category;
  activeService: Service;

  successMessage: boolean;
  errorMessage: boolean;
  private _success = new Subject<boolean>();
  private _error = new Subject<boolean>();

  constructor(private breadcrumbsService: BreadcrumbsService, private categoryService: CategoryService) {
    const breadcrumbs: Array<Breadcrumb> = [
      new Breadcrumb(null, 'COMMON.SERVICE_CATEGORIES', true, true)
    ];
    this.breadcrumbsService.setBreadcrumbs(breadcrumbs);
  }

  ngOnInit() {
    this.loadErrorMessage = false;

    this._success.subscribe((state) => this.successMessage = state);
    this._error.subscribe((state) => this.errorMessage = state);
    debounceTime.call(this._success, globals.alertTimeout).subscribe(() => this.successMessage = false);
    debounceTime.call(this._error, globals.alertTimeout).subscribe(() => this.errorMessage = false);

    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => {
      console.error(error);
      this.loadErrorMessage = true;
    });
  }

  setActive(item: Category | Service): void {
    if (item instanceof Category) {
      this.activeService = null;
      this.activeCategory = item;
    } else {
      this.activeCategory = null;
      this.activeService = item;
    }
  }

  isActiveCategory(category: Category): boolean {
    return this.activeCategory && this.activeCategory.id === category.id;
  }

  isActiveService(service: Service): boolean {
    return this.activeService && this.activeService.id === service.id;
  }

  onCategoryFormSubmit(): void {
    const copy = cloneDeep(this.activeCategory);
    copy.services = undefined;
    copy.isCollapsed = undefined;
    this.categoryService.updateCategory(copy).subscribe(category => {
      this._success.next(true);
    }, error => {
      this._error.next(true);
      console.error(error);
    });
  }

  onServiceFormSubmit(): void {

  }

  onCollapseCategoryButtonClick(category: Category, event: MouseEvent): void {
    event.stopPropagation();
    if (!category.isCollapsed || category.services !== null) {
      category.isCollapsed = !category.isCollapsed;
      return;
    }
    this.categoryService.getServicesByCategoryId(category.id).subscribe(services => {
      category.services = services;
      category.isCollapsed = !category.isCollapsed;
    }, error => {
      this._error.next(true);
      console.error(error);
    });
  }
}
