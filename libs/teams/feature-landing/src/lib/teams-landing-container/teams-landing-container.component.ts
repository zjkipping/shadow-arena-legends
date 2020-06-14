import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { PlayersService } from '@shadow-arena-legends/players/data-layer';
import {
  TeamForList,
  TeamMemberWithName,
  TeamsService,
} from '@shadow-arena-legends/teams/data-layer';
import { DeleteTeamConfirmationModalComponent } from '@shadow-arena-legends/teams/modals/feature-delete-team-confirmation-modal';
import { EditTeamModalComponent } from '@shadow-arena-legends/teams/modals/feature-edit-team-modal';
import {
  EditTeamModalData,
  EditTeamModalResult,
} from '@shadow-arena-legends/teams/modals/util-modal-types';

@Component({
  selector: 'sal-teams-landing-container',
  templateUrl: './teams-landing-container.component.html',
  styleUrls: ['./teams-landing-container.component.scss'],
})
export class TeamsLandingContainerComponent {
  teams: Observable<TeamForList[]>;

  constructor(
    private teamsService: TeamsService,
    private playersService: PlayersService,
    private dialog: MatDialog
  ) {
    this.teams = teamsService.getTeamsForList();
  }

  async addNewTeam() {
    const result = await this.dialog
      .open<
        EditTeamModalComponent,
        Observable<EditTeamModalData | undefined>,
        EditTeamModalResult
      >(EditTeamModalComponent, {
        width: '400px',
        height: '525px',
        data: of(undefined),
      })
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      const doc = await this.teamsService.addNewTeam(result.team);
      result.membersToAdd.forEach(async (member) => {
        await Promise.all([
          this.teamsService.addMember(doc.id, member.referenceId),
          this.playersService.addTeamReferenceToPlayer(
            member.referenceId,
            doc.id
          ),
        ]);
      });
    }
  }

  async editTeam(team: TeamForList) {
    const loading = new BehaviorSubject<EditTeamModalData | undefined>(
      undefined
    );
    const dialogRef = this.dialog.open<
      EditTeamModalComponent,
      Observable<EditTeamModalData | undefined>,
      EditTeamModalResult
    >(EditTeamModalComponent, {
      width: '400px',
      height: '525px',
      data: loading,
    });

    const members = await combineLatest(
      team.members.map((member) =>
        this.playersService
          .getPlayerEntityOnce(member.playerId)
          .then((player) => {
            if (!!player) {
              return {
                name: player.name,
                ...member,
              };
            } else {
              return null;
            }
          })
      )
    )
      .pipe(
        map((list) => list.filter((m): m is TeamMemberWithName => !!m)),
        take(1)
      )
      .toPromise();

    loading.next({ team, members });
    loading.complete();

    const result = await dialogRef.afterClosed().pipe(take(1)).toPromise();

    if (result) {
      this.teamsService.updateTeam(team.referenceId, result.team);
      result.membersToRemove?.forEach(async (member) =>
        Promise.all([
          await this.teamsService.removeMember(
            team.referenceId,
            member.referenceId
          ),
          await this.playersService.removeTeamReferenceFromPlayer(
            member.playerId,
            team.referenceId
          ),
        ])
      );
      result.membersToAdd.forEach(
        async (member) =>
          await Promise.all([
            this.teamsService.addMember(team.referenceId, member.referenceId),
            this.playersService.addTeamReferenceToPlayer(
              member.referenceId,
              team.referenceId
            ),
          ])
      );
    }
  }

  async deleteTeam(team: TeamForList) {
    const result = await this.dialog
      .open<DeleteTeamConfirmationModalComponent, any, boolean>(
        DeleteTeamConfirmationModalComponent,
        {
          width: '400px',
          height: '225px',
          data: team,
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.teamsService.deleteTeam(team.referenceId);
      team.members.forEach(
        async (member) =>
          await this.teamsService.removeMember(
            team.referenceId,
            member.referenceId
          )
      );
      team.members.forEach(
        async (member) =>
          await this.playersService.removeTeamReferenceFromPlayer(
            member.playerId,
            team.referenceId
          )
      );
    }
  }
}
