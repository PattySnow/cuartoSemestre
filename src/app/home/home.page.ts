import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mensaje: string = '';
  userName: string = '';
  isSupported = false;
  barcodes: Barcode[] = [];
  segment: string = 'default';

  constructor(
    private rutaActiva: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    this.authService.user.subscribe((user) => {
      if (user) {
        this.getUserName(user.uid);
      }
    });
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

  async scan(): Promise<void> {
    console.log('Ejecutando escáner de código de barras...');
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    console.log('Ejecutando scanner...'); // Agrega el console.log aquí
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
