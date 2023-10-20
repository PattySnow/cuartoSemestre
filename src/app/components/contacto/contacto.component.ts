import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent  implements OnInit {

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  center: any = {
  

    lat: -33.57109,
    lng: -70.5874214,
  };
  markerId!: string;


  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: this.center,
        zoom: 13,
      },
    });
    this.addMarker(this.center.lat, this.center.lng);
  }

  async addMarker(lat: any, lng: any){
    this.markerId = await this.newMap.addMarker({
      coordinate:{
        lat: lat,
        lng: lng,
      },
      draggable: false
    })
  }


}
