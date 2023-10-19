import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async resetPassword() {
    if (!this.email) {
      console.error('Por favor, ingrese su dirección de correo electrónico.');
      return;
    }

    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      // Restablecimiento de contraseña exitoso
      await this.presentResetPasswordSuccessAlert();
      this.router.navigate(['/login']); // Redirige al usuario al inicio de sesión
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
    }
  }

  async presentResetPasswordSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Correo de Restablecimiento Enviado',
      message: 'Se ha enviado un correo para restablecer su contraseña.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
