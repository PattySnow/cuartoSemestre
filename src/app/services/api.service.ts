import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservasI } from 'src/app/interfaces/reservas.interface';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private firestoreUrl = 'https://us-central1-tallermecanicoapp-27c7a.cloudfunctions.net/app/api'; 
  private realtimeDbUrl = 'https://tallermecanicoapp-27c7a-default-rtdb.firebaseio.com'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  // CRUD para Firestore

  crearReserva(reserva: reservasI): Observable<any> {
    return this.http.post(`${this.firestoreUrl}/create`, reserva);
  }

  obtenerReservas(): Observable<any> {
    return this.http.get(`${this.firestoreUrl}/getAllFirestore`);
  }

  obtenerReservaPorId(id: string): Observable<any> {
    return this.http.get(`${this.firestoreUrl}/get/${id}`);
  }

  actualizarReserva(id: string, reserva: reservasI): Observable<any> {
    return this.http.put(`${this.firestoreUrl}/update/${id}`, reserva);
  }

  eliminarReserva(id: string): Observable<any> {
    return this.http.delete(`${this.firestoreUrl}/delete/${id}`);
  }

  // CRUD para Realtime Database

  crearReservaRealtimeDb(reserva: reservasI): Observable<any> {
    // Obtén la uid del usuario actual de manera asíncrona
    return new Observable((observer) => {
      this.authService.getCurrentUserUID().then((uidUsuario) => {
        // Añade la uid del usuario a la reserva
        reserva.uidUsuario = uidUsuario || ''; // Si uidUsuario es null, asigna una cadena vacía

        // Realiza la solicitud HTTP después de obtener la uid del usuario
        this.http.post(`${this.realtimeDbUrl}/reservas.json`, reserva).subscribe(
          (response) => {
            console.log('Reserva creada con éxito', response);
            observer.next(response); // Emitir el éxito al observador
            observer.complete(); // Completar el observable
          },
          (error) => {
            console.error('Error al crear reserva', error);
            observer.error(error); // Emitir el error al observador
          }
        );
      });
    });
  }

  obtenerReservasRealtimeDb(): Observable<any> {
    return this.http.get(`${this.realtimeDbUrl}/reservas.json`);
  }

  obtenerReservaPorIdRealtimeDb(id: string): Observable<any> {
    return this.http.get(`${this.realtimeDbUrl}/reservas/${id}.json`);
  }

  actualizarReservaRealtimeDb(id: string, reserva: reservasI): Observable<any> {
    return this.http.put(`${this.realtimeDbUrl}/reservas/${id}.json`, reserva);
  }

  eliminarReservaRealtimeDb(id: string): Observable<any> {
    return this.http.delete(`${this.realtimeDbUrl}/reservas/${id}.json`);
  }
}
