import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AlertController } from '@ionic/angular';
import { clientesI } from 'src/app/interfaces/clientes.interface';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  userData: clientesI = {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    telefono: '',
    rut: '',
    uidUsuario: '',
  };

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private alertController: AlertController
  ) {}

  async register() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.userData.email,
        this.userData.password
      );

      if (userCredential.user) {
        const uidUsuario = userCredential.user.uid;
        this.userData.uidUsuario = uidUsuario; // Asigna el UID al objeto userData

        const { password, ...clienteDataSinPassword } = this.userData;

        await this.db.object(`/clientes/${uidUsuario}`).set(clienteDataSinPassword);

        this.showRegistrationAlert();
        this.router.navigate(['/home']);
      } else {
        console.error('El registro no fue exitoso.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  }

  async showRegistrationAlert() {
    const alert = await this.alertController.create({
      header: '¡Gracias por registrarte!',
      message: 'Tu registro se ha completado con éxito.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
