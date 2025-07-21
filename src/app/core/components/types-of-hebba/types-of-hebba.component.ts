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

// Declare global GSAP (loaded via angular.json scripts)
declare const gsap: any;
declare const ScrollTrigger: any;

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-types-of-hebba',
  templateUrl: './types-of-hebba.component.html',
  styleUrls: ['./types-of-hebba.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class TypesOfHebbaComponent implements AfterViewInit, OnInit {
  // injection
  private languageService = inject(LanguageService);

  // View children
  @ViewChild('typesSection', { static: true }) typesSection!: ElementRef;
  @ViewChild('typeCard1', { static: true }) typeCard1!: ElementRef;
  @ViewChild('typeCard2', { static: true }) typeCard2!: ElementRef;
  @ViewChild('typeCard3', { static: true }) typeCard3!: ElementRef;

  // properties
  isArabic!: boolean;

  // Gift types data with translation keys
  giftTypes = [
    {
      id: 1,
      titleKey: 'TYPES_OF_HEBBA.PLACE.TITLE',
      descriptionKey: 'TYPES_OF_HEBBA.PLACE.DESCRIPTION',
      icon: 'assets/images/pages/icons/pop-up-shop.png'
    },
    {
      id: 2,
      titleKey: 'TYPES_OF_HEBBA.PRODUCTS.TITLE',
      descriptionKey: 'TYPES_OF_HEBBA.PRODUCTS.DESCRIPTION',
      icon: 'assets/images/pages/icons/best-product.png'
    },
    {
      id: 3,
      titleKey: 'TYPES_OF_HEBBA.VIDEOS.TITLE',
      descriptionKey: 'TYPES_OF_HEBBA.VIDEOS.DESCRIPTION',
      icon: 'assets/images/pages/icons/trending-video-type.png'
    }
  ];

  //life cycle
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.languageService.isLangArabic.subscribe((isArabic) => {
      this.isArabic = isArabic;
    });
  }

  /**
   * Component initialization after view is ready
   * Sets up all animations
   */
  ngAfterViewInit() {
    this.initializeAnimations();

  }

  /**
   * Component cleanup
   */
  ngOnDestroy() {
    // Clean up any scroll triggers
    ScrollTrigger.getAll().forEach((trigger: any) => {
      if (trigger.trigger === this.typesSection.nativeElement) {
        trigger.kill();
      }
    });
  }

  /**
   * Initialize all GSAP animations for the types of hebba section
   */
  private initializeAnimations() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Register ScrollTrigger plugin
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
          console.log('GSAP and ScrollTrigger are available');
        } else {
          console.error('GSAP or ScrollTrigger not loaded');
          return;
        }
        this.animateTypeCards();
        this.addHoverAnimations();
        
        // Refresh ScrollTrigger
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      }, 100);
    });
  }

  /**
   * Animate the main header
   */


 

  /**
   * Animate type cards with staggered entrance
   */
  private animateTypeCards() {
    const cards = [this.typeCard1.nativeElement, this.typeCard2.nativeElement, this.typeCard3.nativeElement];
    
    // Set initial state
    gsap.set(cards, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      rotationX: -45
    });

    // Animate cards entrance
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: this.typesSection.nativeElement,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate icons with rotation
    const icons = gsap.utils.toArray('.hebba-type-icon img');
    gsap.from(icons, {
      rotation: 360,
      scale: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.15,
      delay: 0.3,
      scrollTrigger: {
        trigger: this.typesSection.nativeElement,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    
  }

  /**
   * Add hover animations to cards
   */
  private addHoverAnimations() {
    const cards = [this.typeCard1.nativeElement, this.typeCard2.nativeElement, this.typeCard3.nativeElement];
    
    cards.forEach((card, index) => {
      const icon = card.querySelector('.hebba-type-icon img');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(icon, {
          scale: 1.3,
          filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.4))',
          duration: 0.4,
          rotationX: '10deg',
          ease: 'back.out(1.7)'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.to(icon, {
          scale: 1,
          filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2))',
          duration: 0.3,
          rotationX: 0,
          ease: 'power2.out'
        });
      });

      // Click animation
      card.addEventListener('click', () => {
        gsap.timeline()
          .to(card, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out'
          })
          .to(card, {
            scale: 1.05,
            duration: 0.15,
            ease: 'back.out(1.7)'
          })
          .to(card, {
            scale: 1,
            duration: 0.15,
            ease: 'power2.out'
          });
             });
     });
   }

     /**
   * Handle type card click events
   */
  onTypeClick(typeId: number) {
    const selectedType = this.giftTypes[typeId - 1];
    console.log(`Type ${typeId} clicked:`, {
      id: selectedType.id,
      titleKey: selectedType.titleKey,
      descriptionKey: selectedType.descriptionKey,
      icon: selectedType.icon
    });
    // Add your custom logic here for handling type selection
  }
} 