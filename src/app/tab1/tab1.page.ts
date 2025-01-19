import { ViewChild, ElementRef, Component, signal } from '@angular/core';
import { IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonCard, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProviderService } from '../services/provider.service';

/* Importe el pipe */
import { PercentPipe } from '@angular/common';

/* Importe el servicio */
import { TeachablemachineService } from '../services/teachablemachine.service';

/* Importe la función y el ícono */
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ IonCardSubtitle, IonCardHeader, IonCardTitle, PercentPipe, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {

  /* Nombre de la colección */
  collectionName = 'reviews';
  /* Arreglo con datos locales */
  dataList: any[] = [];
  /* Registre el servicio en el constructor */
  constructor(private providerService: ProviderService) {
  }

  /* Método ngOnInit para cargar el modelo y las clases */
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
      this.dataList = data;
    });
  }
}
