import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { LeaderboardUiLeaderboardRowModule } from '@shadow-arena-legends/leaderboard/ui-leaderboard-rows';

import { PlayerKillsLeaderboardComponent } from './player-kills-leaderboard/player-kills-leaderboard.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    LeaderboardUiLeaderboardRowModule,
  ],
  declarations: [PlayerKillsLeaderboardComponent],
  exports: [PlayerKillsLeaderboardComponent],
})
export class LeaderboardUiPlayerKillsLeaderboardModule {}
