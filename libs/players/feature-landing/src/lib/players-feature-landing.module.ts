import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { PlayersModalsFeatureEditPlayerModalModule } from '@shadow-arena-legends/players/modals/feature-edit-player-modal';
import { PlayersUiPlayerListModule } from '@shadow-arena-legends/players/ui-player-list';

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
    PlayersUiPlayerListModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    PlayersModalsFeatureEditPlayerModalModule,
  ],
  declarations: [PlayersLandingContainerComponent],
})
export class PlayersFeatureLandingModule {}
