import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservarHoraPage } from './reservar-hora.page';

const routes: Routes = [
  {
    path: '',
    component: ReservarHoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservarHoraPageRoutingModule {}
