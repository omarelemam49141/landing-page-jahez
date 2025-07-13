import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { LanguageService } from '../../../shared/services/language.service';
import { Subject, takeUntil } from 'rxjs';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class FeaturesComponent implements AfterViewInit, OnDestroy {
  // Services injection
  private languageService = inject(LanguageService);
  
  // Cleanup subject for subscriptions
  private destroy$ = new Subject<void>();
  
  // Carousel references and properties
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef;
  @ViewChild('carouselWrapper', { static: false }) carouselWrapper!: ElementRef;
  
  // Carousel state properties
  currentSlide = 0;
  totalSlides = 0;
  slideWidth = 0;
  visibleSlides = 3; // Number of slides visible at once
  isRTL = false; // RTL direction flag
  
  // Carousel navigation state
  get isAtStart(): boolean {
    return this.currentSlide === 0;
  }
  
  get isAtEnd(): boolean {
    return this.currentSlide >= this.totalSlides - this.visibleSlides;
  }
  
  // Carousel images data with placeholder images
  carouselImages = [
    {
      url: 'https://i.imgur.com/K8XfJnF.png',
      alt: 'Jahez App Screenshot 1'
    },
    {
      url: 'https://i.imgur.com/L9YzKmP.png',
      alt: 'Jahez App Screenshot 2'
    },
    {
      url: 'https://i.imgur.com/M3VqNpQ.png',
      alt: 'Jahez App Screenshot 3'
    },
    {
      url: 'https://i.imgur.com/N7WxRsS.png',
      alt: 'Jahez App Screenshot 4'
    },
    {
      url: 'https://i.imgur.com/P1XyTvU.png',
      alt: 'Jahez App Screenshot 5'
    },
    {
      url: 'https://i.imgur.com/Q2YzWxV.png',
      alt: 'Jahez App Screenshot 6'
    }
  ];

  /**
   * Component initialization after view is ready
   * Sets up all animations, carousel functionality, and language detection
   */
  ngAfterViewInit() {
    this.setupLanguageDetection();
    this.initializeAnimations();
    this.initializeCarousel();
    
    // Refresh ScrollTrigger after everything is loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Refresh ScrollTrigger after images load
    this.handleImageLoad();
  }

  /**
   * Component cleanup
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Set up language detection for RTL support
   */
  private setupLanguageDetection() {
    this.languageService.getIsLangArHandler()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isArabic => {
        this.isRTL = isArabic;
        // Recalculate carousel position when language changes
        setTimeout(() => {
          this.calculateSlideDimensions();
          this.updateCarouselPosition();
        }, 100);
      });
  }

  /**
   * Initialize all GSAP animations for the features section
   */
  private initializeAnimations() {
    this.animateMainHeader();
    this.animateFeatureCards();
    this.animatePhoneMockup();
    this.animateCarouselSection();
  }

  /**
   * Animate the main header (title and subtitle) using SplitText
   */
  private animateMainHeader() {
    // Animate main title with word-by-word animation
    const titleSplit = new SplitText(".main-title", { type: "words" });
    gsap.from(titleSplit.words, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.features-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate subtitle with word-by-word animation
    const subtitleSplit = new SplitText(".subtitle", { type: "words" });
    gsap.from(subtitleSplit.words, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.features-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
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
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.features-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate bottom row features (slide in from bottom)
    gsap.from('.bottom-row .feature-card', {
      opacity: 0,
      y: 100,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.features-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate feature icons with rotation
    gsap.from('.feature-icon img', {
      rotation: 360,
      scale: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.1,
      delay: 0.4,
      scrollTrigger: {
        trigger: '.features-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  /**
   * Animate the central phone mockup with special effects
   */
  private animatePhoneMockup() {
    gsap.from('.phone-image', {
      scale: 0.7,
      opacity: 0,
      y: 50,
      rotation: 5,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.app-mockup',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Add floating animation to phone
    gsap.to('.phone-image', {
      y: -15,
      duration: 4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.2
    });
  }

  /**
   * Animate the carousel section entrance
   */
  private animateCarouselSection() {
    gsap.from('.carousel-title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.carousel-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.carousel-container', {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: '.carousel-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  /**
   * Initialize carousel functionality and set up dimensions
   */
  private initializeCarousel() {
    this.totalSlides = this.carouselImages.length;
    
    // Set up carousel dimensions after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.calculateSlideDimensions();
      this.updateCarouselPosition();
    }, 200);
  }

  /**
   * Calculate slide dimensions based on container width and responsive breakpoints
   */
  private calculateSlideDimensions() {
    if (this.carouselWrapper?.nativeElement) {
      const containerWidth = this.carouselWrapper.nativeElement.offsetWidth;
      
      // Adjust visible slides based on screen size
      if (window.innerWidth <= 768) {
        this.visibleSlides = 1;
      } else if (window.innerWidth <= 1024) {
        this.visibleSlides = 2;
      } else {
        this.visibleSlides = 3;
      }
      
      this.slideWidth = containerWidth / this.visibleSlides;
    }
  }

  /**
   * Move to the next slide with RTL support
   */
  nextSlide() {
    if (this.isRTL) {
      // In RTL, "next" is actually moving left (decreasing index)
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateCarouselPosition();
      }
    } else {
      // In LTR, "next" is moving right (increasing index)
      if (this.currentSlide < this.totalSlides - this.visibleSlides) {
        this.currentSlide++;
        this.updateCarouselPosition();
      }
    }
  }

  /**
   * Move to the previous slide with RTL support
   */
  previousSlide() {
    if (this.isRTL) {
      // In RTL, "previous" is actually moving right (increasing index)
      if (this.currentSlide < this.totalSlides - this.visibleSlides) {
        this.currentSlide++;
        this.updateCarouselPosition();
      }
    } else {
      // In LTR, "previous" is moving left (decreasing index)
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateCarouselPosition();
      }
    }
  }

  /**
   * Jump to a specific slide
   * @param index - The slide index to jump to
   */
  goToSlide(index: number) {
    if (index >= 0 && index <= this.totalSlides - this.visibleSlides) {
      this.currentSlide = index;
      this.updateCarouselPosition();
    }
  }

  /**
   * Update carousel position with smooth GSAP animation and RTL support
   */
  private updateCarouselPosition() {
    if (this.carouselTrack?.nativeElement) {
      const translateX = this.isRTL 
        ? this.currentSlide * this.slideWidth  // RTL: positive values move left
        : -this.currentSlide * this.slideWidth; // LTR: negative values move left
      
      gsap.to(this.carouselTrack.nativeElement, {
        x: translateX,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }

  /**
   * Handle image loading to refresh ScrollTrigger
   */
  private handleImageLoad() {
    const images = document.querySelectorAll('.features-section img');
    images.forEach(img => {
      img.addEventListener('load', () => {
        ScrollTrigger.refresh();
      });
    });
  }
}