import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { TeamsModalsFeatureDeleteTeamConfirmationModalModule } from '@shadow-arena-legends/teams/modals/feature-delete-team-confirmation-modal';
import { TeamsModalsFeatureEditTeamModalModule } from '@shadow-arena-legends/teams/modals/feature-edit-team-modal';
import { TeamsUiTeamsListModule } from '@shadow-arena-legends/teams/ui-teams-list';

import { TeamsLandingContainerComponent } from './teams-landing-container/teams-landing-container.component';

@NgModule({
  imports: [
    CommonModule,
    TeamsUiTeamsListModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    TeamsModalsFeatureDeleteTeamConfirmationModalModule,
    TeamsModalsFeatureEditTeamModalModule,
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
