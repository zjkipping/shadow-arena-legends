import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
import {
  TournamentEntity,
  TournamentsService,
} from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-manager-container',
  templateUrl: './manager-container.component.html',
  styleUrls: ['./manager-container.component.scss'],
})
export class ManagerContainerComponent {
  tournament: Observable<TournamentEntity>;

  constructor(
    private tournamentsService: TournamentsService,
    route: ActivatedRoute,
    router: Router
  ) {
    this.tournament = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string),
      switchMap((id) => this.tournamentsService.getTournamentEntity(id)),
      tap((tournament) => {
        if (!tournament) {
          router.navigate(['../../'], { relativeTo: route });
        }
      }),
      filter((tournament): tournament is TournamentEntity => !!tournament)
    );
  }

  toggleLive(_tourney: TournamentEntity) {}
}
