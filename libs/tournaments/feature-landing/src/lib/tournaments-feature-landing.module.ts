import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TournamentsLandingContainerComponent } from './tournaments-landing-container/tournaments-landing-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TournamentsLandingContainerComponent,
        children: [],
      },
    ]),
  ],
  declarations: [TournamentsLandingContainerComponent],
})
export class TournamentsFeatureLandingModule {}
