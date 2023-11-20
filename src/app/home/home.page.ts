import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  menuItems: { label: string; link?: string; action?: () => void }[] = [];
  segment: string = 'default';
  showBarcode: boolean = false;
  showContacto: boolean = false;

  constructor(
    private rutaActiva: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  Segmentos() {
    const isAdmin = this.menuItems.some(item => item.label === 'Proveedores');
    
    if (isAdmin) {
      // Si es administrador, ocultar todos los segmentos
      this.showBarcode = false;
      this.showContacto = this.segment === 'contacto';
    } else {
      // Si es cliente, muestra los segmentos correspondientes
      this.showBarcode = this.segment === 'pagar';
      this.showContacto = this.segment === 'contacto';
    }
  }
  

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.getNombreCliente(user.uid)
          .then((foundInClientes: boolean) => {
            if (!foundInClientes) {
              this.getNombreAdmin(user.uid);
            }
            this.Segmentos(); // Llamar a la función después de obtener las opciones del menú
          })
          .catch((error: any) => {
            console.error('Error al buscar en clientes:', error);
          });
      }
    });
  }

  mostrarOpcionesAdministrador() {
    // Opciones para un usuario administrador
    this.menuItems = [
      { label: 'Inicio', link: '/home' },
      { label: 'Empleados', link: '/empleados' },
      { label: 'Clientes', link: '/clientes' },
      { label: 'Proveedores', link: '/proveedores' },
      { label: 'Servicios', link: '/servicios' },
      { label: 'Cerrar Sesión', action: this.logout.bind(this) },
    ];
  }

  mostrarOpcionesCliente() {
    // Opciones para clientes
    this.menuItems = [
      { label: 'Inicio', link: '/home' },
      { label: 'Mis Reservas', link: '/reservas' },
      { label: 'Cerrar Sesión', action: this.logout.bind(this) },
    ];
  }

  async getNombreCliente(usuarioId: string): Promise<boolean> {
    const clientesRef = this.firestore.collection('clientes').doc(usuarioId).ref;
    try {
      const userData = await clientesRef.get();
      if (userData.exists) {
        const data = userData.data() as any;
        if (data && data.nombre) {
          this.userName = data.nombre;
          this.mostrarOpcionesCliente(); // Establece las opciones para clientes
          console.log('Nombre del usuario (clientes):', this.userName);
          return true;
        }
      }
      console.log('No se encontró el nombre del usuario en clientes.');
      return false;
    } catch (error) {
      console.error('Error al obtener datos de clientes:', error);
      throw error;
    }
  }
  
  async getNombreAdmin(usuarioId: string): Promise<boolean> {
    const adminRef = this.firestore.collection('administrador').doc(usuarioId).ref;
    try {
      const userData = await adminRef.get();
      if (userData.exists) {
        const data = userData.data() as any;
        if (data && data.nombre) {
          this.userName = data.nombre;
          this.mostrarOpcionesAdministrador(); // Establece las opciones para administrador
          console.log('Nombre del usuario (administrador):', this.userName);
          return true;
        }
      }
      console.log('No se encontró el nombre del usuario en administrador.');
      return false;
    } catch (error) {
      console.error('Error al obtener datos de administrador:', error);
      throw error;
    }
  }
  
  

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Cierre de sesión exitoso');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  initCap(str: string): string {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return '';
  }
}
