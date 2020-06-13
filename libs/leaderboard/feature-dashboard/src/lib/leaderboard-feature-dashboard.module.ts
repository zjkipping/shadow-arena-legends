import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: `tournaments/:${TOURNAMENT_ID_ROUTE_PARAM}`,
        loadChildren: () =>
          import('@shadow-arena-legends/leaderboard/feature-tournament').then(
            (m) => m.LeaderboardFeatureTournamentModule
          ),
      },
    ]),
  ],
})
export class LeaderboardFeatureDashboardModule {}
