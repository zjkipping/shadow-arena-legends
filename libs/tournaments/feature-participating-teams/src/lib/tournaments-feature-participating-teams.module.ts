import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ParticipatingTeamsComponent } from './participating-teams/participating-teams.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParticipatingTeamsComponent,
      },
    ]),
  ],
  declarations: [ParticipatingTeamsComponent],
})
export class TournamentsFeatureParticipatingTeamsModule {}
