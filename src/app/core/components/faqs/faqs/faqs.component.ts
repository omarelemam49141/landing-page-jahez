import { Component, inject, OnInit, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { animation, stagger } from '@angular/animations';
declare const gsap: any;
declare const SplitText: any;
declare const ScrollTrigger: any;

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  faqs: { Q: string; A: string }[] = [];
  isArabic = false;
  expandedIndex?: number;
  startEndScrollTrigger = 'top -220%';
  matchMedia: any;

  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

  @ViewChildren('faqAnswer') faqAnswers!: QueryList<ElementRef>;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFaqs();
    this.isArabic = this.translate.currentLang === 'ar';
    this.translate.onLangChange.subscribe(lang => {
      this.isArabic = lang.lang === 'ar';
      this.loadFaqs();
    });
  }

  ngAfterViewInit(): void {
    // Ensure all answers are hidden initially
    this.animateMainHeader();
    this.scrollTriggerFaqs();
  }

  private scrollTriggerFaqs() {
    this.matchMedia = gsap.matchMedia();

    let faqsForm = document.querySelector('.faqs-form');
    let faqsList = document.querySelector('.faqs-list');
    gsap.set(faqsForm, {
      transformOrigin: this.isArabic ? 'left center' : 'right center',
    });
    gsap.set(faqsList, {
      transformOrigin: this.isArabic ? 'right center' : 'left center',
    });

    

    this.matchMedia.add('(min-width: 992px)', () => {
      this.matchMedia.revert();
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: faqsForm,
          start: this.startEndScrollTrigger,
          end: this.startEndScrollTrigger,
          // markers: true,
          toggleActions: 'play play reverse reverse'
        }
      });
      tl.from(faqsForm, {
        rotateY: 90,
        opacity: 0,
        ease: "back.out(1.5)"
      }).from(faqsList, {
        rotateY: -90,
        opacity: 0,
        ease: "back.out(1.5)"
      }, '-=0.2');

    });

    this.matchMedia.add('(max-width: 991px)', () => {
      this.matchMedia.revert();
      let faqsFormTl = gsap.timeline({
        scrollTrigger: {
          trigger: faqsForm,
          start: 'top 70%',
          end: 'bottom 70%',
          // markers: true,
          toggleActions: 'play play reverse reverse'
        }
      });
      faqsFormTl.from(faqsForm, {
        rotateY: 90,
        opacity: 0,
        ease: "back.out(1.5)"
      })
      
      let faqsListTl = gsap.timeline({
        scrollTrigger: {
          trigger: faqsList,
          start: 'top 70%',
          end: 'bottom 70%',
          // markers: true,
          toggleActions: 'play play reverse reverse'
        }
      });
      faqsListTl.from(faqsList, {
        rotateY: -90,
        opacity: 0,
        ease: "back.out(1.5)"
      }, '-=0.2');

    });

    
  }


  //methods
  private animateMainHeader() {
    let matchMedia2 = gsap.matchMedia();
    const titleSplit = new SplitText('.faqs-title', { type: 'words' });
    const subtitleSplit = new SplitText('.faqs-subtitle', { type: 'words' });

    let tl = gsap.timeline();
    tl.from(titleSplit.words, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.1
    }).from(subtitleSplit.words, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.05,
      delay: 0.3,
    }, '-=0.3')

    // Animate main title with word-by-word animation
    matchMedia2.add('(min-width: 992px)', () => {
      matchMedia2.revert();
      ScrollTrigger.create({
        trigger: '.faqs-container',
        start: this.startEndScrollTrigger,
        end: this.startEndScrollTrigger,
        toggleActions: 'play none none reverse',
        animation: tl
        // markers: true
      });
    });

    matchMedia2.add('(max-width: 991px)', () => {
      matchMedia2.revert();
      ScrollTrigger.create({
        trigger: '.faqs-container',
        start: 'top 90%',
        end: 'bottom 90%',
        toggleActions: 'play none none reverse',
        animation: tl
        // markers: true
      });
    });
    
  }

  loadFaqs() {
    this.translate.get('FAQ.QUESTIONS').subscribe((faqs: any) => {
      this.faqs = faqs;
    });
  }

  toggleFaq(faqIndex: number): void {
    this.expandedIndex = faqIndex;
    let allFaqsAnswersExceptThis = document.querySelectorAll(`.faq-answer:not(.faq-answer-${faqIndex})`);
    allFaqsAnswersExceptThis.forEach(el => {
      el.classList.remove('open');
      gsap.to(el, {
        height: 0,
        duration: 0.3,
        ease: 'power1.in'
      });
    });
    let faqAnswerToOpen = document.querySelector(`.faq-answer-${faqIndex}`);
    if (faqAnswerToOpen?.classList.contains('open')) {
      this.expandedIndex = undefined;
      faqAnswerToOpen.classList.remove('open');
      gsap.to(faqAnswerToOpen, {
        height: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    } else {
      faqAnswerToOpen?.classList.add('open');
      gsap.to(faqAnswerToOpen, {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Handle form submission (e.g., send to API or show a message)
      this.form.reset();
    }
  }
}
