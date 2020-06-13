import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// tslint:disable-next-line: nx-enforce-module-boundaries
import { LeaderboardUiListLeaderboardModule } from '@shadow-arena-legends/leaderboard/ui-list-leaderboard';

import { SpectatingLeaderboardComponent } from './spectating-leaderboard.component';

@NgModule({
  declarations: [SpectatingLeaderboardComponent],
  imports: [
    CommonModule,
    LeaderboardUiListLeaderboardModule,
    RouterModule.forChild([
      {
        path: '',
        component: SpectatingLeaderboardComponent,
      },
    ]),
  ],
})
export class LeaderboardFeatureSpectatingLeaderboardModule {}
