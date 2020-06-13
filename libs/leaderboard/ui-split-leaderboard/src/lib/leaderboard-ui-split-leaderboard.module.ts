import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplitLeaderboardComponent } from './split-leaderboard/split-leaderboard.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitLeaderboardComponent],
  exports: [SplitLeaderboardComponent],
})
export class LeaderboardUiSplitLeaderboardModule {}
