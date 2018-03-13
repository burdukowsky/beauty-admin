import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService} from '../../utility/breadcrumbs.service';
import {Breadcrumb} from '../../utility/breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: Array<Breadcrumb>;

  constructor(private breadcrumbsService: BreadcrumbsService) {
    breadcrumbsService.breadcrumbs$.subscribe(breadcrumbs => this.breadcrumbs = breadcrumbs);
  }

  ngOnInit() {
  }

}
