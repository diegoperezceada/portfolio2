import { LucideAngularModule } from 'lucide-angular';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  nombre = '';
  correo = '';
  mensaje = '';

  currentLanguage: string;

  constructor(private readonly translateService: TranslateService) {
    this.currentLanguage = this.translateService.getCurrentLang() || 'es';

    this.translateService.onLangChange.subscribe(({ lang }) => {
      this.currentLanguage = lang;
    });
  }

  enviarCorreo() {
    const destinatario = 'diegoperezceada@gmail.com';
    const asunto = `Mensaje de ${this.nombre}`;
    const cuerpo = this.mensaje;
    const mailto = `mailto:${destinatario}?subject=${encodeURIComponent(
      asunto
    )}&body=${cuerpo}`;

    globalThis.location.href = mailto;
  }
}
