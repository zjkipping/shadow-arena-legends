import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

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
  ],
})
export class TournamentsFeatureStatsTallierModule {}
