import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthUILoginModule {}
