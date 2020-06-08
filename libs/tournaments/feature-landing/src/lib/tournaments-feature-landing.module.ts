import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
import { TournamentsModalsFeatureDeleteTournamentConfirmationModalModule } from '@shadow-arena-legends/tournaments/modals/feature-delete-tournament-confirmation-modal';
import { TournamentsModalsFeatureEditTournamentModalModule } from '@shadow-arena-legends/tournaments/modals/feature-edit-tournament-modal';
import { TournamentsUiTournamentListModule } from '@shadow-arena-legends/tournaments/ui-tournament-list';

import { TournamentsLandingContainerComponent } from './tournaments-landing-container/tournaments-landing-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TournamentsLandingContainerComponent,
      },
      {
        path: `manage/:${TOURNAMENT_ID_ROUTE_PARAM}`,
        loadChildren: () =>
          import('@shadow-arena-legends/tournaments/feature-manager').then(
            (m) => m.TournamentsFeatureManagerModule
          ),
      },
    ]),
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    TournamentsUiTournamentListModule,
    TournamentsModalsFeatureDeleteTournamentConfirmationModalModule,
    TournamentsModalsFeatureEditTournamentModalModule,
  ],
  declarations: [TournamentsLandingContainerComponent],
})
export class TournamentsFeatureLandingModule {}
