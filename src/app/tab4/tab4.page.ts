import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabButton,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonModal,
  IonItem,
  IonLabel,
  IonButtons,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { addIcons } from 'ionicons';
import { megaphone, idCard, helpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // Agregar CommonModule para soportar *ngFor y otras directivas
    IonTabButton,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonModal,
    IonItem,
    IonLabel,
    IonButtons, // Agregar IonButtons para manejar botones
  ],
})
export class Tab4Page {
  public environmentInjector = inject(EnvironmentInjector);

  // Estado del modal
  isModalOpen = false;

  // Lista de contactos
  contactos = [
    { nombre: 'Juan Pérez', descripcion: 'Encargado de limpieza', celular: '0991234567' },
    { nombre: 'Ana Gómez', descripcion: 'Administradora', celular: '0987654321' },
    { nombre: 'Luis Rodríguez', descripcion: 'Mantenimiento', celular: '0976543210' },
];

  constructor() {
    addIcons({ idCard, megaphone, helpCircle });
  }

  // Abre el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal() {
    this.isModalOpen = false;
  }
}
