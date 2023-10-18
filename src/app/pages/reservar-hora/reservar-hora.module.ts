import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservarHoraPageRoutingModule } from './reservar-hora-routing.module';

import { ReservarHoraPage } from './reservar-hora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservarHoraPageRoutingModule
  ],
  declarations: [ReservarHoraPage]
})
export class ReservarHoraPageModule {}