import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StatsTallierComponent } from './stats-tallier/stats-tallier.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StatsTallierComponent,
      },
    ]),
  ],
  declarations: [StatsTallierComponent],
})
export class TournamentsFeatureStatsTallierModule {}
