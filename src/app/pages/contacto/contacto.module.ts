import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactoPageRoutingModule } from './contacto-routing.module';
import { ContactoPage } from './contacto.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoPageRoutingModule,

  ],
  declarations: [ContactoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Coloca CUSTOM_ELEMENTS_SCHEMA dentro de @NgModule
})
export class ContactoPageModule {}
