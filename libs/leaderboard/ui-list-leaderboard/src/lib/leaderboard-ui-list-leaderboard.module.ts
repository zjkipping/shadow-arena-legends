import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { LeaderboardUiLeaderboardRowModule } from '@shadow-arena-legends/leaderboard/ui-leaderboard-rows';

import { ListLeaderboardComponent } from './list-leaderboard/list-leaderboard.component';

@NgModule({
  imports: [
    CommonModule,
    LeaderboardUiLeaderboardRowModule,
    MatProgressSpinnerModule,
  ],
  declarations: [ListLeaderboardComponent],
  exports: [ListLeaderboardComponent],
})
export class LeaderboardUiListLeaderboardModule {}
