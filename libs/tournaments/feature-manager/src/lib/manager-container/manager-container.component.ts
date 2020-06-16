import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
import {
  TournamentEntity,
  TournamentsService,
} from '@shadow-arena-legends/tournaments/data-layer';
import { SetLiveConfirmationModalComponent } from '@shadow-arena-legends/tournaments/modals/feature-set-live-confirmation-modal';

import { TournamentLinksModalComponent } from '../tournament-links-modal/tournament-links-modal.component';

@Component({
  selector: 'sal-manager-container',
  templateUrl: './manager-container.component.html',
  styleUrls: ['./manager-container.component.scss'],
})
export class ManagerContainerComponent {
  tournament: Observable<TournamentEntity>;

  constructor(
    private tournamentsService: TournamentsService,
    private dialog: MatDialog,
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

  async toggleLive(tourney: TournamentEntity) {
    if (!tourney.live) {
      const result = await this.dialog
        .open<SetLiveConfirmationModalComponent, TournamentEntity, boolean>(
          SetLiveConfirmationModalComponent,
          {
            height: '300px',
            width: '500px',
            data: tourney,
          }
        )
        .afterClosed()
        .pipe(take(1))
        .toPromise();

      if (result) {
        this.tournamentsService.setTourneyToLive(tourney.referenceId);
      }
    }
  }

  showTourneyLinks(tourneyId: string) {
    this.dialog.open(TournamentLinksModalComponent, {
      height: '400px',
      width: '500px',
      data: tourneyId,
    });
  }
}
