import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { LeaderboardUiLeaderboardRowModule } from '@shadow-arena-legends/leaderboard/ui-leaderboard-rows';

import { TeamScoresLeaderboardComponent } from './team-scores-leaderboard/team-scores-leaderboard.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    LeaderboardUiLeaderboardRowModule,
  ],
  declarations: [TeamScoresLeaderboardComponent],
  exports: [TeamScoresLeaderboardComponent],
})
export class LeaderboardUiTeamScoresLeaderboardModule {}
