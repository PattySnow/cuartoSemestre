import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service'; // Asegúrate de importar el servicio FirestoreService
import { reservasI } from 'src/app/interfaces/reservas.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.scss'],
})
export class ModificarReservaComponent {
  reserva: reservasI = {
    numeroPatente: '',
    marca: '',
    modelo: '',
    ano: 0,
    kilometraje: 0,
    fecha: '',
    hora: '',
    uidUsuario: '',
  };
  currentDate: string = ''; // Agrega esta propiedad
  horasDisponibles: string[] = ['10:00 am', '12:00 pm', '02:00 pm', '04:00 pm']; // Agrega esta propiedad
  horaSeleccionada: string = '0';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService, // Inyecta el servicio FirestoreService
    private alertController: AlertController
  ) {
    this.currentDate = new Date().toISOString();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const reservaId = paramMap.get('id');

      if (reservaId) {
        this.firestoreService.getDoc<reservasI>('reservas', reservaId).subscribe((data) => {
          if (data) {
            this.reserva = data;
          } else {
            console.log('La reserva no se encontró.');
          }
        });
      } else {
        console.log('ID de reserva no válido.');
      }
    });
  }
  onHoraSeleccionadaChange(newHora: string) {
    this.horaSeleccionada = newHora;
  }
  modificarReserva() {
    if (this.reserva.id) {
      this.firestoreService.updateDoc(this.reserva, 'reservas', this.reserva.id).then(() => {
        console.log('Cambios guardados con éxito');
        this.router.navigate(['/mis-reservas']);
      }).catch((error) => {
        console.error('Error al guardar los cambios:', error);
      });
    } else {
      console.log('ID de reserva no válido.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['mis-reservas']);
          },
        },
      ],
    });

    await alert.present();
  }
}
