import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayersLandingContainerComponent } from './players-landing-container/players-landing-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayersLandingContainerComponent,
        children: [],
      },
    ]),
  ],
  declarations: [PlayersLandingContainerComponent],
})
export class PlayersFeatureLandingModule {}
