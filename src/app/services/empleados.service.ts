import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { empleadosI } from 'src/app/interfaces/empleados.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {

  private realtimeDbUrl = 'https://tallermecanicoapp-27c7a-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth) {}

  async register(email: string, password: string, empleado: empleadosI): Promise<any> {
    try {
      const userCredential = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  
      if (userCredential.user) {
        const uidUsuario = userCredential.user.uid;
  
        // Asignamos la UID del usuario al empleado antes de eliminar la propiedad password
        empleado.uidUsuario = uidUsuario;
  
        // Eliminamos la propiedad password del objeto empleado
        const { password: _password, ...empleadoSinPassword } = empleado;
  
        // Guardamos los datos del empleado en Realtime Database sin incluir la contraseña
        await this.crearEmpleadoEnRealTimeDB(uidUsuario, empleadoSinPassword);
  
        // Resto de tu lógica (mostrar mensaje, redireccionar, etc.)
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  }
  
  crearEmpleadoEnRealTimeDB(uidUsuario: string, empleado: any): Promise<any> {
    return this.http.put(`${this.realtimeDbUrl}/empleados/${uidUsuario}.json`, empleado).toPromise();
  }
  

  obtenerEmpleados(): Observable<any> {
    return this.http.get(`${this.realtimeDbUrl}/empleados.json`);
  }

  obtenerEmpleadoPorId(id: string): Observable<any> {
    return this.http.get(`${this.realtimeDbUrl}/empleados/${id}.json`);
  }

  actualizarEmpleado(id: string, empleado: empleadosI): Observable<any> {
    return this.http.put(`${this.realtimeDbUrl}/empleados/${id}.json`, empleado);
  }

  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.realtimeDbUrl}/empleados/${id}.json`);
  }
}
