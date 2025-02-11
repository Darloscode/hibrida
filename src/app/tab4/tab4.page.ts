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
  IonImg,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { informationCircle, megaphone, idCard, helpCircle, peopleCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonImg,
  ],
})
export class Tab4Page {
  public environmentInjector = inject(EnvironmentInjector);

  // Estado de los modales
  isContactModalOpen = false;
  isAnnouncementModalOpen = false;
  isAboutModalOpen = false;

  // Lista de contactos
  contactos = [
    { nombre: 'Juan Pérez', descripcion: 'Encargado de limpieza', celular: '0991234567' },
    { nombre: 'Ana Gómez', descripcion: 'Administradora', celular: '0987654321' },
    { nombre: 'Luis Rodríguez', descripcion: 'Mantenimiento', celular: '0976543210' },
  ];

  // Lista de anuncios
  anuncios = [
    {
      titulo: 'Reunión General',
      descripcion: 'Reunión general de la ciudadela este sábado a las 10:00 AM.',
      imagen: './assets/anuncios/reunion.jpeg',
    },
    {
      titulo: 'Elección de Presidente',
      descripcion: 'Elección del nuevo presidente de la ciudadela el próximo mes.',
      imagen: './assets/anuncios/eleccion.jpeg',
    },
    {
      titulo: 'Cierre de Piscina',
      descripcion: 'La piscina estará cerrada por mantenimiento este fin de semana.',
      imagen: './assets/anuncios/cierre-piscina.jpeg',
    },
    {
      titulo: 'Eventos Especiales',
      descripcion: 'Tendremos una feria cultural el próximo viernes a las 5:00 PM.',
      imagen: './assets/anuncios/eventos.jpeg',
    },
  ];

  // Información de "Acerca de"
  aboutInfo = {
    descripcion: 'Nuestra app móvil permite a los residentes de la urbanización enviar reportes de seguridad, mantenimiento y convivencia de manera rápida y sencilla. Con esta herramienta, la comunidad puede notificar incidentes, sugerencias o solicitudes en tiempo real, mejorando la comunicación entre vecinos y la administración.',
    beneficios : ['✅ Comunicación eficiente: Evita malentendidos y agiliza la respuesta a problemas.', '✅ Mayor seguridad: Reporta incidentes de manera inmediata para una rápida solución.', '✅ Mejora la convivencia: Fomenta el respeto y la colaboración entre vecinos.', '✅ Transparencia y seguimiento: Recibe actualizaciones sobre el estado de tus reportes.'],
    integrantes: ['Carlos Flores', 'Carlos Salazar', 'Cristopher Arroba'],
  };


  constructor() {
    addIcons({ peopleCircle, informationCircle, idCard, megaphone, helpCircle });
  }

  // Métodos para abrir y cerrar los modales
  openContactModal() {
    this.isContactModalOpen = true;
  }

  closeContactModal() {
    this.isContactModalOpen = false;
  }

  openAnnouncementModal() {
    this.isAnnouncementModalOpen = true;
  }

  closeAnnouncementModal() {
    this.isAnnouncementModalOpen = false;
  }

  openAboutModal() {
    this.isAboutModalOpen = true;
  }

  closeAboutModal() {
    this.isAboutModalOpen = false;
  }
}
