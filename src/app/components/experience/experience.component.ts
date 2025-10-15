import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  currentLanguage: string;

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage = this.translateService.getCurrentLang() || 'es';
    
    this.translateService.onLangChange.subscribe(({ lang }) => {
      this.currentLanguage = lang;
    });
  }
}
