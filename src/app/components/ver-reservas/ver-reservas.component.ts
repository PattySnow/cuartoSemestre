import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    private authService: AuthService,
    private apiService: ApiService,
    private firestore: AngularFirestore,
    private router: Router, 
  ) {}

  ngOnInit() {
    this.mostrarReservas();
    this.setMinFecha();
  }


  mostrarReservas() {
    this.apiService.obtenerReservas().subscribe((response) => {
      if (response.status === "Success" && Array.isArray(response.data)) {
        this.reservas = response.data;
        console.log('Arreglo de reservas:', this.reservas);
      } else {
        console.error("La respuesta no es válida o no contiene datos.");
      }
    });
  }

  mostrarFormulario(id: string) {
    this.editarReserva = true;
    // Agrega un console.log para verificar si se está obteniendo el ID de la reserva
    console.log("ID de la reserva:", id);
    // Obtén el ID de reserva al hacer clic en "Editar" y utilízalo para cargar los detalles de la reserva.
    this.apiService.obtenerReservaPorId(id).subscribe((reserva) => {
      this.reservaAEditar = {
        id: id, // Asegúrate de incluir el ID en los datos de la reserva
        ...reserva, // Copia todos los demás detalles de la reserva
      };
      // Agrega otro console.log para verificar la información de la reserva
      console.log("Detalles de la reserva:", this.reservaAEditar);
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
            this.apiService.eliminarReserva(id).subscribe(
              () => {
                console.log('Reserva eliminada con éxito');
                this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
              },
              (error) => {
                console.error('Error al eliminar la reserva:', error);
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
      this.apiService.actualizarReserva(this.reservaAEditar.id, this.reservaAEditar).subscribe(
        (response) => {
          if (response.status === "Success") {
            console.log('Reserva actualizada con éxito.');
            this.cancelarEdicion(); // Reinicia las propiedades para salir del modo de edición
  
            // Redirige al usuario a la página de "mis-reservas" después de una actualización exitosa
            this.router.navigate(['/reservas/mis-reservas']);
  
          
          } else {
            console.error("Error al actualizar la reserva.");
          }
        },
        (error) => {
          console.error("Error al actualizar la reserva:", error);
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
