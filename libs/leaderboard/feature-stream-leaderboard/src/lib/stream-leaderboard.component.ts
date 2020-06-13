import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import {
  LeaderboardService,
  TeamWithPoints,
} from '@shadow-arena-legends/leaderboard/data-layer';
import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
import {
  TournamentEntity,
  TournamentsService,
} from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-stream-leaderboard-component',
  template: `<sal-split-leaderboard
    [teams]="teams | async"
  ></sal-split-leaderboard>`,
})
export class StreamLeaderboardComponent {
  tournament: Observable<TournamentEntity>;
  teams: Observable<TeamWithPoints[]>;

  constructor(
    ls: LeaderboardService,
    route: ActivatedRoute,
    ts: TournamentsService
  ) {
    const tournamentId = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.tournament = tournamentId.pipe(
      switchMap((id) => ts.getTournamentEntity(id)),
      tap((tournament) => {
        if (!tournament) {
          // do something?
        }
      }),
      filter((tournament): tournament is TournamentEntity => !!tournament),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.teams = this.tournament.pipe(
      switchMap((tourney) =>
        ls.getTeamsWithPoints(tourney.referenceId, {
          pointsPerFirst: tourney.pointsPerFirst,
          pointsPerSecond: tourney.pointsPerSecond,
          pointsPerThird: tourney.pointsPerThird,
          pointsPerKill: tourney.pointsPerKill,
        })
      ),
      map((teams) => [
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
        ...teams,
      ])
    );
  }
}
