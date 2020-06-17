import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeaderboardPlayerKillsHeaderComponent } from './player-kills/leaderboard-team-points-header/leaderboard-player-kills-header.component';
import { LeaderboardPlayerKillsRowComponent } from './player-kills/leaderboard-team-points-row/leaderboard-player-kills-row.component';
import { LeaderboardTeamPointsHeaderComponent } from './team-points/leaderboard-team-points-header/leaderboard-team-points-header.component';
import { LeaderboardTeamPointsRowComponent } from './team-points/leaderboard-team-points-row/leaderboard-team-points-row.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LeaderboardTeamPointsHeaderComponent,
    LeaderboardTeamPointsRowComponent,
    LeaderboardPlayerKillsHeaderComponent,
    LeaderboardPlayerKillsRowComponent,
  ],
  exports: [
    LeaderboardTeamPointsHeaderComponent,
    LeaderboardTeamPointsRowComponent,
    LeaderboardPlayerKillsHeaderComponent,
    LeaderboardPlayerKillsRowComponent,
  ],
})
export class LeaderboardUiLeaderboardRowModule {}
