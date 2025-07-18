import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
export class JoinUsComponent implements AfterViewInit, OnInit {
  //view children
  @ViewChild('title') title!: ElementRef;
  @ViewChild('desc') desc!: ElementRef;
  @ViewChild('button') button!: ElementRef;
  @ViewChild('footer') footer!: ElementRef;
  @ViewChild('privacy') privacy!: ElementRef;
  @ViewChild('terms') terms!: ElementRef;
  @ViewChild('joinUsContainer') joinUsContainer!: ElementRef;
  //injection
  private languageService = inject(LanguageService);

  //properties
  isArabic!: boolean;
  startEndScrollTrigger = 'top -220%';
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

  //methods
  private startScrollTrigger(): void {
    gsap.set(this.button.nativeElement, {
      transformOrigin: 'center center -50px',
    })

    let tl = gsap.timeline();
    tl.from(this.title.nativeElement, {
      opacity: 0,
      x: this.isArabic ? 700 : -700,
      ease: 'back.out(1.5)',
      duration: 0.5,
    }).from(this.desc.nativeElement, {
      opacity: 0,
      x: this.isArabic ? -700 : 700,
      ease: 'back.out(1.5)',
      duration: 0.5,
    }, '-=0.3')
    .from(this.button.nativeElement, {
      opacity: 0,
      rotateX: -90,
      rotateY: 60,
      ease: 'back.out(1.5)',
      duration: 0.5,
    }, '-=0.3')
    .from(this.privacy.nativeElement, {
      opacity: 0,
      x: 100,
      duration: 0.5,
      ease: 'elastic.out(1.2, 0.4)',
    }, '-=0.3')
    .from(this.terms.nativeElement, {
      opacity: 0,
      x: 100,
      duration: 0.5,
      ease: 'elastic.out(1.2, 0.4)',
    }, '<')

    ScrollTrigger.create({
      trigger: this.joinUsContainer.nativeElement,
      start: this.startEndScrollTrigger,
      end:  this.startEndScrollTrigger,
      // markers: true,
      toggleActions: 'play none none reverse',
      animation: tl
    });
  }
}