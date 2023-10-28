import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular'; // Agregar esta importación

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit {
  isSupported = false; // DESACTIVA EL BOTON DE ESCANEAR SI EL ESCANER NO ES SOPORTADO EN LA PLATAFORMA
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {} 

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    console.log('Ejecutando escáner de código de barras...');
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    console.log('Ejecutando scanner...');
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
