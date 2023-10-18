import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';


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
  segment: string = 'default'; // Define la propiedad segment y asigna un valor por defecto

  
  constructor(
    private rutaActiva: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.rutaActiva.queryParams.subscribe((params) => {
      if (params['usuario']) {
        this.mensaje = `BIENVENIDO ${params['usuario'].toUpperCase()}`;
        document.cookie = `usuario=${params['usuario']}; SameSite=None; Secure`;
        this.getUserName(params['usuario']);
      }
    });

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }



  getUserName(usuarioId: string) {
    this.firestore
      .collection('Cliente')
      .doc(usuarioId)
      .valueChanges()
      .subscribe((userData: any) => {
        if (userData && userData.Nombre) {
          this.userName = userData.Nombre;
        } else {
          console.log('El documento no existe o no contiene el campo "Nombre".');
        }
        console.log('Nombre del usuario:', this.userName);
      });
  }

  doSomething() {
    console.log('Opción 1 seleccionada');
  }

  doSomethingElse() {
    console.log('Opción 2 seleccionada');
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
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
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
