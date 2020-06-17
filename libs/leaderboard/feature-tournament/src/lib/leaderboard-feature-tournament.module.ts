import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'leaderboard',
      },
      {
        path: 'leaderboard',
        loadChildren: () =>
          import(
            '@shadow-arena-legends/leaderboard/feature-main-leaderboard'
          ).then((m) => m.LeaderboardFeatureMainLeaderboardModule),
      },
      {
        path: 'spectating',
        loadChildren: () =>
          import(
            '@shadow-arena-legends/leaderboard/feature-spectating-leaderboard'
          ).then((m) => m.LeaderboardFeatureSpectatingLeaderboardModule),
      },
      {
        path: 'stream',
        loadChildren: () =>
          import(
            '@shadow-arena-legends/leaderboard/feature-stream-leaderboard'
          ).then((m) => m.LeaderboardFeatureStreamLeaderboardModule),
      },
      {
        path: 'player-ranking',
        loadChildren: () =>
          import(
            '@shadow-arena-legends/leaderboard/feature-player-kills-ranking-leaderboard'
          ).then(
            (m) => m.LeaderboardFeaturePlayerKillsRankingLeaderboardModule
          ),
      },
    ]),
  ],
})
export class LeaderboardFeatureTournamentModule {}
