import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { VerReservasComponent } from '../components/ver-reservas/ver-reservas.component';
import { CrearReservaComponent } from '../components/crear-reserva/crear-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'mis-reservas',
        component: VerReservasComponent
      },
      {
        path: 'reservar-servicio',
        component: CrearReservaComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
