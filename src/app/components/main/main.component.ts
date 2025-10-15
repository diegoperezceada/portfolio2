import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  currentLanguage: string;

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage = this.translateService.getCurrentLang() || 'es';
    
    this.translateService.onLangChange.subscribe(({ lang }) => {
      this.currentLanguage = lang;
    });
  }
}
