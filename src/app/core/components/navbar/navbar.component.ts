import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, inject, HostListener } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbar', { static: true }) navbarRef!: ElementRef;
  @ViewChildren('navLink', { read: ElementRef }) navLinks!: QueryList<ElementRef>;

  //injection
  private langService = inject(LanguageService);

  //properties
  isLangArabic!: boolean;

  // Make navbar sticky and handle opacity on scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.navbarRef) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 0) {
      gsap.to(this.navbarRef.nativeElement, { opacity: 0.6, duration: 0.3, overwrite: 'auto' });
    } else {
      gsap.to(this.navbarRef.nativeElement, { opacity: 1, duration: 0.3, overwrite: 'auto' });
    }
  }

  //life cycle
  ngOnInit(): void {
    this.langService.isLangArabic.subscribe((lang: boolean) => {
      this.isLangArabic = lang;
    });
  }

  ngAfterViewInit(): void {
    gsap.set(this.navbarRef.nativeElement, {
      opacity: 1,
      y: "0%",
      x: this.isLangArabic ? '100%' : '-100%'
    });

    let tl = gsap.timeline();

    tl.to(this.navbarRef.nativeElement, {
      duration: 1.2,
      x: '0%',
      opacity: 1,
      ease: 'power4.out'
    }).from(this.navLinks.map(link => link.nativeElement), {
      opacity: 0,
      y: 40,
      rotationX: 60,
      duration: 0.5,
      stagger: {
        each: 0.08,
        ease: 'power2.out'
      },
      ease: 'back.out(1.7)'
    }, 0.5);
  }

  //methods
  toggleLanguage() {
    this.langService.changeCurrentLang(this.isLangArabic ? 'en' : 'ar');
  }
}
