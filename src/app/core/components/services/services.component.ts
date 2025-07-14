import { LanguageService } from './../../../shared/services/language.service';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  @ViewChild('images-container') imagesContainer!: ElementRef;
  //injection
  private langService = inject(LanguageService);

  //properties
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
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.langService.isLangArabic.subscribe((isArabic) => {
      this.isArabic = isArabic;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.animateCarousel();
  }

  //methods
  animateCarousel() {
    const colors = [
      "#24478f",
      "#cc0000",
      "#663300",
      "#006600",
      "#cc5200",
      "#6b00b3"
    ];
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
    const imagesArray = images.map((slider) =>
      gsap.utils.toArray(".images-slide", slider as HTMLElement)
    );
    imagesArray.forEach((slides) => {
      slides.forEach((slide, i) => {
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
      imagesArray.forEach((slides) => currentSlides.push(slides[currentImageIndex] as HTMLElement));
      if (first[currentImageIndex + value]) {
        currentImageIndex += value;
      } else {
        currentImageIndex = value > 0 ? 0 : first.length - 1;
      }
      
      imagesArray.forEach((slides) => {
        slides.forEach((slide, i) => {
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
    const slidesArray = sliders.map((slider) =>
      gsap.utils.toArray(".slide", slider as HTMLElement)
    );

    slidesArray.forEach((slides) => {
      slides.forEach((slide, i) => {
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
      slidesArray.forEach((slides) => currentSlides.push(slides[currentIndex] as HTMLElement));
      if (first[currentIndex + value]) {
        currentIndex += value;
      } else {
        currentIndex = value > 0 ? 0 : first.length - 1;
      }
      slidesArray.forEach((slides) => nextSlides.push(slides[currentIndex] as HTMLElement));
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
    const imagesArrayMobile = imagesMobile.map((slider) =>
      gsap.utils.toArray(".image-slide", slider as HTMLElement)
    );

    imagesArrayMobile.forEach((slides) => {
      slides.forEach((slide, i) => {
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
      imagesArrayMobile.forEach((slides) => currentSlides.push(slides[currentImageIndexMobile] as HTMLElement));
      if (first[currentImageIndexMobile + value]) {
        currentImageIndexMobile += value;
      } else {
        currentImageIndexMobile = value > 0 ? 0 : first.length - 1;
      }
      imagesArrayMobile.forEach((slides) => nextSlides.push(slides[currentImageIndexMobile] as HTMLElement));
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
