import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { LeaderboardUiSplitLeaderboardModule } from '@shadow-arena-legends/leaderboard/ui-split-leaderboard';

import { MainLeaderboardComponent } from './main-leaderboard/main-leaderboard.component';

@NgModule({
  declarations: [MainLeaderboardComponent],
  imports: [
    CommonModule,
    LeaderboardUiSplitLeaderboardModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLeaderboardComponent,
      },
    ]),
  ],
})
export class LeaderboardFeatureMainLeaderboardModule {}
