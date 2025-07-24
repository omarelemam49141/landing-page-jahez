import { LanguageService } from './../../../shared/services/language.service';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  inject,
  OnInit,
  NgZone,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

// Declare global GSAP (loaded via angular.json scripts)
declare const gsap: any;
declare const ScrollTrigger: any;
declare const SplitText: any;

interface ServiceSlide {
  titleKey: string;
  descKey: string;
  img: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements AfterViewInit, OnInit {
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('imagesContainer') imagesContainer!: ElementRef;
  @ViewChild('headerIcon1', { static: true }) headerIcon1!: ElementRef;
  @ViewChild('headerIcon2', { static: true }) headerIcon2!: ElementRef;
  @ViewChild('headerIcon3', { static: true }) headerIcon3!: ElementRef;
  @ViewChild('headerIcon4', { static: true }) headerIcon4!: ElementRef;
  @ViewChild('headerIcon5', { static: true }) headerIcon5!: ElementRef;
  @ViewChild('headerIcon6', { static: true }) headerIcon6!: ElementRef;
  @ViewChild('headerIcon7', { static: true }) headerIcon7!: ElementRef;
  @ViewChild('imagesContainerMobile', { static: true }) imagesContainerMobile!: ElementRef;
  @ViewChild('textSlider', { static: true }) textSlider!: ElementRef;
  //injection
  private langService = inject(LanguageService);

  //properties
  private scrollTriggerInstance: any;
  isArabic!: boolean;

  carouselRotation = 0;
  slides: ServiceSlide[] = [
    {
      titleKey: 'SERVICES.TITLE1',
      descKey: 'SERVICES.DESC1',
      img: 'assets/images/pages/images/service1.jpeg',
    },
    {
      titleKey: 'SERVICES.TITLE2',
      descKey: 'SERVICES.DESC2',
      img: 'assets/images/pages/images/service2.jpeg',
    },
    {
      titleKey: 'SERVICES.TITLE3',
      descKey: 'SERVICES.DESC3',
      img: 'assets/images/pages/images/service3.png',
    },
  ];

  //life cycle
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}
  ngOnInit(): void {
    this.langService.isLangArabic.subscribe((isArabic) => {
      this.isArabic = isArabic;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
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
          this.scrollTrigger();
          // Refresh ScrollTrigger to ensure proper calculations
          ScrollTrigger.refresh();
        }, 200);
      }, 100); // Increased delay to ensure DOM is ready
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
    if (
      !this.wrapper?.nativeElement 
    ) {
      console.error('Required elements not found for ScrollTrigger');
      return;
    }

    // Verify ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') {
      console.error('ScrollTrigger is not available');
      return;
    }
    this.scrollTriggerBgIcons();
    this.scrollTriggerImagesContainer();
    this.scrollTriggerImagesContainerMobile();
    this.scrollTriggerTextSlider();

  }

  scrollTriggerImagesContainerMobile(): void {
    let start = 'top 100%';
    let end = 'bottom 110%';
    let imagesContainerMobileScrub = 0.5;
    this.scrollTriggerInstance = gsap.from(this.imagesContainerMobile.nativeElement, {
      y: '-300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: imagesContainerMobileScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });

  }

  scrollTriggerTextSlider(): void {
    let start = 'top 100%';
    let end = 'bottom 110%';
    let textSliderScrub = 0.5;
    gsap.set(this.textSlider.nativeElement, {
      transformOrigin: 'left center',
    });
    this.scrollTriggerInstance = gsap.from(this.textSlider.nativeElement, {
      rotateY: '180deg', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: textSliderScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });
  }

  scrollTriggerImagesContainer(): void {
    let start = 'top 100%';
    let end = 'bottom 100%';
    let imagesContainerMobileScrub = 0.5;
    this.scrollTriggerInstance = gsap.from(this.imagesContainer.nativeElement, {
      y: '300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: imagesContainerMobileScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });
  }

  scrollTriggerBgIcons(): void {
    let start = 'top 100%';
    let end = 'bottom 100%';
    let bgIconsScrub = 0.5;
    this.scrollTriggerInstance = gsap.from(this.headerIcon1.nativeElement, {
      y: '-300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });

    this.scrollTriggerInstance = gsap.from(this.headerIcon2.nativeElement, {
      x: '-300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });

    this.scrollTriggerInstance = gsap.from(this.headerIcon3.nativeElement, {
      y: '300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });

    this.scrollTriggerInstance = gsap.from(this.headerIcon4.nativeElement, {
      y: '300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });

    this.scrollTriggerInstance = gsap.from(this.headerIcon5.nativeElement, {
      y: '300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });

    this.scrollTriggerInstance = gsap.from(this.headerIcon6.nativeElement, {
      y: '300px', // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });

    this.scrollTriggerInstance = gsap.from(this.headerIcon7.nativeElement, {
      y: '-300px', // Reduced distance for more visible effect // Reduced distance for more visible effect
      ease: 'none', // Better for scroll-linked animations
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: start, // Animation starts when header section enters viewport
        end: end, // Animation ends when header section leaves viewport
        scrub: bgIconsScrub, // Smooth scrubbing
        // markers: true, // Keep markers for debugging
      },
    });
  }

  animateCarousel() {
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    /* start indexes */
    let currentIndex = 0;
    let currentImageIndex = 0;
    let currentImageIndexMobile = 0;
    /* end indexes */

    /* start is tweening */ 
    let isTweening = false;
    let isImageTweening = false;
    let isImageTweeningMobile = false;
    /* end is tweening */

    /* start images slider */
    const images = gsap.utils.toArray(".images-container");
    const imagesArray = images.map((slider: any) =>
      gsap.utils.toArray(".images-slide", slider as HTMLElement)
    );
    imagesArray.forEach((slides: any) => {
      slides.forEach((slide: any, i: any) => {
        switch (i) {
          case 0:
            gsap.set(slide as HTMLElement, {
              top: "18%",
              right: "13%"
            });
            break;
          case 1:
            gsap.set(slide as HTMLElement, {
              top: "70%",
              right: "-40%"
            });
            break;
          case 2:
            gsap.set(slide as HTMLElement, {
              top: "67%",
              right: "-123%"
            });
            break;
        }
      });
    });

    const gotoImageSlide = (value: number) => {
      if (isImageTweening) return;
      isImageTweening = true;
      const first = imagesArray[0];
      const currentSlides: HTMLElement[] = [];
      const nextSlides: HTMLElement[] = [];
      imagesArray.forEach((slides: any) => currentSlides.push(slides[currentImageIndex] as HTMLElement));
      if (first[currentImageIndex + value]) {
        currentImageIndex += value;
      } else {
        currentImageIndex = value > 0 ? 0 : first.length - 1;
      }

      
      imagesArray.forEach((slides: any) => {
        slides.forEach((slide: any, i: any) => {
          switch (i) {
            /* start first image */
            case 0:
              /* start next button */
              if (value > 0) {
                if (currentImageIndex==1) {
                  gsap.to(slide as HTMLElement, {
                    top: "-15%",
                    right: "-40%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
     
                } else if (currentImageIndex == 2) {
                  gsap.to(slide as HTMLElement, {
                    top: "-15%",
                    right: "-100%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
              
                } else {
                  gsap.to(slide as HTMLElement, {
                    top: "18%",
                    right: "13%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
               
                }
              } 
              /* end next button */
              /* start prev button */
              if (value < 0) {
                if (currentImageIndex==1) {
                  gsap.to(slide as HTMLElement, {
                    top: "-15%",
                    right: "-100%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
     
                } else if (currentImageIndex == 2) {
                  gsap.to(slide as HTMLElement, {
                    top: "-15%",
                    right: "-40%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
              
                } else {
                  gsap.to(slide as HTMLElement, {
                    top: "18%",
                    right: "13%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
               
                }
              } 
              /* end prev button */
              
              break;
            /* end first image */
            /* start second image */
            case 1:
              /* start next button */
              if (value > 0) {
                if (currentImageIndex==1) {
                  gsap.to(slide as HTMLElement, {
                    top: "28%",
                    right: "20%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
     
                } else if (currentImageIndex == 2) {
                  gsap.to(slide as HTMLElement, {
                    top: "-18%",
                    right: "-25%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
              
                } else {
                  gsap.to(slide as HTMLElement, {
                    top: "70%",
                    right: "-40%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
               
                }
              }
              /* end next button */
              /* start prev button */
              if (value < 0) {
                if (currentImageIndex==1) {
                  gsap.to(slide as HTMLElement, {
                    top: "-18%",
                    right: "-25%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
     
                } else if (currentImageIndex == 2) {
                  gsap.to(slide as HTMLElement, {
                    top: "28%",
                    right: "20%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
              
                } else {
                  gsap.to(slide as HTMLElement, {
                    top: "70%",
                    right: "-40%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
               
                }
              }
              /* end prev button */
              
              break;
            /* end second image */
            /* start third image */
            case 2:
              /* start next button */
              if (value > 0) {
                if (currentImageIndex==1) {
                  gsap.to(slide as HTMLElement, {
                    top: "67%",
                    right: "-74%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
     
                } else if (currentImageIndex == 2) {
                  gsap.to(slide as HTMLElement, {
                    top: "23%",
                    right: "-16%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
              
                } else {
                  gsap.to(slide as HTMLElement, {
                    top: "67%",
                    right: "-123%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
               
                }
              }
              /* end next button */
              /* start prev button */
              if (value < 0) {
                if (currentImageIndex==1) {
                  gsap.to(slide as HTMLElement, {
                    top: "23%",
                    right: "-16%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
     
                } else if (currentImageIndex == 2) {
                  gsap.to(slide as HTMLElement, {
                    top: "67%",
                    right: "-74%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
              
                } else {
                  gsap.to(slide as HTMLElement, {
                    top: "67%",
                    right: "-123%",
                    ease: "back(1.7)",
                    onComplete: () => {
                      isImageTweening = false;
                    }
                  });
               
                }
              }
              /* end prev button */
              
              break;
            /* end third image */
          }
        });
      });
    };
    /* end images slider */

    /* start text slider */
    const sliders = gsap.utils.toArray(".slider");
    const slidesArray = sliders.map((slider: any) =>
      gsap.utils.toArray(".slide", slider as HTMLElement)
    );
    slidesArray.forEach((slides: any) => {
      slides.forEach((slide: any, i: any) => {
        gsap.set(slide as HTMLElement, {
          xPercent: i > 0 ? 100 : undefined
        });
      });
    });

    const gotoSlide = (value: number) => {
      if (isTweening) return;
      isTweening = true;
      const first = slidesArray[0];
      const currentSlides: HTMLElement[] = [];
      const nextSlides: HTMLElement[] = [];
      slidesArray.forEach((slides: any) => currentSlides.push(slides[currentIndex] as HTMLElement));
      if (first[currentIndex + value]) {
        currentIndex += value;
      } else {
        currentIndex = value > 0 ? 0 : first.length - 1;
      }
      slidesArray.forEach((slides: any) => nextSlides.push(slides[currentIndex] as HTMLElement));
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
      gsap.to(nextSlides, { xPercent: 0 , onComplete: () => {
        isTweening = false;
      }});
    };
    /* end text slider */

    /* start images slider mobile */
    const imagesMobile = gsap.utils.toArray(".images-container-mobile");
    const imagesArrayMobile = imagesMobile.map((slider: any) =>
      gsap.utils.toArray(".image-slide", slider as HTMLElement)
    );

    imagesArrayMobile.forEach((slides: any) => {
      slides.forEach((slide: any, i: any) => {
        gsap.set(slide as HTMLElement, {
          xPercent: i > 0 ? 100 : undefined
        });
      });
    });

    const gotoSlideMobile = (value: number) => {
      if (isImageTweeningMobile) return;
      isImageTweeningMobile = true;
      const first = imagesArrayMobile[0];
      const currentSlides: HTMLElement[] = [];
      const nextSlides: HTMLElement[] = [];
      imagesArrayMobile.forEach((slides: any) => currentSlides.push(slides[currentImageIndexMobile] as HTMLElement));
      if (first[currentImageIndexMobile + value]) {
        currentImageIndexMobile += value;
      } else {
        currentImageIndexMobile = value > 0 ? 0 : first.length - 1;
      }
      
      imagesArrayMobile.forEach((slides: any) => nextSlides.push(slides[currentImageIndexMobile] as HTMLElement));
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
      gsap.to(nextSlides, { xPercent: 0 , onComplete: () => {
        isImageTweeningMobile = false;
      }});
    };
    /* end images slider mobile */
    next?.addEventListener("click", () => {gotoSlide(1); gotoImageSlide(1); gotoSlideMobile(1);});
    prev?.addEventListener("click", () => {gotoSlide(-1); gotoImageSlide(-1); gotoSlideMobile(-1);});
  }
 
}
