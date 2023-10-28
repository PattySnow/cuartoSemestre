import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservasPageRoutingModule } from './reservas-routing.module';

import { ReservasPage } from './reservas.page';

import { VerReservasComponent } from 'src/app/components/ver-reservas/ver-reservas.component';
import { CrearReservaComponent } from 'src/app/components/crear-reserva/crear-reserva.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservasPageRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule
  ],
  declarations: [ReservasPage, VerReservasComponent, CrearReservaComponent]
})
export class ReservasPageModule {}
