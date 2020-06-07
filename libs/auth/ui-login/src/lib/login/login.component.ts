import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UsernamePasswordPayload } from '@shadow-arena-legends/auth/data-layer';

@Component({
  selector: 'sal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() googleMethodSubmitted = new EventEmitter();
  @Output() usernamePasswordMethodSubmitted = new EventEmitter<
    UsernamePasswordPayload
  >();

  @Input() showUsernamePassMethod = false;
}
