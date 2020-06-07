import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@shadow-arena-legends/auth/data-layer';

@Component({
  selector: 'sal-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss'],
})
export class NoAccessComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
