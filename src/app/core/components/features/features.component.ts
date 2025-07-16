import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  inject,
  OnInit,
  NgZone,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { delay, repeat, Subject, takeUntil } from 'rxjs';
import { stagger } from '@angular/animations';

// Declare global GSAP (loaded via angular.json scripts)
declare const gsap: any;
declare const ScrollTrigger: any;
declare const SplitText: any;

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class FeaturesComponent implements AfterViewInit, OnInit {
  // injection
  private languageService = inject(LanguageService);

  // View children
  @ViewChild('Slider', { static: true }) Slider!: ElementRef;
  @ViewChild('prev', { static: true }) prev!: ElementRef;
  @ViewChild('next', { static: true }) next!: ElementRef;
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  @ViewChild('featuresSection', { static: true }) featuresSection!: ElementRef;
  @ViewChild('prevSmall', { static: true }) prevSmall!: ElementRef;
  @ViewChild('nextSmall', { static: true }) nextSmall!: ElementRef;
  // properties
  isArabic!: boolean;
  private scrollTriggerInstance: any;

  //life cycle
  constructor(private ngZone: NgZone) {}
  ngOnInit(): void {
    this.languageService.isLangArabic.subscribe((isArabic) => {
      this.isArabic = isArabic;
    });
  }

  /**
   * Component initialization after view is ready
   * Sets up all animations, carousel functionality, and language detection
   */
  ngAfterViewInit() {
    this.initializeAnimations();
    this.animateMainHeader();
    this.animateSmallFeatures();
    this.animatePrevAndNextButtons();
    this.animateCarouselRepeatedly();

    // Refresh ScrollTrigger after everything is loaded
    setTimeout(() => {
      this.scrollTrigger();
      ScrollTrigger.refresh();
    }, 100);

    // Refresh ScrollTrigger after images load
    this.handleImageLoad();
  }

  /**
   * Component cleanup
   */
  ngOnDestroy() {}

  //methods
  private animateSmallFeatures() {
    let stagger = 3;
    let featuresCards = gsap.utils.toArray('.feature-card.small-feature-card');
    gsap.set(featuresCards, { opacity: 1 });
    let tl = gsap.timeline({repeat: -1});
    gsap.set(featuresCards, {transformOrigin:"50% 50% -50"})
    tl.from(featuresCards, {rotationX:-90,  rotationY:-60, opacity:0, stagger:stagger})
	.to(featuresCards, {rotationX:90, rotationY:45, opacity:0, stagger:stagger}, stagger)
  } 
  private scrollTrigger() {
    let featuresCards = gsap.utils.toArray('.feature-card:not(.small-feature-card)');
    gsap.set(featuresCards, { opacity: 1 });
    let tl = gsap.timeline();

    tl.from(featuresCards, {
      rotationX: -90,
      rotationY: -60,
      opacity: 0,
      stagger: 4,
      duration: 3,
      ease: 'power2.out'
    }).to(featuresCards, {
      rotationX: 90,
      rotationY: 45,
      opacity: 0,
      stagger: 4,
      duration: 3,
      delay: 3,
      ease: 'power2.in',
      
    }, 0)
    .to(this.carousel.nativeElement, {
      right: '50%',
      x: '50%',
      duration: 4,
      ease: 'ease.out',
      scale: 1.15
    });

    ScrollTrigger.create({
      trigger: '.features-section:not(.small-features-section)',
      start: 'top -50px',
      end: 'bottom -200%',
      scrub: 0.5,
      pin: true,
      animation: tl,
      toggleActions: 'play none none reverse',
    });
    // Remove pinning and make carousel scroll naturally with the page
  }
  private animatePrevAndNextButtons() {

    this.prev.nativeElement.addEventListener('mouseenter', () => {
      gsap.to(this.prev.nativeElement, {
        opacity: 1,
        rotationY: 0,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.next.nativeElement.addEventListener('mouseenter', () => {
      gsap.to(this.next.nativeElement, {
        opacity: 1,
        rotationY: 0,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.prev.nativeElement.addEventListener('mouseleave', () => {
      gsap.to(this.prev.nativeElement, {
        opacity: 0.5,
        rotationY: this.isArabic ? 45 : -45,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.next.nativeElement.addEventListener('mouseleave', () => {
      gsap.to(this.next.nativeElement, {
        opacity: 0.5,
        rotationY: this.isArabic ? -45 : 45,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.prev.nativeElement.addEventListener('click', () => {
      gsap
        .timeline()
        .to(this.prev.nativeElement, {
          scale: 1.05,
          rotationY: 0,
          duration: 0.15,
          ease: 'back(1.5)',
        })
        .to(this.prev.nativeElement, {
          scale: 1,
          duration: 0.15,
        });
    });
    this.next.nativeElement.addEventListener('click', () => {
      gsap
        .timeline()
        .to(this.next.nativeElement, {
          scale: 1.05,
          rotationY: 0,
          duration: 0.15,
          ease: 'back(1.5)',
        })
        .to(this.next.nativeElement, {
          scale: 1,
          duration: 0.15,
        });
    });

    /* start small screen buttons*/
    this.prevSmall.nativeElement.addEventListener('mouseenter', () => {
      gsap.to(this.prevSmall.nativeElement, {
        opacity: 1,
        rotationY: 0,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.nextSmall.nativeElement.addEventListener('mouseenter', () => {
      gsap.to(this.nextSmall.nativeElement, {
        opacity: 1,
        rotationY: 0,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.prevSmall.nativeElement.addEventListener('mouseleave', () => {
      gsap.to(this.prevSmall.nativeElement, {
        opacity: 0.5,
        rotationY: this.isArabic ? 45 : -45,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.nextSmall.nativeElement.addEventListener('mouseleave', () => {
      gsap.to(this.nextSmall.nativeElement, {
        opacity: 0.5,
        rotationY: this.isArabic ? -45 : 45,
        duration: 0.5,
        ease: 'back(1.5)',
      });
    });
    this.prevSmall.nativeElement.addEventListener('click', () => {
      gsap
        .timeline()
        .to(this.prevSmall.nativeElement, {
          scale: 1.05,
          rotationY: 0,
          duration: 0.15,
          ease: 'back(1.5)',
        })
        .to(this.prevSmall.nativeElement, {
          scale: 1,
          duration: 0.15,
        });
    });
    this.nextSmall.nativeElement.addEventListener('click', () => {
      gsap
        .timeline()
        .to(this.nextSmall.nativeElement, {
          scale: 1.05,
          rotationY: 0,
          duration: 0.15,
          ease: 'back(1.5)',
        })
        .to(this.nextSmall.nativeElement, {
          scale: 1,
          duration: 0.15,
        });
    });
    /* end small screen buttons*/
  }
  /**
   * Initialize all GSAP animations for the features section
   */
  private initializeAnimations() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Register ScrollTrigger plugin
        if (
          typeof gsap !== 'undefined' &&
          typeof ScrollTrigger !== 'undefined'
        ) {
          gsap.registerPlugin(ScrollTrigger);
          console.log('GSAP and ScrollTrigger are available');
        } else {
          console.error('GSAP or ScrollTrigger not loaded');
          return;
        }

        this.animateCarousel();
        // Initialize ScrollTrigger last, after other animations
        setTimeout(() => {
          // this.scrollTrigger();
          // Refresh ScrollTrigger to ensure proper calculations
          ScrollTrigger.refresh();
        }, 200);
      }, 100); // Increased delay to ensure DOM is ready
    });
    // this.animateMainHeader();
    // this.animateFeatureCards();
    // this.animatePhoneMockup();
  }

  /**
   * Animate the main header (title and subtitle) using SplitText
   */
  private animateMainHeader() {
    // Animate main title with word-by-word animation
    const titleSplit = new SplitText('.main-title', { type: 'words' });
    gsap.from(titleSplit.words, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.features-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate subtitle with word-by-word animation
    const subtitleSplit = new SplitText('.subtitle', { type: 'words' });
    gsap.from(subtitleSplit.words, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.05,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.features-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  /**
   * Animate feature cards with staggered entrance from different directions
   */
  private animateFeatureCards() {
    // Animate top row features (slide in from top)
    gsap.from('.top-row .feature-card', {
      opacity: 0,
      y: -100,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.features-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate bottom row features (slide in from bottom)
    gsap.from('.bottom-row .feature-card', {
      opacity: 0,
      y: 100,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.features-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate feature icons with rotation
    gsap.from('.feature-icon img', {
      rotation: 360,
      scale: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      delay: 0.4,
      scrollTrigger: {
        trigger: '.features-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  /**
   * Animate the central phone mockup with special effects
   */
  private animateCarouselRepeatedly() {
    gsap.from(this.carousel.nativeElement, {
      scale: 0.7,
      opacity: 0,
      y: 50,
      rotation: 5,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.app-mockup',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Add floating animation to phone
    gsap.to(this.carousel.nativeElement, {
      y: -15,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.2,
    });
  }

  /**
   * Animate the carousel section entrance
   */
  animateCarousel() {
    const next = document.getElementById('next-feature');
    const prev = document.getElementById('prev-feature');

    /* start indexes */
    let currentIndex = 0;
    /* end indexes */

    /* start is tweening */
    let isTweening = false;
    /* end is tweening */

    /* start text slider */
    const sliders = gsap.utils.toArray('.slider-features');
    const slidesArray = sliders.map((slider: any) =>
      gsap.utils.toArray('.slide', slider as HTMLElement)
    );
    slidesArray.forEach((slides: any) => {
      slides.forEach((slide: any, i: any) => {
        gsap.set(slide as HTMLElement, {
          xPercent: i > 0 ? 100 : undefined,
        });
      });
    });

    const gotoSlide = (value: number) => {
      if (isTweening) return;
      isTweening = true;
      const first = slidesArray[0];
      const currentSlides: HTMLElement[] = [];
      const nextSlides: HTMLElement[] = [];
      slidesArray.forEach((slides: any) =>
        currentSlides.push(slides[currentIndex] as HTMLElement)
      );
      if (first[currentIndex + value]) {
        currentIndex += value;
      } else {
        currentIndex = value > 0 ? 0 : first.length - 1;
      }
      slidesArray.forEach((slides: any) =>
        nextSlides.push(slides[currentIndex] as HTMLElement)
      );
      if (value > 0) {
        gsap.from(nextSlides as unknown as HTMLElement, { xPercent: 100 });
        gsap.to(currentSlides as unknown as HTMLElement, {
          xPercent: -100,
        });
      } else {
        gsap.set(nextSlides as unknown as HTMLElement, { xPercent: -100 });
        gsap.to(currentSlides, {
          xPercent: 100,
        });
      }
      gsap.to(nextSlides, {
        xPercent: 0,
        onComplete: () => {
          isTweening = false;
        },
      });
    };
    /* end text slider */
    next?.addEventListener('click', () => {
      gotoSlide(1);
    });
    prev?.addEventListener('click', () => {
      gotoSlide(-1);
    });
    /* start small screen buttons*/
    this.nextSmall.nativeElement.addEventListener('click', () => {
      gotoSlide(1);
    });
    this.prevSmall.nativeElement.addEventListener('click', () => {
      gotoSlide(-1);
    });
    /* end small screen buttons*/
  }

  /**
   * Handle image loading to refresh ScrollTrigger
   */
  private handleImageLoad() {
    const images = document.querySelectorAll('.features-section img');
    images.forEach((img) => {
      img.addEventListener('load', () => {
        ScrollTrigger.refresh();
      });
    });
  }
}
