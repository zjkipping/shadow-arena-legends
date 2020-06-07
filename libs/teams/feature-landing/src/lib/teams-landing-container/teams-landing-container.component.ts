import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  TeamDoc,
  TeamEntity,
  TeamsService,
} from '@shadow-arena-legends/teams/data-layer';
import { DeleteTeamConfirmationModalComponent } from '@shadow-arena-legends/teams/modals/feature-delete-team-confirmation-modal';
import { EditTeamModalComponent } from '@shadow-arena-legends/teams/modals/feature-edit-team-modal';

@Component({
  selector: 'sal-teams-landing-container',
  templateUrl: './teams-landing-container.component.html',
  styleUrls: ['./teams-landing-container.component.scss'],
})
export class TeamsLandingContainerComponent {
  teamEntities: Observable<TeamEntity[]>;

  constructor(private teamsService: TeamsService, private dialog: MatDialog) {
    this.teamEntities = teamsService.getTeamEntities();
  }

  async addNewTeam() {
    const result = await this.dialog
      .open<EditTeamModalComponent, any, TeamDoc>(EditTeamModalComponent, {
        width: '400px',
        height: '525px',
      })
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.teamsService.addNewTeam(result);
    }
  }

  async editTeam(team: TeamEntity) {
    const result = await this.dialog
      .open<EditTeamModalComponent, any, TeamDoc>(EditTeamModalComponent, {
        width: '400px',
        height: '525px',
        data: team,
      })
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.teamsService.updateTeam(team.referenceId, result);
    }
  }

  async deleteTeam(team: TeamEntity) {
    const result = await this.dialog
      .open<DeleteTeamConfirmationModalComponent, any, boolean>(
        DeleteTeamConfirmationModalComponent,
        {
          width: '400px',
          height: '200px',
          data: team,
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.teamsService.deleteTeam(team.referenceId);
    }
  }
}
