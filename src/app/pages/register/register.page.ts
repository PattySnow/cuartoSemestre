import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  userData = {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    telefono: '',
    rut: '',
  };

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  async register() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.userData.email,
        this.userData.password
      );

      if (userCredential.user) {
        const userId = userCredential.user.uid;

        await this.firestore.collection('clientes').doc(userId).set({
          nombre: this.userData.nombre,
          apellido: this.userData.apellido,
          telefono: this.userData.telefono,
          rut: this.userData.rut,
          userId: userId,
        });

        // Muestra el mensaje emergente de agradecimiento
        this.showRegistrationAlert();

        // Redirige al usuario a la página de inicio después del registro
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
