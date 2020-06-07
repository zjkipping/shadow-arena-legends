import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NavLink } from '@shadow-arena-legends/shared/util-types';

@Component({
  selector: 'sal-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Input() links: NavLink[] = [];
  @Output() logoutClicked = new EventEmitter();

  navOpen = true;
}