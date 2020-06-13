import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListLeaderboardComponent } from './list-leaderboard/list-leaderboard.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListLeaderboardComponent],
  exports: [ListLeaderboardComponent],
})
export class LeaderboardUiListLeaderboardModule {}
