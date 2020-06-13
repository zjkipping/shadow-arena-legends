import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeaderboardHeaderComponent } from './leaderboard-header/leaderboard-header.component';
import { LeaderboardRowComponent } from './leaderboard-row/leaderboard-row.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LeaderboardRowComponent, LeaderboardHeaderComponent],
  exports: [LeaderboardRowComponent, LeaderboardHeaderComponent],
})
export class LeaderboardUiLeaderboardRowModule {}
