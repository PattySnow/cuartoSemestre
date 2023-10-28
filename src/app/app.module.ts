import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';  
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HTTP_INTERCEPTORS

import { environment } from 'src/environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { AuthInterceptor } from './services/auth.interceptor'; // Importa el interceptor personalizado

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, AngularFireModule,AngularFirestoreModule.enablePersistence(), HttpClientModule, FormsModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAU_RtaPS2UcgmWRSmXW1N2RaqH3pc09fc",
      authDomain: "tallermecanicoapp-27c7a.firebaseapp.com",
      projectId: "tallermecanicoapp-27c7a",
      storageBucket: "tallermecanicoapp-27c7a.appspot.com",
      messagingSenderId: "174491079965",
      appId: "1:174491079965:web:4fbbc0e3e9f389fd42fdf4",
      measurementId: "G-GW6FNHPK25"
    })),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public router: Router) {
  }
}
