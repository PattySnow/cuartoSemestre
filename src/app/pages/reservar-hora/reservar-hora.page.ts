import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-reservar-hora',
  templateUrl: './reservar-hora.page.html',
  styleUrls: ['./reservar-hora.page.scss'],
})
export class ReservarHoraPage {
  nombre: string = '';
  numeroPatente: string = '';
  marca: string = '';
  modelo: string = '';
  ano: number = 0;
  kilometraje: number = 0;
  fechaHora: string = '';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router // Agrega el Router
  ) {}

  async reservar() {
    try {
      const user = await this.afAuth.currentUser;

      if (user) {
        const uid = user.uid;

        const reserva = {
          numeroPatente: this.numeroPatente,
          marca: this.marca,
          modelo: this.modelo,
          ano: this.ano,
          kilometraje: this.kilometraje,
          fechaHora: this.fechaHora,
          uidUsuario: uid,
        };

        await this.firestore.collection('reservas').add(reserva);

        const alert = await this.alertController.create({
          header: 'Reserva Exitosa',
          message: 'Su reserva se ha registrado con éxito.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/home']);
              },
            },
          ],
        });

        await alert.present();
      } else {
        console.error('Usuario no autenticado. Inicie sesión para hacer una reserva.');
      }
    } catch (error) {
      console.error('Error al hacer la reserva:', error);
    }
  }
}
