import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.default.User | null>;

  constructor(private auth: AngularFireAuth) {
    this.user = this.auth.authState;
  }

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

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map((user: firebase.default.User | null) => user !== null));
  }

  // Obtener el token de usuario
  getUserToken(): Observable<string | null> {
    return this.user.pipe(
      switchMap((user: firebase.default.User | null) => {
        if (user) {
          return from(user.getIdToken());
        } else {
          return of(null);
        }
      })
    );
  }

  getUid() {
    return this.user.pipe(
      take(1), // Toma el primer valor y completa la suscripción
      map((user: firebase.default.User | null) => {
        return user ? user.uid : null;
      })
    );
  }

  async getCurrentUserUID(): Promise<string | null> {
    const user = await this.auth.currentUser;
    return user ? user.uid : null;
  }
}
