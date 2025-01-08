import { Component, EnvironmentInjector, inject} from '@angular/core';
import { IonTabButton, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { megaphone, idCard, helpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [ IonTabButton, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent],
})
export class Tab4Page {
  public environmentInjector = inject(EnvironmentInjector);
  
  constructor() {
    addIcons({ idCard, megaphone, helpCircle });
  }
}