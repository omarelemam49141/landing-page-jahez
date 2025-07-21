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
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ContactUsComponent implements AfterViewInit, OnInit {
  // injection
  private languageService = inject(LanguageService);

  // View children
  @ViewChild('contactSection', { static: true }) contactSection!: ElementRef;
  @ViewChild('contactTitle', { static: true }) contactTitle!: ElementRef;
  @ViewChild('contactContent', { static: true }) contactContent!: ElementRef;

  // properties
  isArabic!: boolean;

  //life cycle
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.languageService.isLangArabic.subscribe((isArabic) => {
      this.isArabic = isArabic;
    });
  }

  /**
   * Component initialization after view is ready
   * Sets up minimal animations
   */
  ngAfterViewInit() {
    this.initializeAnimations();
    
    // Refresh ScrollTrigger after everything is loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }

  /**
   * Component cleanup
   */
  ngOnDestroy() {
    // Clean up any scroll triggers
    ScrollTrigger.getAll().forEach((trigger: any) => {
      if (trigger.trigger === this.contactSection.nativeElement) {
        trigger.kill();
      }
    });
  }

  /**
   * Initialize minimal GSAP animations for the contact us section
   */
  private initializeAnimations() {
    // No animations needed for this design
  }

  /**
   * Handle contact item click events
   */
  onContactClick(type: string) {
    console.log(`Contact ${type} clicked`);
    // Add your custom logic here for handling contact actions
    // e.g., opening email client, WhatsApp, social media links
  }
} 