import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
// import { TeamsService } from '@shadow-arena-legends/teams/data-layer';
// import { PlayersService } from '@shadow-arena-legends/players/data-layer';
import {
  TournamentEntity,
  TournamentsService,
} from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-stats-tallier',
  templateUrl: './stats-tallier.component.html',
  styleUrls: ['./stats-tallier.component.scss'],
})
export class StatsTallierComponent {
  tournamentReferenceId: Observable<string>;
  isTourneyFinished: Observable<boolean>;

  constructor(
    route: ActivatedRoute,
    router: Router,
    // private playersService: PlayersService,
    // private teamsService: TeamsService,
    private tournamentsService: TournamentsService
  ) {
    this.tournamentReferenceId = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string)
    );
    const tournamentEntity = this.tournamentReferenceId.pipe(
      switchMap((id) => this.tournamentsService.getTournamentEntity(id)),
      tap((tournament) => {
        if (!tournament) {
          router.navigate(['../../../'], { relativeTo: route });
        }
      }),
      filter((tournament): tournament is TournamentEntity => !!tournament)
    );

    this.isTourneyFinished = tournamentEntity.pipe(
      map((tourney) => {
        const endDate = new Date(tourney.endDateTime);
        endDate.setDate(endDate.getDate() + 1);
        return Number(new Date()) >= Number(endDate);
      })
    );
  }
}
