import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TeamsService } from '@shadow-arena-legends/teams/data-layer';
import {
  TournamentDoc,
  TournamentForList,
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
  tournamentEntities: Observable<TournamentForList[]>;

  constructor(
    private tournamentsService: TournamentsService,
    private teamsService: TeamsService,
    private dialog: MatDialog
  ) {
    this.tournamentEntities = tournamentsService.getTournamentsForList();
  }

  async addNewTournament() {
    const result = await this.dialog
      .open<EditTournamentModalComponent, undefined, TournamentDoc>(
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
      await this.tournamentsService.addNewTournament(result);
    }
  }

  async editTournament(tournament: TournamentForList) {
    const result = await this.dialog
      .open<EditTournamentModalComponent, TournamentForList, TournamentDoc>(
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
      await this.tournamentsService.updateTournament(
        tournament.referenceId,
        result
      );
    }
  }

  async deleteTournament(tournament: TournamentForList) {
    const result = await this.dialog
      .open<
        DeleteTournamentConfirmationModalComponent,
        TournamentForList,
        boolean
      >(DeleteTournamentConfirmationModalComponent, {
        width: '400px',
        height: '225px',
        data: tournament,
      })
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      await this.tournamentsService.deleteTournament(tournament.referenceId);
      // remove tournament from all team's references.
      // TODO: this should probably be a cloud function effect
      const teams = await this.tournamentsService
        .getParticipatingTeamsInTournament(tournament.referenceId)
        .pipe(take(1))
        .toPromise();
      await Promise.all(
        teams.map((team) =>
          this.teamsService.removeTournamentReference(
            team.teamId,
            tournament.referenceId
          )
        )
      );
    }
  }
}
