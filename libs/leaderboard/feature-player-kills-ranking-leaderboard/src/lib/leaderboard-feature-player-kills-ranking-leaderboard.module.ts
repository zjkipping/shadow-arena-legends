import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LeaderboardUiPlayerKillsLeaderboardModule } from '@shadow-arena-legends/leaderboard/ui-player-kills-leaderboard';

import { PlayerKillsRankingComponent } from './player-kills-ranking/player-kills-ranking.component';

@NgModule({
  declarations: [PlayerKillsRankingComponent],
  imports: [
    CommonModule,
    LeaderboardUiPlayerKillsLeaderboardModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayerKillsRankingComponent,
      },
    ]),
  ],
})
export class LeaderboardFeaturePlayerKillsRankingLeaderboardModule {}
