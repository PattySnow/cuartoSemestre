import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { reservasI } from 'src/app/interfaces/reservas.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  reservas: reservasI[] = []; // Declara la propiedad reservas

  constructor(private firestore: AngularFirestore) {
    this.obtenerReservas().subscribe((reservas) => {
      this.reservas = reservas;
    });
  }

  // Función para crear una reserva
  crearReserva(reserva: reservasI) {
    return this.firestore.collection('reservas').add(reserva);
  }

  // Función para obtener todas las reservas
  obtenerReservas(): Observable<reservasI[]> {
    return this.firestore.collection<reservasI>('reservas').valueChanges();
  }

  // Función para obtener una reserva específica por ID
  obtenerReservaPorId(id: string): Observable<reservasI> {
    return this.firestore.collection('reservas').doc(id).valueChanges() as Observable<reservasI>;
  }

  // Función para actualizar una reserva
  actualizarReserva(id: string, reserva: reservasI) {
    return this.firestore.collection('reservas').doc(id).update(reserva);
  }

  // Función para eliminar una reserva por ID
  eliminarReserva(id: string) {
    return this.firestore.collection('reservas').doc(id).delete();
  }
}
