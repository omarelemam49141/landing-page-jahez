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
  // @ViewChild('footer', { static: true }) footerRef!: ElementRef;
  // @ViewChild('footerContent', { static: true }) footerContentRef!: ElementRef;

  private langService = inject(LanguageService);
  isLangArabic!: boolean;

  ngOnInit(): void {
    this.langService.isLangArabic.subscribe((lang: boolean) => {
      this.isLangArabic = lang;
    });
  }

  ngAfterViewInit(): void {
    // gsap.set(this.footerRef.nativeElement, {
    //   y: "100%",
    //   opacity: 0
    // });

    // gsap.to(this.footerRef.nativeElement, {
    //   y: "0%",
    //   opacity: 1,
    //   duration: 1.2,
    //   ease: 'power4.out',
    //   scrollTrigger: {
    //     trigger: this.footerRef.nativeElement,
    //     start: 'top bottom',
    //     end: 'bottom top',
    //     toggleActions: 'play none none reverse'
    //   }
    // });
  }
} 