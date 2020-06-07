import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { NoAccessComponent } from './no-access/no-access.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NoAccessComponent,
      },
    ]),
  ],
  declarations: [NoAccessComponent],
})
export class AuthFeatureNoAccessModule {}
