import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {globals} from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    const ruCode = globals.languageCodes.ru;
    const enCode = globals.languageCodes.en;
    const localStorageLanguageKey = globals.localStorageKeys.language;

    const defaultLangCode = ruCode;
    const languages = [ruCode, enCode];

    translate.addLangs(languages);
    translate.setDefaultLang(ruCode);

    const clientLang = localStorage.getItem(localStorageLanguageKey) || translate.getBrowserLang();
    const languageForUse = languages.includes(clientLang) ? clientLang : defaultLangCode;

    localStorage.setItem(localStorageLanguageKey, languageForUse);
    translate.use(languageForUse);
  }
}
