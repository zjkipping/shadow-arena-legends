import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@shadow-arena-legends/auth/data-layer';

@Component({
  selector: 'sal-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent {
  constructor(private auth: AuthService, private router: Router) {}

  async googleLogin() {
    const result = await this.auth.loginWithGoogle();
    if (result) {
      this.router.navigate(['dashboard']);
    }
  }
}
