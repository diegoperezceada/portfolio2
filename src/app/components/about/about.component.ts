import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
currentLanguage: string;

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage = this.translateService.getCurrentLang() || 'es';
    
    this.translateService.onLangChange.subscribe(({ lang }) => {
      this.currentLanguage = lang;
    });
  }
}
