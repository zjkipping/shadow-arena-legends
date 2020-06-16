import { Component, Inject, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { FocusedTeamOption } from '@shadow-arena-legends/shared/util-types';
import {
  TeamEntity,
  TeamsService,
} from '@shadow-arena-legends/teams/data-layer';
import { TournamentsService } from '@shadow-arena-legends/tournaments/data-layer';

import { FormControlWithTeam } from '../../types';

@Component({
  selector: 'sal-focused-teams-modal',
  templateUrl: './focused-teams-modal.component.html',
  styleUrls: ['./focused-teams-modal.component.scss'],
})
export class FocusedTeamsModalComponent implements OnInit {
  focusedTeamsControl: FormArray | undefined;
  loading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { currentlyFocusedTeams: string[]; tourneyId: string },
    private dialogRef: MatDialogRef<FocusedTeamsModalComponent>,
    private tournamentsService: TournamentsService,
    private teamsService: TeamsService
  ) {}

  async ngOnInit() {
    const teamOptions: FocusedTeamOption[] = await this.tournamentsService
      .getParticipatingTeamsInTournament(this.data.tourneyId)
      .pipe(
        take(1),
        switchMap((teams) =>
          !teams.length
            ? of([])
            : combineLatest(
                teams.map((team) =>
                  this.teamsService.getTeamEntity(team.teamId).pipe(take(1))
                )
              )
        ),
        map((teams) =>
          teams
            .filter((team): team is TeamEntity => !!team)
            .map((team) => ({ name: team.name, referenceId: team.referenceId }))
            .sort((a, b) => {
              if (a.name === b.name) {
                return 0;
              } else if (a.name > b.name) {
                return 1;
              } else {
                return -1;
              }
            })
        )
      )
      .toPromise();

    this.focusedTeamsControl = new FormArray(
      teamOptions.map((teamOption) => {
        const control = new FormControlWithTeam(
          teamOption,
          !this.data.currentlyFocusedTeams ||
            this.data.currentlyFocusedTeams.includes(teamOption.referenceId)
        );
        return control;
      })
    );

    this.loading = false;
  }

  setAllValues(val: boolean) {
    if (this.focusedTeamsControl) {
      this.focusedTeamsControl.controls.forEach((control) =>
        control.setValue(val)
      );
    }
  }

  submit() {
    if (this.focusedTeamsControl) {
      const focusedTeams = (this.focusedTeamsControl
        .controls as FormControlWithTeam[])
        .filter((teamControl) => !!teamControl.value)
        .map((teamControl) => teamControl.team.referenceId);
      this.dialogRef.close(focusedTeams);
    }
  }
}
