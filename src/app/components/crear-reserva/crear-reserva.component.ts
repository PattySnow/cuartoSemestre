import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { reservasI } from 'src/app/interfaces/reservas.interface';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.scss'],
})
export class CrearReservaComponent {
  numeroPatente: string = '';
  marca: string = '';
  modelo: string = '';
  ano: number = 0;
  kilometraje: number = 0;
  selectedDate: string = '';
  horaSeleccionada: string = '';
  currentDate: string = ''; // Agrega esta propiedad
  horasDisponibles: string[] = ['10:00 am', '12:00 pm', '02:00 pm', '04:00 pm']; // Agrega esta propiedad
  reservas: reservasI[] = []; // Agrega esta propiedad
  
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    private apiService: ApiService
  ) {
    this.currentDate = new Date().toISOString();
  }


  async reservar() {
    try {
      const user = await this.afAuth.currentUser;

      if (user) {
        const uid = user.uid;

        // Crear una nueva reserva
        const nuevaReserva: reservasI = {
          numeroPatente: this.numeroPatente,
          marca: this.marca,
          modelo: this.modelo,
          ano: this.ano,
          kilometraje: this.kilometraje,
          fecha: this.selectedDate,
          hora: this.horaSeleccionada,
          uidUsuario: uid,
        };

        // Llamar al servicio para crear la reserva en Firestore
        this.apiService.crearReserva(nuevaReserva).then((docRef) => {
          const nuevoId = docRef.id;
          console.log('Nuevo ID del documento creado en Firestore:', nuevoId);

          // Recargar la lista de reservas después de crear una nueva
          this.apiService.obtenerReservas().subscribe((reservas: reservasI[]) => {
            // Actualizar la lista de reservas
            this.apiService.reservas = reservas;
          });

          // Mostrar una alerta de reserva exitosa
          this.mostrarAlerta('Reserva Exitosa', 'Su reserva se ha registrado con éxito.');

          // Limpiar los campos del formulario
          this.limpiarCampos();
        }).catch((error) => {
          console.error('Error al crear reserva: ', error);
        });
      } else {
        console.error('Usuario no autenticado. Inicie sesión para hacer una reserva.');
      }
    } catch (error) {
      console.error('Error al hacer la reserva:', error);
    }
  }

  async limpiarCampos() {
    this.numeroPatente = '';
    this.marca = '';
    this.modelo = '';
    this.ano = 0;
    this.kilometraje = 0;
    this.selectedDate = '';
    this.horaSeleccionada = '';
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }
}
