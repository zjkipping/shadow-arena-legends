import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamsLandingContainerComponent } from './teams-landing-container/teams-landing-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeamsLandingContainerComponent,
        children: [],
      },
    ]),
  ],
  declarations: [TeamsLandingContainerComponent],
})
export class TeamsFeatureLandingModule {}
