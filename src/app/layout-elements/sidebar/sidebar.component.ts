import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private translateKeys: Array<string> = [
    'COMMON.DASHBOARD',
    'COMMON.ADMINISTRATOR_MENU',
    'COMMON.COMPANIES',
    'COMMON.USERS',
    'COMMON.SERVICE_CATEGORIES',
    'COMMON.USER_MENU',
    'COMMON.MY_COMPANIES',
    'COMMON.MY_SERVICES'
  ];
  public navigation: Array<any> = [];

  public isDivider(item) {
    return item.divider;
  }

  public isTitle(item) {
    return !!item.title;
  }

  constructor(private translate: TranslateService) {
    this.navigation.push({
        url: '/',
        icon: 'icon-speedometer'
      },
      {
        title: true
      },
      {
        url: '/companies',
        icon: 'icon-organization'
      },
      {
        url: '/users',
        icon: 'icon-people'
      },
      {
        url: '/categories',
        icon: 'icon-grid'
      },
      {
        title: true
      },
      {
        url: '/user/companies',
        icon: 'icon-organization'
      },
      {
        url: '/user/services',
        icon: 'icon-star'
      });
    this.translate.onLangChange.subscribe(() => {
      this.refreshTranslates();
    });
  }

  private refreshTranslates() {
    this.translate.get(this.translateKeys).subscribe((res) => {
      this.translateKeys.forEach((value, index) => {
        this.navigation[index].name = res[value];
      });
    });
  }

  ngOnInit() {
    this.refreshTranslates();
  }

}

@Component({
  selector: 'app-sidebar-nav-item',
  template: `
    <li *ngIf="!isDropdown(); else dropdown" [ngClass]="hasClass() ? 'nav-item ' + item.class : 'nav-item'">
      <app-sidebar-nav-link [link]='item'></app-sidebar-nav-link>
    </li>
    <ng-template #dropdown>
      <li [ngClass]="hasClass() ? 'nav-item nav-dropdown ' + item.class : 'nav-item nav-dropdown'"
          [class.open]="isActive()"
          routerLinkActive="open"
          appNavDropdown>
        <app-sidebar-nav-dropdown [link]='item'></app-sidebar-nav-dropdown>
      </li>
    </ng-template>
  `
})
export class AppSidebarNavItemComponent {
  @Input() item: any;

  public hasClass() {
    return !!this.item.class;
  }

  public isDropdown() {
    return !!this.item.children;
  }

  public thisUrl() {
    return this.item.url;
  }

  public isActive() {
    return this.router.isActive(this.thisUrl(), false);
  }

  constructor(private router: Router) {
  }

}

@Component({
  selector: 'app-sidebar-nav-link',
  template: `
    <a *ngIf="!isExternalLink(); else external"
       [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'"
       routerLinkActive="active"
       [routerLink]="[link.url]"
       (click)="hideMobile()">
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>{{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ng-template #external>
      <a [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'" [attr.href]="link.url">
        <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
        {{ link.name }}
        <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
      </a>
    </ng-template>
  `
})
export class AppSidebarNavLinkComponent {
  @Input() link: any;

  public hasVariant() {
    return !!this.link.variant;
  }

  public isBadge() {
    return !!this.link.badge;
  }

  public isExternalLink() {
    return this.link.url.substring(0, 4) === 'http';
  }

  public isIcon() {
    return !!this.link.icon;
  }

  public hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show');
    }
  }

  constructor() {
  }
}

@Component({
  selector: 'app-sidebar-nav-dropdown',
  template: `
    <a class="nav-link nav-dropdown-toggle" appNavDropdownToggle>
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ul class="nav-dropdown-items">
      <ng-template ngFor let-child [ngForOf]="link.children">
        <app-sidebar-nav-item [item]='child'></app-sidebar-nav-item>
      </ng-template>
    </ul>
  `
})
export class AppSidebarNavDropdownComponent {
  @Input() link: any;

  public isBadge() {
    return !!this.link.badge;
  }

  public isIcon() {
    return !!this.link.icon;
  }

  constructor() {
  }
}

@Component({
  selector: 'app-sidebar-nav-title',
  template: '<li class="nav-title">{{title.name}}</li>'
})
export class AppSidebarNavTitleComponent implements OnInit {
  @Input() title: any;

  constructor() {
  }

  ngOnInit() {
  }
}
