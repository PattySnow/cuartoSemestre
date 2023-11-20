import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { reservasI } from 'src/app/interfaces/reservas.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-reservas',
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.scss'],
})
export class VerReservasComponent implements OnInit {
  reservaAEditar: reservasI = {
    id: '',
    patente: '',
    marca: '',
    modelo: '',
    anio: 0,
    kilometraje: 0,
    fecha: '',
    hora: '',
    uidUsuario: '',
  };

  editarReserva: boolean = false;
  reservas: reservasI[] = [];
  horasDisponibles: string[] = ['10:00 am', '12:00 pm', '02:00 pm', '04:00 pm'];
  horaSeleccionada: string = '';
  selectedFecha: string = '';
  minFecha: string = '';

  constructor(
    public alertController: AlertController,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.mostrarReservas();
    this.setMinFecha();
  }

  mostrarReservas() {
    this.apiService.obtenerReservasRealtimeDb().subscribe(
      (response: any) => {
        if (response) {
          // Asigna las fechas directamente al arreglo de reservas
          this.reservas = Object.keys(response).map((key) => ({ id: key, ...response[key] }));
          
          console.log('Arreglo de reservas Realtime Database:', this.reservas);
        } else {
          console.error("La respuesta no es válida o no contiene datos.");
        }
      },
      (error) => {
        console.error("Error al obtener reservas de Realtime Database:", error);
      }
    );
  }
  
  

  mostrarFormulario(id: string) {
    this.editarReserva = true;
    this.apiService.obtenerReservaPorIdRealtimeDb(id).subscribe((reserva) => {
      this.reservaAEditar = {
        id: id,
        ...reserva,
      };
    });
  }

  async deleteReserva(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario canceló la eliminación, no se hace nada
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.apiService.eliminarReservaRealtimeDb(id).subscribe(
              () => {
                console.log('Reserva eliminada con éxito de Realtime Database');
                this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
              },
              (error) => {
                console.error('Error al eliminar la reserva de Realtime Database:', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  updateReserva() {
    if (this.reservaAEditar && this.reservaAEditar.id) {
      this.apiService.actualizarReservaRealtimeDb(this.reservaAEditar.id, this.reservaAEditar).subscribe(
        (response: any) => {
          console.log('Respuesta de actualización de reserva:', response);
          if (response) {
            console.log('Reserva actualizada con éxito en Realtime Database.');
            this.mostrarReservas();  // Llama a mostrarReservas después de la actualización exitosa
            this.cancelarEdicion();
            this.router.navigate(['/reservas/mis-reservas']);
          } else {
            console.error("Error al actualizar la reserva en Realtime Database. Respuesta vacía.");
          }
        },
        (error) => {
          console.error("Error al actualizar la reserva en Realtime Database:", error);
        }
      );
    }
  }

  cancelarEdicion() {
    this.editarReserva = false;
    this.reservaAEditar = {
      id: '',
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

  setMinFecha() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minFecha = `${year}-${month}-${day}`;
  }


  
  
}
