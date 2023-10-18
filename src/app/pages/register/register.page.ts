import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  userData = {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    telefono: '',
    rut: '',
  };

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  async register() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.userData.email,
        this.userData.password
      );
  
      if (userCredential.user) {
        // Obtén el UID del usuario recién registrado
        const userId = userCredential.user.uid;
  
        // Almacena los datos directamente en Firestore junto con el UID del usuario
        await this.firestore.collection('clientes').doc(userId).set({
          nombre: this.userData.nombre,
          apellido: this.userData.apellido,
          telefono: this.userData.telefono,
          rut: this.userData.rut,
          // Asegúrate de incluir el UID del usuario en el documento
          userId: userId,
        });
  
        // Redirige al usuario a la página de inicio después del registro
        this.router.navigate(['/home']);
      } else {
        console.error('El registro no fue exitoso.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  }
  
  
}
