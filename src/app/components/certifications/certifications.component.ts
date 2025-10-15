import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [TranslateModule, LucideAngularModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent {
  currentLanguage: string;

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage = this.translateService.getCurrentLang() || 'es';
    
    this.translateService.onLangChange.subscribe(({ lang }) => {
      this.currentLanguage = lang;
    });
  }
}
