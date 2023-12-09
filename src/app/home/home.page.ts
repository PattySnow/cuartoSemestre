import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  userType: string = '';
  showBarcode: boolean = false;
  showContacto: boolean = false;
  segment: string = 'default';

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        const userUid = user.uid;

        this.getUserInfo(userUid)
          .then((userInfo: any) => {
            if (userInfo) {
              this.userName = `Bienvenid@ ${userInfo.nombre}`;
              this.userType = userInfo.tipo;
              this.segmentLogic();
            } else {
              console.log('Usuario no encontrado');
            }
          })
          .catch((error: any) => {
            console.error('Error al obtener la información del usuario:', error);
          });
      } else {
        console.log('No se encontró un usuario autenticado');
      }
    });
  }

  getUserInfo(uidUsuario: string): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Buscando en clientes...');
      const clientesRef = this.db.object(`/clientes/${uidUsuario}`).valueChanges();
  
      clientesRef.subscribe((cliente: any) => {
        console.log('Cliente:', cliente);
        if (cliente && cliente.uidUsuario === uidUsuario) {
          resolve({ nombre: cliente.nombre, tipo: 'cliente' });
        } else {
          console.log('No se encontró en clientes. Buscando en empleados...');
          const empleadosRef = this.db.object(`/empleados/${uidUsuario}`).valueChanges();
  
          empleadosRef.subscribe((empleado: any) => {
            console.log('Empleado:', empleado);
            if (empleado && empleado.uidUsuario === uidUsuario) {
              resolve({ nombre: empleado.nombre, tipo: 'empleado' });
            } else {
              console.log('No se encontró en empleados. Buscando en administrador...');
              const adminRef = this.db.object(`/administrador/${uidUsuario}`).valueChanges();
  
              adminRef.subscribe((admin: any) => {
                console.log('Admin:', admin);
                if (admin && admin.uidUsuario === uidUsuario) {
                  resolve({ nombre: 'Admin', tipo: 'admin' });
                } else {
                  console.log('No se encontró en administrador.');
                  resolve(null); // No se encontró en ninguna colección
                }
              });
            }
          });
        }
      }, (error: any) => {
        console.error('Error:', error);
        reject(error); // Manejo de errores en caso de problemas de acceso a la base de datos
      });
    });
  }
  
  

  segmentLogic() {
    if (this.userType === 'admin') {
      this.showBarcode = false;
      this.showContacto = this.segment === 'contacto';
    } else {
      this.showBarcode = this.segment === 'pagar';
      this.showContacto = this.segment === 'contacto';
    }
  }

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Cierre de sesión exitoso');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
