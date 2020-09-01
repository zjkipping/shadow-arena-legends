import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { LeaderboardUiTeamScoresLeaderboardModule } from '@shadow-arena-legends/leaderboard/ui-team-scores-leaderboard';

import { StreamLeaderboardComponent } from './stream-leaderboard.component';

@NgModule({
  declarations: [StreamLeaderboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StreamLeaderboardComponent,
      },
    ]),
    LeaderboardUiTeamScoresLeaderboardModule,
  ],
})
export class LeaderboardFeatureStreamLeaderboardModule {}
