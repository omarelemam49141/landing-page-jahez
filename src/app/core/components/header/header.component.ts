import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { TranslateModule } from '@ngx-translate/core';
gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('headerText', { static: true }) headerTextRef!: ElementRef;
  @ViewChild('headerImage', { static: true }) headerImageRef!: ElementRef;
  @ViewChild('headerTitle', { static: true }) headerTitleRef!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.animateTitle();
    this.animateSubtitle();
    this.animateImage();
  }

  private animateTitle(): void {
    const h1: HTMLElement = this.headerTitleRef.nativeElement;
    const split = new SplitText(h1, { type: 'words' });
    let tl = gsap.timeline();
    tl.set(h1, { autoAlpha: 1 });
    tl.set(split.words, { transformPerspective: 200 });
    tl.to(split.words, {
      duration: 1,
      rotationY: 360,
      ease: 'back(2)',
      stagger: { amount: 1, ease: 'power2.in' }
    }, "+=1");

    // Add hover and mouseleave events to each word
    this.ngZone.runOutsideAngular(() => {
      (split.words as HTMLElement[]).forEach((wordEl) => {
        wordEl.style.display = 'inline-block';
        wordEl.style.cursor = 'pointer';
        wordEl.addEventListener('mouseenter', () => {
          gsap.to(wordEl, {
            rotationY: "+=360",
            duration: 1,
            ease: "back(1.4)"
          });
        });
        wordEl.addEventListener('mouseleave', () => {
          gsap.to(wordEl, {
            rotationY: 0,
            duration: 1,
            ease: "back(1.4)"
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
} 