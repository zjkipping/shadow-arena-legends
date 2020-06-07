import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '@shadow-arena-legends/auth/data-layer';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginGuardService implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map((user) => !user),
      tap((load) => {
        if (!load) {
          this.router.navigate(['dashboard']);
        }
      })
    );
  }
}
