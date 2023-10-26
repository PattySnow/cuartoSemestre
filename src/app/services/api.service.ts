import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { reservasI } from '../interfaces/reservas.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  reservas: reservasI[] = [];

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {
    this.obtenerReservas().subscribe((reservas) => {
      this.reservas = reservas;
    });
  }

  crearReserva(reserva: reservasI) {
    return this.firestore.collection('reservas').add(reserva);
  }

  obtenerReservas(): Observable<reservasI[]> {
    return this.firestore.collection<reservasI>('reservas').valueChanges();
  }

  obtenerReservaPorId(id: string): Observable<reservasI> {
    return this.firestore.collection('reservas').doc(id).valueChanges() as Observable<reservasI>;
  }

  actualizarReserva(id: string, reserva: reservasI) {
    return this.firestore.collection('reservas').doc(id).update(reserva);
  }

  eliminarReserva(id: string) {
    return this.firestore.collection('reservas').doc(id).delete();
  }

  
}
