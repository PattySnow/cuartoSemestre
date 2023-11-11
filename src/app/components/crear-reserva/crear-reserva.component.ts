import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { reservasI } from 'src/app/interfaces/reservas.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.scss'],
})
export class CrearReservaComponent {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  nuevaReserva: reservasI = {
    patente: '',
    marca: '',
    modelo: '',
    anio: 0,
    kilometraje: 0,
    fecha: '',
    hora: '',
    uidUsuario: '',
  };

  horasDisponibles: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  currentDate: Date = new Date();

  async onSubmit() {
    await this.crearReserva();
  }

  async crearReserva() {
    try {
      this.nuevaReserva.hora = this.nuevaReserva.hora || this.horasDisponibles[0];

      const response = await this.apiService.crearReservaRealtimeDb(this.nuevaReserva).toPromise();

      if (response && response.name) {
        this.mostrarAlerta('Reserva exitosa');
        this.limpiarCampos();
      } else {
        this.mostrarAlertaError('Error al crear reserva. Consulta la consola para obtener más detalles.');
        console.error('Error al crear reserva en Realtime Database', response);
      }
    } catch (error) {
      this.mostrarAlertaError('Error al crear reserva. Consulta la consola para obtener más detalles.');
      console.error('Error al crear reserva en Realtime Database', error);
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async mostrarAlertaError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  limpiarCampos() {
    this.nuevaReserva = {
      patente: '',
      marca: '',
      modelo: '',
      anio: 0,
      kilometraje: 0,
      fecha: '',
      hora: '',
      uidUsuario: '',
    };
  }
}
