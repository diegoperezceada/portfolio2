import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  activeSection: string = 'home';
  isMobileMenuOpen: boolean = false;
  isBrowser: boolean;
  currentLanguage: string;

  sections = [
    { id: 'home', label: 'NAV.HOME', path: '' },
    { id: 'about', label: 'NAV.ABOUT', path: 'about' },
    { id: 'experience', label: 'NAV.EXPERIENCE', path: 'experience' },
    { id: 'education', label: 'NAV.EDUCATION', path: 'education' },
    { id: 'certifications', label: 'NAV.CERTIFICATIONS', path: 'certifications' },
    { id: 'skills', label: 'NAV.SKILLS', path: 'skills' },
    { id: 'contact', label: 'NAV.CONTACT', path: 'contact' },
  ];

  private readonly availableLanguages = ['es', 'en'];
  private readonly langChangeSubscription?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly translateService: TranslateService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.currentLanguage =
      this.translateService.getCurrentLang() ||
      this.translateService.getFallbackLang() ||
      'es';

    this.langChangeSubscription =
      this.translateService.onLangChange.subscribe(({ lang }) => {
        if (this.availableLanguages.includes(lang)) {
          this.currentLanguage = lang;
          if (this.isBrowser) {
            localStorage.setItem('portfolio_language', lang);
          }
        }
      });
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.handleScroll();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.handleScroll();
      }, 100);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.handleScroll();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (this.isBrowser && window.innerWidth >= 768) {
      this.isMobileMenuOpen = false;
    }
  }

  private handleScroll(): void {
    if (!this.isBrowser) return;

    const scrollPosition = window.scrollY + 100;

    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          this.activeSection = section.id;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string): void {
    if (this.isBrowser) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

  getButtonClass(sectionId: string): string {
    return this.activeSection === sectionId
      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
      : 'text-white/70 hover:text-white hover:bg-white/10';
  }

  getMobileButtonClass(sectionId: string): string {
    return this.activeSection === sectionId
      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
      : 'text-white/70 hover:text-white hover:bg-white/10';
  }

  toggleLanguage(): void {
    const nextLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.setLanguage(nextLanguage);
  }

  private setLanguage(language: string): void {
    if (!this.availableLanguages.includes(language)) {
      return;
    }

    this.currentLanguage = language;
    this.translateService.use(language);

    if (this.isBrowser) {
      localStorage.setItem('portfolio_language', language);
    }
  }

  get languageToggleLabel(): string {
    return this.currentLanguage === 'es'
      ? 'NAV.SWITCH_TO_EN'
      : 'NAV.SWITCH_TO_ES';
  }
}
