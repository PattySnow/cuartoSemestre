import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin = {
    email: '',
    password: '',
  };

  errorMessage: string = ''; // Variable para mostrar mensajes de error

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async iniciarSesion() {
    const { email, password } = this.formLogin;
    this.errorMessage = '';

    try {
      const userCredential = await this.authService.login(email, password);
      console.log('Inicio de sesión exitoso');

      // Aquí puedes obtener el token de autenticación del usuario
      if (userCredential.user) {
        const user = userCredential.user;
        const token = await user.getIdToken();
        console.log('Token de autenticación:', token);
      }

      // Redirige al usuario a la página de inicio (home) y pasa el parámetro 'usuario'
      this.router.navigate(['/home'], {
        queryParams: { usuario: email } // Puedes cambiar 'email' al campo que contenga el nombre de usuario
      });
    } catch (error: any) { // Usa ": any" para indicar que es de tipo "any" y permite comprobar "error.code"
      console.error('Error al iniciar sesión:', error);

      if (error.code === 'auth/invalid-login-credentials') {
        this.errorMessage = 'Su cuenta o contraseña no son correctas.';
      } else {
        this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo más tarde.';
      }
    }
  }

  cerrarSesion() {
    this.authService.logout()
      .then(() => {
        console.log('Cierre de sesión exitoso');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
        this.errorMessage = 'Error al cerrar sesión. Inténtalo de nuevo más tarde.';
      });
  }
}
