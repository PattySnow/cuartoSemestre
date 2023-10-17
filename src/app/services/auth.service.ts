import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  // Registro de usuario
  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Inicio de sesión
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Cierre de sesión
  logout() {
    return this.auth.signOut();
  }

  // Restablecimiento de contraseña
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
}
