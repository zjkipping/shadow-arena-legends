import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { PlayersModalsFeatureDeletePlayerConfirmationModalModule } from '@shadow-arena-legends/players/modals/feature-delete-player-confirmation-modal';
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
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    PlayersUiPlayerListModule,
    PlayersModalsFeatureEditPlayerModalModule,
    PlayersModalsFeatureDeletePlayerConfirmationModalModule,
  ],
  declarations: [PlayersLandingContainerComponent],
})
export class PlayersFeatureLandingModule {}
