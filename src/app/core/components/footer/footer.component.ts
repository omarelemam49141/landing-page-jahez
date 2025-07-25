import { Component, AfterViewInit, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';

declare const gsap: any;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit, OnInit {
  private langService = inject(LanguageService);
  isLangArabic!: boolean;

  ngOnInit(): void {
    this.langService.isLangArabic.subscribe((lang: boolean) => {
      this.isLangArabic = lang;
    });
  }

  ngAfterViewInit(): void {
  }
}