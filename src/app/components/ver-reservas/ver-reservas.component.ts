import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { reservasI } from 'src/app/interfaces/reservas.interface';

@Component({
  selector: 'app-ver-reservas',
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.scss'],
})
export class VerReservasComponent implements OnInit {
  reservas: reservasI[] = [];
  numeroPatente: string = ''; // Definir e inicializar estas variables
  marca: string = '';
  modelo: string = '';
  ano: number = 0;
  kilometraje: number = 0;
  selectedDate: string = ''; // Asegúrate de que selectedDate sea una cadena
  uid: string = ''; // Asigna el valor correcto a uid

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.obtenerReservas().subscribe((reservas: reservasI[]) => {
      this.reservas = reservas;
    });
  }

  editarReserva(reserva: reservasI) {
    // Implementa la lógica para editar una reserva, por ejemplo, navegando a una página de edición.
    // Ejemplo:
    // this.router.navigate(['/editar-reserva', reserva.id]);
  }
  eliminarReserva(reserva: reservasI) {
    console.log('Eliminar reserva llamado');
    const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar esta reserva?');
    
    if (confirmarEliminacion) {
      if (reserva.id) {
        this.apiService.eliminarReserva(reserva.id).then(() => {
          console.log('Reserva eliminada exitosamente');
          // Recargar la lista de reservas después de eliminar una reserva
          this.apiService.obtenerReservas().subscribe((reservas: reservasI[]) => {
            this.reservas = reservas;
          });
        }).catch(error => {
          console.error('Error al eliminar reserva: ', error);
        });
      }
    }
  }

  

  
}  