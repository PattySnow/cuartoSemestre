import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAU_RtaPS2UcgmWRSmXW1N2RaqH3pc09fc",
  authDomain: "tallermecanicoapp-27c7a.firebaseapp.com",
  projectId: "tallermecanicoapp-27c7a",
  storageBucket: "tallermecanicoapp-27c7a.appspot.com",
  messagingSenderId: "174491079965",
  appId: "1:174491079965:web:4fbbc0e3e9f389fd42fdf4",
  measurementId: "G-GW6FNHPK25"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
