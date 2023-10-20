import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomePageRoutingModule } from './home-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BarcodeComponent } from '../components/barcode/barcode.component';
import { VerReservasComponent } from '../components/ver-reservas/ver-reservas.component';
import { ContactoComponent } from '../components/contacto/contacto.component';
import { CrearReservaComponent } from '../components/crear-reserva/crear-reserva.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,

  ],
  declarations: [HomePage, BarcodeComponent, VerReservasComponent, ContactoComponent, CrearReservaComponent],

})
export class HomePageModule {}

