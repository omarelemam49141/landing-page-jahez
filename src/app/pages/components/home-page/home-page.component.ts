import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { ServicesComponent } from '../../../core/components/services/services.component';
import { FeaturesComponent } from '../../../core/components/features/features.component';
import { JoinUsComponent } from '../../../core/components/join-us/join-us.component';
import { FaqsComponent } from '../../../core/components/faqs/faqs/faqs.component';

// Declare global GSAP and Locomotive Scroll
declare const gsap: any;
declare const ScrollTrigger: any;
declare const LocomotiveScroll: any;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    ServicesComponent,
    FeaturesComponent,
    JoinUsComponent,
    FaqsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit {
  private locoScroll: any;
  isLocomotiveReady: boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    // Wait a bit for the DOM to be fully ready
    setTimeout(() => {
      // Check if all required libraries are loaded
      if (typeof LocomotiveScroll === 'undefined') {
        console.error('HomePageComponent: LocomotiveScroll is not loaded');
        return;
      }
      
      if (typeof ScrollTrigger === 'undefined') {
        console.error('HomePageComponent: ScrollTrigger is not loaded');
        return;
      }
      
      if (typeof gsap === 'undefined') {
        console.error('HomePageComponent: GSAP is not loaded');
        return;
      }
      
      console.log('HomePageComponent: All required libraries are loaded');
      
      // Initialize Locomotive Scroll
      this.configureLocomotiveScroll();
    }, 100);
  }

  private configureLocomotiveScroll(): void {
    console.log('HomePageComponent: Configuring Locomotive Scroll...');
    
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) {
      console.error('HomePageComponent: .page-container element not found');
      return;
    }
    
    this.locoScroll = new LocomotiveScroll({
      el: pageContainer,
      smooth: true,
      lerp: 0.1, // Lower value = faster stopping (default is 0.1, try 0.05 for faster)
      multiplier: 1.2, // Scroll speed multiplier
      smartphone: {
        smooth: true,
        lerp: 0.05 // Even faster stopping on mobile
      },
      tablet: {
        smooth: true,
        lerp: 0.05 // Even faster stopping on tablet
      }
    });
    
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    this.locoScroll.on('scroll', ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".page-container" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy('.page-container', {
      scrollTop: (value: any) => {
        return arguments.length
          ? this.locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
          : this.locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect: () => {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: (document.querySelector('.page-container') as HTMLElement).style
        ?.transform
        ? 'transform'
        : 'fixed',
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener('refresh', () => this.locoScroll.update());
    ScrollTrigger.defaults({ scroller: '.page-container' });
    
    // Notify service when Locomotive Scroll is ready
    setTimeout(() => {
      ScrollTrigger.refresh();
      this.isLocomotiveReady = true;
      console.log('HomePageComponent: Locomotive Scroll ready');
    }, 100);
    // --- SETUP END ---
  }
}
