import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';  
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { environment } from 'src/environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,AngularFireModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "tu-api-key",
      authDomain: "tu-auth-domain",
      projectId: "tu-project-id",
      storageBucket: "tu-storage-bucket",
      messagingSenderId: "tu-messaging-sender-id",
      appId: "tu-app-id",
      measurementId: "tu-measurement-id"
    })),
    provideFirestore(() => getFirestore()),],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.router.navigateByUrl('splash');
  }
}
