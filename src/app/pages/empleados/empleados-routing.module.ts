import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarEmpleadoComponent } from 'src/app/components/registrar-empleado/registrar-empleado.component';

import { EmpleadosPage } from './empleados.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadosPage,
    children: [
      {
        path: 'registrar-empleado',
        component: RegistrarEmpleadoComponent
      }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosPageRoutingModule {}
