import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'; // ← Importa desde aquí

import { routes } from './app.routes';
import {
  Award,
  Cloud,
  Database,
  Download,
  ExternalLink,
  Globe,
  Laptop,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  Send,
  Smartphone,
  Zap,
  Cross,
  Landmark,
  GraduationCap,
  Linkedin,
  Github,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        Award,
        ExternalLink,
        Download,
        Mail,
        Phone,
        MapPin,
        Send,
        Database,
        Smartphone,
        Cloud,
        Globe,
        Zap,
        Laptop,
        Cross,
        Landmark,
        GraduationCap,
        Linkedin,
        Github,
      })
    ),
    provideHttpClient(),
    provideTranslateService({
      fallbackLang: 'es',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
