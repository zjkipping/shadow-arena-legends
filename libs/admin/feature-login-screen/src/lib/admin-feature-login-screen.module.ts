import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthUILoginModule } from '@shadow-arena-legends/auth/ui-login';

import { LoginScreenComponent } from './login-screen/login-screen.component';

@NgModule({
  imports: [
    CommonModule,
    AuthUILoginModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginScreenComponent,
      },
    ]),
  ],
  declarations: [LoginScreenComponent],
})
export class AdminFeatureLoginScreenModule {}
