import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service'; // Asegúrate de importar el servicio FirestoreService
import { reservasI } from 'src/app/interfaces/reservas.interface';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.scss'],
})
export class ModificarReservaComponent {
  numeroPatente: string = '';
  marca: string = '';
  modelo: string = '';
  ano: number = 0;
  kilometraje: number = 0;
  selectedDate: string = '';
  horaSeleccionada: string = '';
  currentDate: string = ''; // Agrega esta propiedad
  horasDisponibles: string[] = ['10:00 am', '12:00 pm', '02:00 pm', '04:00 pm']; // Agrega esta propiedad
  reservas: reservasI[] = []; // Agrega esta propiedad
  
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    private apiService: ApiService
  ) {
    this.currentDate = new Date().toISOString();
  }
  ngOnInit() {
    
  }
}
