import {
  animate,
  group,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NavLink } from '@shadow-arena-legends/shared/util-types';

@Component({
  selector: 'sal-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('navSlide', [
      transition(':enter', [
        style({ opacity: 0, width: 0 }),
        group([
          animate('200ms', style({ opacity: 1 })),
          animate('100ms', style({ width: '*' })),
        ]),
      ]),
      transition(':leave', [
        style({ opacity: 1, width: '*' }),
        group([
          animate('100ms', style({ opacity: 0 })),
          animate('200ms', style({ width: '0' })),
        ]),
      ]),
    ]),
  ],
})
export class SideNavComponent {
  @Input() links: NavLink[] = [];
  @Output() logoutClicked = new EventEmitter();

  navOpen = true;
}
