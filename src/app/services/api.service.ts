import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservasI } from 'src/app/interfaces/reservas.interface'; 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://us-central1-tallermecanicoapp-27c7a.cloudfunctions.net/app/api';

  constructor(private http: HttpClient) {}

  crearReserva(reserva: reservasI): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, reserva);
  }

  obtenerReservas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`);
  }
  
  obtenerReservaPorId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }
 
  actualizarReserva(id: string, reserva: reservasI): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, reserva);
  }

  eliminarReserva(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
