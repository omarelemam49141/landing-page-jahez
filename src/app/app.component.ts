import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sharedImports } from './shared/imports/sharedImports';
import { LanguageService } from './shared/services/language.service';
import { ThemeService } from './shared/services/themes.service';
declare const LocomotiveScroll: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  //properties
  title = 'embeded-store-front';

  //injection
  private translateService = inject(TranslateService);
  private languageService = inject(LanguageService);
  private themeService = inject(ThemeService);

  //life cycle
  constructor() {
    this.themeService.loadTheme();
    this.addSupportedLanguages();
    this.setDefaultLanguage('en');
    let currLang = this.languageService.getCurrentLang();
    if (!currLang) {
      this.useLanguageAccordingToBrowserPreference();
    } else {
      this.translateService.use(currLang);
    }
  }
  ngAfterViewInit(): void {
   
  }

  //methods
  changeLanguage(): void {
    if (this.languageService.getCurrentLang() == 'en') {
      this.languageService.changeCurrentLang('ar');
    } else {
      this.languageService.changeCurrentLang('en');
    }
  }
  addSupportedLanguages(): void {
    this.translateService.addLangs(['en', 'ar']);
  }

  setDefaultLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }

  useLanguageAccordingToBrowserPreference(): void {
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }
}
