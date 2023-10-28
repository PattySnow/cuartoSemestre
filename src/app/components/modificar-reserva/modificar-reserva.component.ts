import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'src/app/services/api.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.scss'],
})
export class ModificarReservaComponent {
  id: string = '';
  currentDate: string = ''; // Agrega esta propiedad
  horasDisponibles: string[] = ['10:00 am', '12:00 pm', '02:00 pm', '04:00 pm']; // Agrega esta propiedad
  nuevaReserva: any = {
    fecha: '', // Inicializa fecha y hora en el formulario
    hora: '',
  };

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    private apiService: ApiService
  ) {
    this.currentDate = new Date().toISOString();
  }

  editarForm = new FormGroup({
    
    fecha: new FormControl(''),
    hora: new FormControl('')
});

  ngOnInit() {
    
  }
/*
  async actualizarReserva(id: string) {
    const actualizarReserva = {
      hora: this.nuevaReserva.hora,
      // Agrega otros campos a actualizar según tus necesidades
    };

    const alert = await this.alertController.create({
      header: 'Confirmar Actualización',
      message: '¿Estás seguro de que deseas actualizar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario canceló la actualización, no se hace nada
          },
        },
        {
          text: 'Actualizar',
          handler: () => {
            this.apiService.actualizarReserva(id, actualizarReserva).subscribe(
              () => {
                // La reserva se actualizó exitosamente
                console.log('Reserva actualizada con éxito');
                // Actualiza la lista de reservas o realiza otras acciones necesarias
                // Vuelve a cargar la lista de reservas después de la actualización
              },
              (error) => {
                // Hubo un error al actualizar la reserva
                console.error('Error al actualizar la reserva:', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }*/
}
