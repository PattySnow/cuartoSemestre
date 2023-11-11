import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent {
  constructor(private alertController: AlertController) {}

  async scan(): Promise<void> {
    console.log('Ejecutando escáner de código de barras...');
    // Puedes agregar la lógica de permisos aquí si es necesario para ngx-scanner-qrcode.
    // No se necesitan permisos especiales para ngx-scanner-qrcode en la mayoría de los casos.

    // Lógica para iniciar/parar el escaneo (ya se maneja en el HTML).
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
