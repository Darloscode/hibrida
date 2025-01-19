import { Component, ViewChild, signal, ElementRef } from '@angular/core';
import { /* Importe los componentes de la UI */
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSelect, IonSelectOption, IonTextarea, IonButton,
  IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,  IonFab, IonFabButton, IonIcon
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
/* Importe el módulo para formularios reactivos */
import { ReactiveFormsModule } from '@angular/forms';
/* Importe los constructores del formulario */
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* Importe el servicio */
import { ProviderService } from '../services/provider.service';
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';
/* Importe el servicio */
import { TeachablemachineService } from '../services/teachablemachine.service';
/* Importe el pipe */
import { PercentPipe } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ IonIcon, IonFab, IonFabButton, PercentPipe, ReactiveFormsModule, /* Importe los componentes de la UI */
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonSelect, IonSelectOption, IonTextarea, IonButton,
    IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})

export class Tab2Page {
  /* Declare la referencia al elemento con el id image */
  @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

  imageReady = signal(false)
  imageUrl = signal("")

  /* Declare los atributos para almacenar el modelo y la lista de clases */
  modelLoaded = signal(false);
  classLabels: string[] = [];

  /* Lista de predicciones */
  predictions: any[] = [];




  /* Instancie un formulario */
  myForm: FormGroup = new FormGroup({
    score: new FormControl("", Validators.required),
    opinion: new FormControl("", Validators.required)
  })
  /* Nombre de la colección */
  collectionName = 'reviews';
  /* Arreglo con datos locales */
  dataList: any[] = [];
  /* Inyecte la dependencia a Firestore */
  constructor(private providerService: ProviderService, private teachablemachine: TeachablemachineService) { 
        addIcons({ cloudUploadOutline });
  }

  /* El método onSubmit para enviar los datos del formulario mediante el servicio 
  onSubmit() {
    console.log(this.myForm.value);
    alert(this.myForm.controls["score"].value)
    this.myForm.reset()
  }*/

  /* El método onSubmit para enviar los datos del formulario mediante el servicio */
  onSubmit() {
    this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
      this.myForm.reset()
    });
  }
  /* Al inicializar, carga los datos  */
  async ngOnInit() {
    await this.teachablemachine.loadModel()
    this.classLabels = this.teachablemachine.getClassLabels()
    this.modelLoaded.set(true)
  }




    /* El método onSubmit para enviar los datos del formulario mediante el servicio */
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
  
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
  
        const reader = new FileReader();
  
        // Convertir el archivo a una URL base64 para mostrarlo en el html
        reader.onload = () => {
          this.imageUrl.set(reader.result as string)
          this.imageReady.set(true)
        };
  
        reader.readAsDataURL(file); // Leer el archivo como base64
      }
    }

    /* Método para obtener la predicción a partir de la imagen */
    async predict() {
      try {
        const image = this.imageElement.nativeElement;
        this.predictions = await this.teachablemachine.predict(image);
      } catch (error) {
        console.error(error);
        alert('Error al realizar la predicción.');
      }
    }
}
