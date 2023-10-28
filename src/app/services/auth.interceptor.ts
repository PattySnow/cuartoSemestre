import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.afAuth.idToken.pipe(
      take(1),
      mergeMap((token) => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(req);
      }),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Ha ocurrido un error')); // Usar una función para crear el error
      })
    );
  }
}
