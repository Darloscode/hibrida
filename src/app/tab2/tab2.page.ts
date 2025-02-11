import { Component, ViewChild, signal, ElementRef } from '@angular/core';
import { /* Importe los componentes de la UI */
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSelect, IonSelectOption, IonTextarea, IonButton,
  IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon
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

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFab, IonFabButton, PercentPipe, ReactiveFormsModule, /* Importe los componentes de la UI */
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
    opinion: new FormControl("", Validators.required),
    date: new FormControl(new Date().toISOString()) // Fecha actual en formato ISO
  })

  /* Nombre de la colección */
  collectionName = 'reviews';

  /* Arreglo con datos locales */
  dataList: any[] = [];

  /* Inyecte la dependencia a Firestore */
  constructor(private providerService: ProviderService, private teachablemachine: TeachablemachineService, private alertController: AlertController) {
    addIcons({ cloudUploadOutline });
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: '¡Reporte enviado!',
      message: 'Gracias por tu opinión. Hemos recibido tu reporte correctamente.',
      buttons: ['OK']
    });
    await alert.present();
  }

  /* El método onSubmit para enviar los datos del formulario mediante el servicio 
  onSubmit() {
    console.log(this.myForm.value);
    alert(this.myForm.controls["score"].value)
    this.myForm.reset()
  }*/

  /* El método onSubmit para enviar los datos del formulario mediante el servicio */
  onSubmit() {
    const formData = {
      ...this.myForm.value,
      image: this.imageUrl(),    // Incluye la imagen codificada en Base64
      date: new Date().toISOString() // Agregar la fecha actual
    };

    this.providerService.createDocument(this.collectionName, formData).then(() => {
      this.myForm.reset()
      // Limpia la imagen seleccionada
      this.imageUrl.set("");
      this.imageReady.set(false);
      // Muestra la alerta
      this.showAlert();
    }).catch(error => {
      console.error('Error al enviar el reporte:', error);
      alert('Hubo un error al enviar el reporte. Por favor, intenta nuevamente.');
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

  async predict() {
    try {
      const image = this.imageElement.nativeElement;
      this.predictions = await this.teachablemachine.predict(image);
  
      if (this.predictions.length > 0) {
        // Encontrar la predicción con mayor probabilidad
        const bestPrediction = this.predictions.reduce((max, item) =>
          item.probability > max.probability ? item : max
          , this.predictions[0]);
  
        console.log("Mejor predicción:", bestPrediction.className, bestPrediction.probability);
  
        // Si la probabilidad es mayor al 70%, establecer automáticamente en score
        if (bestPrediction.probability > 0.7) {
          // Establecer el valor del score dependiendo de la clase predicha
          let predictedClass = "";
          if (bestPrediction.className.toLowerCase().includes("automovil")) {
            predictedClass = "Automovil";
          } else if (bestPrediction.className.toLowerCase().includes("animal")) {
            predictedClass = "Animal";
          } else {
            predictedClass = "Desconocido"; // En caso de que la clase no sea ni Automovil ni Animal
          }
  
          this.myForm.patchValue({ score: predictedClass });
        }
      }
    } catch (error) {
      console.error(error);
      alert('Error al realizar la predicción.');
    }
  }
}
