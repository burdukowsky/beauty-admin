import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {globals} from '../../globals';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  languagesNames = {};

  constructor(public translate: TranslateService) {
    this.languagesNames[globals.languageCodes.ru] = 'Русский';
    this.languagesNames[globals.languageCodes.en] = 'English';
  }

  ngOnInit() {
  }

  onLanguageSelect(value) {
    localStorage.setItem(globals.localStorageKeys.language, value);
    this.translate.use(value);
  }

}
