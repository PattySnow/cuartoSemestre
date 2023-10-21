import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { reservasI } from 'src/app/interfaces/reservas.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-reservas',
  templateUrl: './ver-reservas.component.html',
  styleUrls: ['./ver-reservas.component.scss'],
})
export class VerReservasComponent implements OnInit {
  reservas: reservasI[] = [];
  numeroPatente: string = ''; // Definir e inicializar estas variables
  marca: string = '';
  modelo: string = '';
  ano: number = 0;
  kilometraje: number = 0;
  selectedDate: string = ''; // Asegúrate de que selectedDate sea una cadena
  uid: string = ''; // Asigna el valor correcto a uid
  horasDisponibles: string[] = ['10:00 am', '12:00 pm', '02:00 pm', '04:00 pm'];
  horaSeleccionada: string = '';

  constructor(
    private firestoreService: FirestoreService,
    public alertController: AlertController,
    private authService: AuthService,
    private http: HttpClient,
    private afs: AngularFirestore // Agrega AngularFirestore
  ) {}

  ngOnInit() {
    // Obtener la lista de reservas al cargar el componente
    this.firestoreService.getCollection<reservasI>('reservas').subscribe((reservas: reservasI[]) => {
      this.reservas = reservas;
      console.log('IDs de los documentos en la colección "reservas":');
      reservas.forEach((reserva) => {
        console.log(reserva.id); // Imprimir el ID de cada documento
      });
    });
    // Obtener el UID del usuario actual
    this.authService.getUid().subscribe((uid) => {
      if (uid) {
        this.uid = uid;
        console.log('usuario id:', uid);
      }
    });
  }
  deleteReserva(id: string) {
    // Llamamos a la función deleteDoc del servicio para eliminar el documento por su ID
    this.firestoreService.deleteDoc('reservas', id).then(() => {
      // El documento se eliminó exitosamente
      console.log('Documento eliminado con éxito');
    }).catch(error => {
      // Hubo un error al eliminar el documento
      console.error('Error al eliminar el documento:', error);
    });
  }
}
