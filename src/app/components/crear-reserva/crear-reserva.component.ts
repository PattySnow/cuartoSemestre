import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { reservasI } from 'src/app/interfaces/reservas.interface';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.scss'],
})
export class CrearReservaComponent {
  constructor(private apiService: ApiService, private authService: AuthService) {}

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
  horaSeleccionada: string = '';
  currentDate: Date = new Date();

  onSubmit() {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.crearReserva();
      } else {
        // El usuario no está autenticado, puedes mostrar un mensaje de error o redirigirlo a la página de inicio de sesión.
      }
    });
  }

  crearReserva() {
    this.nuevaReserva.hora = this.horaSeleccionada;
    this.apiService.crearReserva(this.nuevaReserva).subscribe(
      (response) => {
        console.log('Reserva creada con éxito', response);
      },
      (error) => {
        console.error('Error al crear reserva', error);
      }
    );
  }
}
