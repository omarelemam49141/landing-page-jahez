import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { HeaderComponent } from "../../../core/components/header/header.component";
import { ServicesComponent } from "../../../core/components/services/services.component";
import { FeaturesComponent } from "../../../core/components/features/features.component";

// Declare global GSAP and Locomotive Scroll
declare const gsap: any;
declare const ScrollTrigger: any;
declare const LocomotiveScroll: any;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, ServicesComponent, FeaturesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit {
  private locoScroll: any;

  ngAfterViewInit(): void {
    // Wait a bit for the DOM to be fully ready
    // setTimeout(() => {
    //   // Initialize Locomotive Scroll
    //   this.locoScroll = new LocomotiveScroll({
    //     el: document.querySelector('[data-scroll-container]'),
    //     smooth: true,
    //     lerp: 0.1,
    //     multiplier: 1,
    //     class: 'is-revealed',
    //     reloadOnContextChange: true,
    //     touchMultiplier: 2,
    //     smoothMobile: false
    //   });

    //   // Tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element
    //   ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    //     scrollTop(value: any) {
    //       return arguments.length ? this.locoScroll.scrollTo(value, 0, 0) : this.locoScroll.scroll.instance.scroll.y;
    //     },
    //     getBoundingClientRect() {
    //       return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    //     },
    //     pinType: this.locoScroll.el.style.transform ? "transform" : "fixed"
    //   });

    //   // Each time the window updates, we should refresh ScrollTrigger and then update Locomotive Scroll
    //   ScrollTrigger.addEventListener("refresh", () => this.locoScroll.update());

    //   // After everything is set up, refresh ScrollTrigger
    //   ScrollTrigger.refresh();
    // }, 100);
  }
}
