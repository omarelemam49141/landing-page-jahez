import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/services/language.service';
import { animate } from '@angular/animations';

declare const gsap: any;
declare const ScrollTrigger: any;
declare const SplitText: any;

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.scss',
})
export class JoinUsComponent implements AfterViewInit, OnInit, OnDestroy {
  //view children
  @ViewChild('title') title!: ElementRef;
  @ViewChild('desc') desc!: ElementRef;
  @ViewChild('button') button!: ElementRef;
  // @ViewChild('footer') footer!: ElementRef;
  // @ViewChild('privacy') privacy!: ElementRef;
  // @ViewChild('terms') terms!: ElementRef;
  @ViewChild('joinUsContainer') joinUsContainer!: ElementRef;
  //injection
  private languageService = inject(LanguageService);

  //properties
  isArabic!: boolean;
  startEndScrollTrigger = 'top -230%';
  matchMedia: any;

  //life cycle
  ngAfterViewInit(): void {
    // Only enable scroll trigger on large screens
    this.startScrollTrigger();
  }

  ngOnInit(): void {
    this.languageService.isLangArabic.subscribe((isArabic) => {
      this.isArabic = isArabic;
    });
  }

  ngOnDestroy(): void {
    if (this.matchMedia) {
      this.matchMedia.kill(); // kills matchMedia context
    }
    // 🔁 Call all cleanup functions
  }

  //methods
  private startScrollTrigger(): void {
    gsap.set(this.button.nativeElement, {
      transformOrigin: 'center center -50px',
    });

    

    // 👇 Clear any existing triggers before adding new ones

    let tl = gsap.timeline();
    tl.from(this.title.nativeElement, {
      opacity: 0,
      x: this.isArabic ? 700 : -700,
      ease: 'back.out(1.5)',
      duration: 0.5,
    })
      .from(
        this.desc.nativeElement,
        {
          opacity: 0,
          x: this.isArabic ? -700 : 700,
          ease: 'back.out(1.5)',
          duration: 0.5,
        },
        '-=0.3'
      )
      .from(
        this.button.nativeElement,
        {
          opacity: 0,
          rotateX: -90,
          rotateY: 60,
          ease: 'back.out(1.5)',
          duration: 0.5,
        },
        '-=0.3'
      )
      // .from(
      //   this.privacy.nativeElement,
      //   {
      //     opacity: 0,
      //     x: 100,
      //     duration: 0.5,
      //     ease: 'elastic.out(1.2, 0.4)',
      //   },
      //   '-=0.3'
      // )
      // .from(
      //   this.terms.nativeElement,
      //   {
      //     opacity: 0,
      //     x: 100,
      //     duration: 0.5,
      //     ease: 'elastic.out(1.2, 0.4)',
      //   },
      //   '<'
      // );

      // Store the matchMedia context for cleanup
    this.matchMedia = gsap.matchMedia();

    this.matchMedia.add('(min-width: 992px)', () => {
      this.matchMedia.revert();

      ScrollTrigger.create({
        trigger: this.joinUsContainer.nativeElement,
        start: 'top -230%',
        end: 'bottom -230%',
        toggleActions: 'play none none reverse',
        animation: tl,
        // markers: true,
      });
    });

    this.matchMedia.add('(max-width: 991px)', () => {
      this.matchMedia.revert();

      ScrollTrigger.create({
        trigger: this.joinUsContainer.nativeElement,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
        animation: tl,
        // markers: true,
      });
    });
  }
}
