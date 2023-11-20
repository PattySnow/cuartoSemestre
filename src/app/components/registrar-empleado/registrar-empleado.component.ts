import { Component } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { empleadosI } from 'src/app/interfaces/empleados.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.scss'],
})
export class RegistrarEmpleadoComponent {

  nuevoEmpleado: empleadosI = {
    nombre: '',
    apellido: '',
    rut: '',
    telefono: 0,
    direccion: '',
    email: '',
    cargo: '',
    uidUsuario: '',
    password: '',
  };

  constructor(
    private empleadosService: EmpleadosService,
    private alertController: AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Empleado registrado',
      message: 'Empleado registrado exitosamente!',
      buttons: ['OK']
    });

    await alert.present();
  }

  registrarEmpleado() {
    // Verifica que se hayan ingresado email y password
    if (this.nuevoEmpleado.email && this.nuevoEmpleado.password) {
      this.empleadosService.register(this.nuevoEmpleado.email, this.nuevoEmpleado.password, this.nuevoEmpleado)
        .then((response) => {
          console.log('Empleado registrado:', response);
          // Reiniciar los campos después del registro exitoso
          this.nuevoEmpleado = {
            nombre: '',
            apellido: '',
            rut: '',
            telefono: 0,
            direccion: '',
            email: '',
            cargo: '',
            uidUsuario: '',
            password: '',
          };
          // Muestra la alerta después del registro exitoso
          this.presentAlert();
        })
        .catch((error) => {
          console.error('Error al registrar empleado:', error);
          // Manejar el error en tu interfaz de usuario si es necesario
        });
    } else {
      // Manejar la situación donde faltan email y/o password
      console.error('Debe ingresar email y password');
    }
  }
}
