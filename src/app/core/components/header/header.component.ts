import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { stagger } from '@angular/animations';

// Declare global GSAP (loaded via angular.json scripts)
declare const gsap: any;
declare const ScrollTrigger: any;
declare const SplitText: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy, OnInit {
  //view childs
  @ViewChild('headerText', { static: true }) headerTextRef!: ElementRef;
  @ViewChild('headerImage', { static: true }) headerImageRef!: ElementRef;
  @ViewChild('headerTitle', { static: true }) headerTitleRef!: ElementRef;
  @ViewChild('headerSection', { static: true }) headerSectionRef!: ElementRef;
  @ViewChild('page2', { static: true }) page2Ref!: ElementRef;
  @ViewChild('page1', { static: true }) page1Ref!: ElementRef;
  @ViewChild('headerIcon1', { static: true }) headerIcon1!: ElementRef;
  @ViewChild('headerIcon2', { static: true }) headerIcon2!: ElementRef;
  @ViewChild('headerIcon3', { static: true }) headerIcon3!: ElementRef;
  @ViewChild('headerIcon4', { static: true }) headerIcon4!: ElementRef;
  @ViewChild('headerIcon5', { static: true }) headerIcon5!: ElementRef;
  @ViewChild('headerIcon6', { static: true }) headerIcon6!: ElementRef;
  @ViewChild('headerIcon7', { static: true }) headerIcon7!: ElementRef;
  @ViewChild('appBadges', { static: true }) appBadges!: ElementRef;
  //injection
  private languageService = inject(LanguageService);

  //properties
  private scrollTriggerInstance: any;
  isArabic!: boolean;

  //lifecycle hooks
  constructor(private ngZone: NgZone) {}
  
  ngOnInit(): void {
    this.languageService.isLangArabic.subscribe((isArabic) => {
      this.isArabic = isArabic;
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Register ScrollTrigger plugin
        if (
          typeof gsap !== 'undefined' &&
          typeof ScrollTrigger !== 'undefined'
        ) {
          gsap.registerPlugin(ScrollTrigger);
        } else {
          console.error('GSAP or ScrollTrigger not loaded');
          return;
        }

        this.animateTitle();
        this.animateSubtitle();
        this.animateAppBadges();
        this.animateImage();
        
        // Initialize ScrollTrigger (Locomotive Scroll is already ready at this point)
        this.scrollTrigger();
      }, 100);
    });
  }

  ngOnDestroy(): void {
    // Clean up ScrollTrigger instances to prevent memory leaks
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    }
  }

  //methods
  scrollTrigger(): void {
    // Ensure elements exist before creating ScrollTrigger
    if (
      !this.page2Ref?.nativeElement ||
      !this.headerSectionRef?.nativeElement ||
      !this.headerTextRef?.nativeElement ||
      !this.headerIcon1?.nativeElement ||
      !this.headerIcon2?.nativeElement ||
      !this.headerIcon3?.nativeElement
    ) {
      console.error('Required elements not found for ScrollTrigger');
      return;
    }

    // Verify ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') {
      console.error('ScrollTrigger is not available');
      return;
    }

    // Verify GSAP is available
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not available');
      return;
    }

    this.scrollTriggerModbilePages();
    this.scrollTriggerBgIcons();
    this.scrollTriggerHeaderText();
  }

  scrollTriggerHeaderText(): void {
    gsap.set(this.headerTextRef.nativeElement, {
      transformOrigin: this.isArabic ? 'right center' : 'left center',
    });
    let headerTextScrub = 1;
    this.scrollTriggerInstance = gsap.to(this.headerTextRef.nativeElement, {
      opacity: 0,
      rotationY: this.isArabic ? -180 : 180,
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'bottom 20%', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: headerTextScrub, // Smooth scrubbing
        scroller: '.page-container',
        markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header text ScrollTrigger created:', this.scrollTriggerInstance);
  }

  scrollTriggerBgIcons(): void {
    let bgIconsScrub = 0.5;
    this.scrollTriggerInstance = gsap.to(this.headerIcon1.nativeElement, {
      right: '-50%', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header icon 1 ScrollTrigger created:', this.scrollTriggerInstance);

    this.scrollTriggerInstance = gsap.to(this.headerIcon2.nativeElement, {
      left: '-50%', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header icon 2 ScrollTrigger created:', this.scrollTriggerInstance);

    this.scrollTriggerInstance = gsap.to(this.headerIcon3.nativeElement, {
      bottom: '-50%', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header icon 3 ScrollTrigger created:', this.scrollTriggerInstance);

    this.scrollTriggerInstance = gsap.to(this.headerIcon4.nativeElement, {
      left: '50%', // Reduced distance for more visible effect
      top: '-10%', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header icon 4 ScrollTrigger created:', this.scrollTriggerInstance);

    this.scrollTriggerInstance = gsap.to(this.headerIcon5.nativeElement, {
      left: '30%', // Reduced distance for more visible effect
      top: '-50%', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header icon 5 ScrollTrigger created:', this.scrollTriggerInstance);

    this.scrollTriggerInstance = gsap.to(this.headerIcon6.nativeElement, {
      left: '70%', // Reduced distance for more visible effect
      top: '-50%', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header icon 6 ScrollTrigger created:', this.scrollTriggerInstance);

    this.scrollTriggerInstance = gsap.to(this.headerIcon7.nativeElement, {
      left: '30%', // Reduced distance for more visible effect
      top: '120%', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Header icon 7 ScrollTrigger created:', this.scrollTriggerInstance);
  }

  scrollTriggerModbilePages(): void {
    this.scrollTriggerInstance = gsap.to(this.page2Ref.nativeElement, {
      y: '+=1000px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: 1, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Page 2 ScrollTrigger created:', this.scrollTriggerInstance);

    this.scrollTriggerInstance = gsap.to(this.page1Ref.nativeElement, {
      y: '+=1000px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.headerSectionRef.nativeElement,
        start: 'top top', // Animation starts when header section enters viewport
        end: 'bottom top', // Animation ends when header section leaves viewport
        scrub: 1, // Smooth scrubbing
        scroller: '.page-container'
        // markers: true, // Keep markers for debugging
      },
    });
    console.log('HeaderComponent: Page 1 ScrollTrigger created:', this.scrollTriggerInstance);
    /* end scroll mobile pages */
  }

  private animateTitle(): void {
    if (typeof SplitText === 'undefined') {
      console.error('SplitText is not available');
      return;
    }

    const h1: HTMLElement = this.headerTitleRef.nativeElement;
    const split = new SplitText(h1, { type: 'words' });
    let tl = gsap.timeline();
    tl.set(h1, { autoAlpha: 1 });
    tl.set(split.words, { transformPerspective: 200 });
    tl.to(
      split.words,
      {
        duration: 1,
        rotationY: 360,
        ease: 'back(2)',
        stagger: { amount: 1, ease: 'power2.in' },
      },
      '+=1'
    );

    // Add hover and mouseleave events to each word
    this.ngZone.runOutsideAngular(() => {
      (split.words as HTMLElement[]).forEach((wordEl) => {
        wordEl.style.display = 'inline-block';
        wordEl.style.cursor = 'pointer';
        wordEl.addEventListener('mouseenter', () => {
          gsap.to(wordEl, {
            rotationY: '+=360',
            duration: 1,
            ease: 'back(1.4)',
          });
        });
        wordEl.addEventListener('mouseleave', () => {
          gsap.to(wordEl, {
            rotationY: 0,
            duration: 1,
            ease: 'back(1.4)',
          });
        });
      });
    });
  }

  private animateSubtitle(): void {
    gsap.from(this.headerTextRef.nativeElement.querySelector('p'), {
      opacity: 0,
      y: 60,
      duration: 1.2,
      delay: 0.5,
      ease: 'power4.out',
    });
  }

  private animateImage(): void {
    gsap.from(this.headerImageRef.nativeElement, {
      opacity: 0,
      scale: 0.8,
      x: 80,
      duration: 1.2,
      delay: 0.3,
      ease: 'power4.out',
    });
  }

  private animateAppBadges(): void {
    let anchors = this.appBadges.nativeElement.querySelectorAll('a');
    gsap.from(anchors, {
      opacity: 0,
      y: 60,
      duration: 0.7,
      delay: 0.7,
      ease: 'back(1.4)',
      stagger: 0.2
    });
  }
}
