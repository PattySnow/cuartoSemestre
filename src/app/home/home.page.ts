import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  segment: string = 'default';
  showBarcode: boolean = false;
  showContacto: boolean = false;
  userToken: string | null = null; // Agregar userToken

  constructor(
    private rutaActiva: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private afAuth: AngularFireAuth, // Agregar AngularFireAuth
    private router: Router
  ) {}

  toggleBarcodeVisibility() {
    this.showBarcode = this.segment === 'pagar';
    this.showContacto = this.segment === 'contacto';
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.getUserName(user.uid);
        this.getUserToken(); // Obtener el token cuando el usuario está autenticado
      }
    });
  }

  async getUserToken() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userToken = await user.getIdToken();
      console.log('Token de autenticación:', this.userToken);
    }
  }

  initCap(str: string): string {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return '';
  }

  getUserName(usuarioId: string) {
    this.firestore
      .collection('clientes')
      .doc(usuarioId)
      .valueChanges()
      .subscribe((userData: any) => {
        if (userData && userData.nombre) {
          this.userName = userData.nombre;
        } else {
          console.log('El documento no existe o no contiene el campo "Nombre".');
        }
        console.log('Nombre del usuario:', this.userName);
      });
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
