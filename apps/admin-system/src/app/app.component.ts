import { Component } from '@angular/core';
import { NavLink } from '@shadow-arena-legends/shared/util-types';

@Component({
  selector: 'sal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
}
