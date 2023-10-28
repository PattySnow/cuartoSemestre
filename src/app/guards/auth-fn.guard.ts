import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs/operators";

export const authGuardFn: CanActivateFn = () => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  console.log ('Se ha implementado el Guard exitosamente!!! :D');
 
  return authService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        routerService.navigate(['/login']);
      }
      return isAuthenticated;
    })
  );
};
