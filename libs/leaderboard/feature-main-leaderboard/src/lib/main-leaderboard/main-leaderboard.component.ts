import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import {
  LeaderboardService,
  PlayerWithKills,
  TeamWithPoints,
} from '@shadow-arena-legends/leaderboard/data-layer';
import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
import {
  TournamentEntity,
  TournamentsService,
} from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-main-leaderboard-component',
  templateUrl: './main-leaderboard.component.html',
  styleUrls: ['main-leaderboard.component.scss'],
})
export class MainLeaderboardComponent {
  players: Observable<PlayerWithKills[]>;
  tournament: Observable<TournamentEntity>;
  teams: Observable<TeamWithPoints[]>;

  constructor(
    leaderboardService: LeaderboardService,
    route: ActivatedRoute,
    tournamentsService: TournamentsService
  ) {
    const tournamentId = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.tournament = tournamentId.pipe(
      switchMap((id) => tournamentsService.getTournamentEntity(id)),
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
        leaderboardService.getTeamsWithPoints(tourney.referenceId, {
          pointsPerFirst: tourney.pointsPerFirst,
          pointsPerSecond: tourney.pointsPerSecond,
          pointsPerThird: tourney.pointsPerThird,
          pointsPerKill: tourney.pointsPerKill,
        })
      )
    );

    this.players = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string),
      switchMap((id) => leaderboardService.getPlayersWithKills(id))
    );
  }
}
