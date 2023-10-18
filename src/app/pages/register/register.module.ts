import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page'; // Importa tu componente de registro

@NgModule({
  declarations: [RegisterPage], // Agrega tu componente de registro a las declaraciones
  imports: [CommonModule, FormsModule, IonicModule, RegisterPageRoutingModule],
})
export class RegisterPageModule {}
