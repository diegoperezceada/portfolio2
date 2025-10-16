import { LucideAngularModule } from 'lucide-angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  nombre = '';
  correo = '';
  mensaje = '';

  enviarCorreo() {
    const destinatario = 'contacto@ejemplo.com';
    const asunto = `Mensaje de ${this.nombre}`;
    const cuerpo = `Nombre: ${this.nombre}%0D%0ACorreo: ${this.correo}%0D%0A%0D%0AMensaje:%0D%0A${this.mensaje}`;
    const mailto = `mailto:${destinatario}?subject=${encodeURIComponent(
      asunto
    )}&body=${cuerpo}`;

    globalThis.location.href = mailto;
  }
}
