import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@shadow-arena-legends/auth/data-layer';
import { NavLink } from '@shadow-arena-legends/shared/util-types';

@Component({
  selector: 'sal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  navLinks: NavLink[] = [
    {
      label: 'Tournaments',
      route: 'tournaments',
    },
    {
      label: 'Teams',
      route: 'teams',
    },
    {
      label: 'Players',
      route: 'players',
    },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  async logout() {
    await this.auth.logout();
    await this.router.navigate(['login']);
  }
}
