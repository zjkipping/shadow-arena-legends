import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  TournamentDoc,
  TournamentEntity,
  TournamentsService,
} from '@shadow-arena-legends/tournaments/data-layer';
import { DeleteTournamentConfirmationModalComponent } from '@shadow-arena-legends/tournaments/modals/feature-delete-tournament-confirmation-modal';
import { EditTournamentModalComponent } from '@shadow-arena-legends/tournaments/modals/feature-edit-tournament-modal';

@Component({
  selector: 'sal-tournaments-landing-container',
  templateUrl: './tournaments-landing-container.component.html',
  styleUrls: ['./tournaments-landing-container.component.scss'],
})
export class TournamentsLandingContainerComponent {
  tournamentEntities: Observable<TournamentEntity[]>;

  constructor(
    private tournamentsService: TournamentsService,
    private dialog: MatDialog
  ) {
    this.tournamentEntities = tournamentsService.getTournamentEntities();
  }

  async addNewTournament() {
    const result = await this.dialog
      .open<EditTournamentModalComponent, any, TournamentDoc>(
        EditTournamentModalComponent,
        {
          width: '600px',
          height: '425px',
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.tournamentsService.addNewTournament(result);
    }
  }

  async editTournament(tournament: TournamentEntity) {
    const result = await this.dialog
      .open<EditTournamentModalComponent, any, TournamentDoc>(
        EditTournamentModalComponent,
        {
          width: '600px',
          height: '425px',
          data: tournament,
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.tournamentsService.updateTournament(tournament.referenceId, result);
    }
  }

  async deleteTournament(tournament: TournamentEntity) {
    const result = await this.dialog
      .open<DeleteTournamentConfirmationModalComponent, any, boolean>(
        DeleteTournamentConfirmationModalComponent,
        {
          width: '400px',
          height: '225px',
          data: tournament,
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.tournamentsService.deleteTournament(tournament.referenceId);
    }
  }
}
