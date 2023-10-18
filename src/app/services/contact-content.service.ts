import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactContentService {
  private content: string = "Este es el contenido de la página de contacto.";
  private mapaInfo: any = {}; // Almacena información del mapa

  getContent(): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.content);
    });
  }

  setMapaInfo(info: any) {
    this.mapaInfo = info;
  }

  getMapaInfo() {
    return this.mapaInfo;
  }
}
