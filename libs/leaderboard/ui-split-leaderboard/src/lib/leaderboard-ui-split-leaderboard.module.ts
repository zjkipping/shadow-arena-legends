import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { LeaderboardUiLeaderboardRowModule } from '@shadow-arena-legends/leaderboard/ui-leaderboard-row';

import { SplitLeaderboardComponent } from './split-leaderboard/split-leaderboard.component';

@NgModule({
  imports: [
    CommonModule,
    LeaderboardUiLeaderboardRowModule,
    MatProgressSpinnerModule,
  ],
  declarations: [SplitLeaderboardComponent],
  exports: [SplitLeaderboardComponent],
})
export class LeaderboardUiSplitLeaderboardModule {}
