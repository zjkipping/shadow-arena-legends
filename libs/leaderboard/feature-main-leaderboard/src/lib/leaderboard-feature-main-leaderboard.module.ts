import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { LeaderboardUiPlayerKillsLeaderboardModule } from '@shadow-arena-legends/leaderboard/ui-player-kills-leaderboard';
import { LeaderboardUiSplitLeaderboardModule } from '@shadow-arena-legends/leaderboard/ui-split-leaderboard';

import { MainLeaderboardComponent } from './main-leaderboard/main-leaderboard.component';

@NgModule({
  declarations: [MainLeaderboardComponent],
  imports: [
    CommonModule,
    LeaderboardUiSplitLeaderboardModule,
    LeaderboardUiPlayerKillsLeaderboardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLeaderboardComponent,
      },
    ]),
  ],
})
export class LeaderboardFeatureMainLeaderboardModule {}
