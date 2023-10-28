import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservasPage } from './reservas.page';
import { VerReservasComponent } from 'src/app/components/ver-reservas/ver-reservas.component';
import { CrearReservaComponent } from 'src/app/components/crear-reserva/crear-reserva.component';
import { ModificarReservaComponent } from 'src/app/components/modificar-reserva/modificar-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: ReservasPage,
    children: [
      {
        path: 'mis-reservas',
        component: VerReservasComponent
      },
      {
        path: 'reservar-servicio',
        component: CrearReservaComponent
      },
      {
        path: 'modificar-reserva',
        component: ModificarReservaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasPageRoutingModule { }
