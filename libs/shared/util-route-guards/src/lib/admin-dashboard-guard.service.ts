import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService, UserRole } from '@shadow-arena-legends/auth/data-layer';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardGuardService implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map((user) => {
        if (!user) {
          this.router.navigate(['login']);
          return false;
        }
        if (
          !(user?.role === UserRole.Admin || user?.role === UserRole.Tallier)
        ) {
          this.router.navigate(['no-access']);
          return false;
        }

        return true;
      })
    );
  }
}
