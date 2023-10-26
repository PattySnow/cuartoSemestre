import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuardFn } from 'src/app/guards/auth-fn.guard';
import { VerReservasComponent } from './components/ver-reservas/ver-reservas.component';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ModificarReservaComponent } from './components/modificar-reserva/modificar-reserva.component';
import { NotFoundPage } from './pages/not-found/not-found.page';



const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [authGuardFn]
    
  },
  



  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },

  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then(m => m.ContactoPageModule)
  },
  
  {
    path: 'crear-reserva',
    component: CrearReservaComponent,
    canActivate: [authGuardFn]

  },

  {
    path: 'modificar-reserva/:id',
    component: ModificarReservaComponent
  },

  {
    path: 'mis-reservas',
    component: VerReservasComponent,
    canActivate: [authGuardFn]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
