import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { FocusedTeamsModalComponent } from './focused-teams-modal/focused-teams-modal.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { StatTallyComponent } from './stat-tally/stat-tally.component';
import { StatsTallierComponent } from './stats-tallier/stats-tallier.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StatsTallierComponent,
      },
    ]),
  ],
  declarations: [
    StatsTallierComponent,
    TeamStatsComponent,
    PlayerStatsComponent,
    StatTallyComponent,
    FocusedTeamsModalComponent,
  ],
  entryComponents: [FocusedTeamsModalComponent],
})
export class TournamentsFeatureStatsTallierModule {}
