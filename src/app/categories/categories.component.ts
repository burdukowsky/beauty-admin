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
  addingMode: boolean;

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

    this.addingMode = false;
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
    if (copy.id === null) {
      this.categoryService.createCategory(copy).subscribe(category => {
        this.categories[this.categories.length - 1] = category;
        this.activeCategory = this.categories[this.categories.length - 1];
        this.addingMode = false;
        this._success.next(true);
      }, error => {
        this._error.next(true);
        console.error(error);
      });
      return;
    }
    this.categoryService.updateCategory(copy).subscribe(category => {
      this._success.next(true);
    }, error => {
      this._error.next(true);
      console.error(error);
    });
  }

  onServiceFormSubmit(): void {
    if (this.activeService.id === null) {
      this.categoryService.createService(this.activeService).subscribe(service => {
        const category: Category = this.activeService.category;
        category.services[category.services.length - 1] = service;
        this.activeService = category.services[category.services.length - 1];
        this.addingMode = false;
        this._success.next(true);
      }, error => {
        this._error.next(true);
        console.error(error);
      });
      return;
    }
    const copy = cloneDeep(this.activeService);
    copy.category = undefined;
    this.categoryService.updateService(copy).subscribe(service => {
      this._success.next(true);
    }, error => {
      this._error.next(true);
      console.error(error);
    });
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

  onAddCategoryButtonClick(): void {
    const newCategory = new Category(null, '* Новая категория', '', null);
    this.categories.push(newCategory);
    this.setActive(newCategory);
    this.addingMode = true;
  }

  private addNewServiceToCategory(category): void {
    const newService = new Service(null, '* Новая услуга', '', category);
    category.isCollapsed = false;
    category.services.push(newService);
    this.setActive(newService);
    this.addingMode = true;
  }

  onAddServiceButtonClick(category: Category, event: MouseEvent): void {
    event.stopPropagation();
    if (category.services === null) {
      this.categoryService.getServicesByCategoryId(category.id).subscribe(services => {
        category.services = services;
        this.addNewServiceToCategory(category);
      }, error => {
        this._error.next(true);
        console.error(error);
      });
      return;
    }
    this.addNewServiceToCategory(category);
  }
}
