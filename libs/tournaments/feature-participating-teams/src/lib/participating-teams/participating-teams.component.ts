import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';
import { TeamsService } from '@shadow-arena-legends/teams/data-layer';
import {
  ParticipatingTeamForTable,
  TournamentEntity,
  TournamentsService,
} from '@shadow-arena-legends/tournaments/data-layer';
import { RemoveParticipatingTeamConfirmationModalComponent } from '@shadow-arena-legends/tournaments/modals/feature-remove-participating-team-confirmation-modal';

interface TeamTypeAheadOption extends TypeAheadOption {
  tournamentId: string;
}

@Component({
  selector: 'sal-participating-teams',
  templateUrl: './participating-teams.component.html',
  styleUrls: ['./participating-teams.component.scss'],
})
export class ParticipatingTeamsComponent implements OnDestroy {
  @ViewChild(MatAutocompleteTrigger)
  autocomplete?: MatAutocompleteTrigger;
  teamsTypeAhead = new FormControl('');
  typeAheadOptions: Observable<TeamTypeAheadOption[]>;

  teamsForTable: Observable<ParticipatingTeamForTable[]>;

  destroy = new Subject();

  constructor(
    route: ActivatedRoute,
    router: Router,
    private teamsService: TeamsService,
    private tournamentsService: TournamentsService,
    private dialog: MatDialog
  ) {
    const tournamentReferenceId = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string)
    );
    const tournamentEntity = tournamentReferenceId.pipe(
      switchMap((id) => this.tournamentsService.getTournamentEntity(id)),
      tap((tournament) => {
        if (!tournament) {
          router.navigate(['../../../'], { relativeTo: route });
        }
      }),
      filter((tournament): tournament is TournamentEntity => !!tournament)
    );

    const participatingTeams = tournamentReferenceId.pipe(
      switchMap((id) =>
        this.tournamentsService
          .getParticipatingTeamsInTournament(id)
          .pipe(
            map((teams) => teams.map((team) => ({ ...team, tournamentId: id })))
          )
      )
    );

    this.teamsForTable = participatingTeams.pipe(
      switchMap((pTeams) =>
        pTeams.length > 0
          ? combineLatest(
              pTeams.map((pTeam) =>
                this.teamsService.getTeamEntity(pTeam.teamId).pipe(
                  map((team) => {
                    if (team) {
                      return {
                        name: team.name,
                        tournamentId: pTeam.tournamentId,
                        referenceId: pTeam.referenceId,
                      };
                    } else {
                      return null;
                    }
                  })
                )
              )
            ).pipe(
              map((teams) =>
                teams.filter(
                  (team): team is ParticipatingTeamForTable => !!team
                )
              )
            )
          : of([])
      )
    );

    this.typeAheadOptions = tournamentEntity.pipe(
      switchMap((tournament) =>
        combineLatest([
          participatingTeams.pipe(map((pts) => pts.map((pt) => pt.teamId))),
          this.teamsService.getTeamsForTypeAhead(tournament.type),
          of(tournament.referenceId),
        ])
      ),
      map(([currTeamIds, options, tournamentId]) =>
        options
          .filter((o) => !currTeamIds.includes(o.referenceId))
          .map((o) => ({ ...o, tournamentId }))
      )
    );

    this.teamsTypeAhead.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((typeAhead: string | TeamTypeAheadOption) => {
        if (
          typeof typeAhead !== 'string' &&
          !!typeAhead.name &&
          !!typeAhead.referenceId
        ) {
          this.teamsTypeAhead.setValue('');
          this.addTeam(typeAhead);
          setTimeout(() => {
            this.autocomplete?.openPanel();
          });
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  async addTeam(team: TeamTypeAheadOption) {
    await this.tournamentsService.addTeamToTournamentParticipants(
      team.tournamentId,
      team.referenceId
    );
  }

  async removeTeam(team: ParticipatingTeamForTable) {
    const result = await this.dialog
      .open<
        RemoveParticipatingTeamConfirmationModalComponent,
        ParticipatingTeamForTable,
        boolean
      >(RemoveParticipatingTeamConfirmationModalComponent, {
        width: '500px',
        height: '225px',
        data: team,
      })
      .afterClosed()
      .pipe(take(1))
      .toPromise();
    if (result) {
      await this.tournamentsService.removeTeamFromTournamentParticipants(
        team.tournamentId,
        team.referenceId
      );
    }
  }

  displayFn(option: TeamTypeAheadOption): string {
    return option && option.name ? option.name : '';
  }
}
