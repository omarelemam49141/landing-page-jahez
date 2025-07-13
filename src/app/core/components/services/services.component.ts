import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit {
    //properties
    carouselRotation = 0;
  slides: ServiceSlide[] = [
    {
      titleKey: 'SERVICES.TITLE1',
      descKey: 'SERVICES.DESC1',
      img: 'assets/images/pages/images/service1.jpeg'
    },
    {   
      titleKey: 'SERVICES.TITLE2',
      descKey: 'SERVICES.DESC2',
      img: 'assets/images/pages/images/service2.jpeg'
    },
    {
      titleKey: 'SERVICES.TITLE3',
      descKey: 'SERVICES.DESC3',
      img: 'assets/images/pages/images/service3.png'
    }
  ];

  //life cycle
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.animateCircleContainer();
  }

  //methods

  animateCircleContainer() {
    gsap.from('.circle-container', {
      y: "-100%",
      duration: 1,
      ease: 'elastic(2, 0.5)',
      clearProps: "transform", // Clear transform properties after animation
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 60%',
        toggleActions: 'play none none none'
      }
    });
  }
}