import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservas: any [] = [];
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
    private rutaActiva: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    
  }

  
  

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Cierre de sesión exitoso');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}