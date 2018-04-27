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
  activeCategory: Category;
  activeService: Service;

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

  private getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      // TODO: remove
      this.categories.forEach(category => category.services = [new Service(Math.random(), 'test', 'desc')]);
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

  }

  onServiceFormSubmit(): void {

  }
}
