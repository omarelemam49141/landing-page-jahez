import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Properties
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();
  isLangArabic = new BehaviorSubject<boolean>(false);
  private htmlTag!: HTMLHtmlElement;

  // Constructor
  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    this.initializeLanguage();
  }

  // Initialize language settings
  private initializeLanguage() {
    const lang = localStorage.getItem('lang') || 'en';
    localStorage.setItem('lang', lang); // Ensure the language is set in localStorage
    this.translateService.setDefaultLang('en'); // Always fallback to English
    this.setLangSubjectValue(lang);
    this.isLangArabic.next(lang === 'ar');
  }

  // Set language subject value and update HTML attributes
  private setLangSubjectValue(lang: string) {
    this.currentLang.next(lang);
    this.isLangArabic.next(lang === 'ar');
    this.updateHtmlAttributes(lang);
    this.translateService.use(lang);
  }

  // Update HTML attributes based on language
  private updateHtmlAttributes(lang: string) {
    this.htmlTag.lang = lang;
    this.htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  // Change the current language
  changeCurrentLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.reloadCurrentRoute();
    // this.setLangSubjectValue(lang); // Do not call before reload
  }

  // Toggle between Arabic and English
  onLangChange() {
    const newLang = this.currentLang.value === 'ar' ? 'en' : 'ar';
    this.changeCurrentLang(newLang);
  }

  // Get the current language
  getCurrentLang() {
    return this.currentLang.value;
  }

  // Get the OK message based on the current language
  getOkMessageAccordingToLanguage() {
    return this.getCurrentLang() === 'ar' ? 'موافق' : 'Okay';
  }

  // Reload the current route to apply language changes
  reloadCurrentRoute() {

    window.location.reload();

  }

  // Get the observable for language change
  getIsLangArHandler() {
    return this.isLangArabic.asObservable();
  }
}
