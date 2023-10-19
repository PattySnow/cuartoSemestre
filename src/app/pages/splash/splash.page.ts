import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    console.log('SplashPage ngOnInit was called.'); // Agregar este console.log

    setTimeout(() => {
      console.log('Redirecting to login page...'); // Agregar este console.log
      this.router.navigateByUrl('login');
    }, 1000);
  }
}
