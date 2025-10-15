import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  currentLanguage: string;

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage = this.translateService.getCurrentLang() || 'es';

    this.translateService.onLangChange.subscribe(({ lang }) => {
      this.currentLanguage = lang;
    });
  }
}
