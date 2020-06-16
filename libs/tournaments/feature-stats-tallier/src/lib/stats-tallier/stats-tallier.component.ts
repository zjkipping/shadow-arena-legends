import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, merge, Observable, of, Subject } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import {
  PlayersService,
  PlayerStatsForTourney,
} from '@shadow-arena-legends/players/data-layer';
import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';
import { TeamsService } from '@shadow-arena-legends/teams/data-layer';
import {
  TournamentsService,
  TournamentWithParticipatingTeams,
} from '@shadow-arena-legends/tournaments/data-layer';

import { TeamStatsForList } from '../../types';
import { FocusedTeamsModalComponent } from '../focused-teams-modal/focused-teams-modal.component';

@Component({
  selector: 'sal-stats-tallier',
  templateUrl: './stats-tallier.component.html',
  styleUrls: ['./stats-tallier.component.scss'],
})
export class StatsTallierComponent {
  tournamentReferenceId: Observable<string>;
  isTourneyFinished: Observable<boolean>;
  isTourneyLive: Observable<boolean>;
  focusedTeams: Observable<string[] | null>;
  stats: Observable<TeamStatsForList[]>;

  teamsFilter = new FormControl('');
  playersFilters = new FormControl('');

  changeFocusedTeams = new Subject<string[] | null>();

  constructor(
    route: ActivatedRoute,
    router: Router,
    private playersService: PlayersService,
    private teamsService: TeamsService,
    private tournamentsService: TournamentsService,
    private dialog: MatDialog
  ) {
    this.tournamentReferenceId = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string)
    );
    const tournamentEntityWithParticipants = this.tournamentReferenceId.pipe(
      switchMap((id) =>
        this.tournamentsService.getTournamentWithParticipatingTeams(id)
      ),
      tap((tournament) => {
        if (!tournament) {
          router.navigate(['../../../'], { relativeTo: route });
        }
      }),
      filter(
        (tournament): tournament is TournamentWithParticipatingTeams =>
          !!tournament
      ),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.isTourneyLive = tournamentEntityWithParticipants.pipe(
      map((tourney) => tourney.live)
    );

    this.isTourneyFinished = tournamentEntityWithParticipants.pipe(
      map((tourney) => {
        const endDate = new Date(tourney.endDateTime);
        endDate.setDate(endDate.getDate() + 1);
        return Number(new Date()) >= Number(endDate);
      })
    );

    // TODO: This is extremely similar to the leaderboard service results
    //       Might be best to have a generic result from the service & transpose to the tallying data type
    const rawStats = tournamentEntityWithParticipants.pipe(
      switchMap((tourney) => {
        if (tourney.participatingTeams.length > 0) {
          return combineLatest(
            tourney.participatingTeams.map((team) => {
              return combineLatest([
                this.teamsService.getTeamEntity(team.teamId),
                this.teamsService.getTeamStatsForTourney(
                  team.teamId,
                  tourney.referenceId
                ),
                this.teamsService.getTeamMembers(team.teamId).pipe(
                  switchMap((members) => {
                    return combineLatest(
                      members.map((member) => {
                        return combineLatest([
                          this.playersService.getPlayerEntity(member.playerId),
                          this.playersService.getPlayerStatsForTourney(
                            member.playerId,
                            tourney.referenceId
                          ),
                        ]).pipe(
                          map(([player, stats]) => {
                            if (player && stats) {
                              return {
                                ...stats,
                                name: player.name,
                              };
                            } else {
                              return null;
                            }
                          })
                        );
                      })
                    ).pipe(
                      map((playerStats) =>
                        playerStats.filter(
                          (player): player is PlayerStatsForTourney => !!player
                        )
                      )
                    );
                  })
                ),
              ]).pipe(
                map(([teamEntity, stats, members]) => {
                  if (teamEntity && stats && members) {
                    return {
                      ...stats,
                      name: teamEntity.name,
                      image: teamEntity.image,
                      members,
                    };
                  } else {
                    return null;
                  }
                })
              );
            })
          ).pipe(
            map((teams) =>
              teams.filter((team): team is TeamStatsForList => !!team)
            ),
            map((teams) =>
              teams.sort((a, b) => {
                if (a.name === b.name) {
                  return 0;
                } else if (a.name > b.name) {
                  return 1;
                } else {
                  return -1;
                }
              })
            )
          );
        } else {
          return of([]);
        }
      })
    );

    this.focusedTeams = this.changeFocusedTeams.pipe(
      switchMap((currentTeams) =>
        this.tournamentReferenceId.pipe(
          switchMap((tourneyId) =>
            this.dialog
              .open(FocusedTeamsModalComponent, {
                width: '400px',
                height: '500px',
                data: {
                  currentlyFocusedTeams: currentTeams,
                  tourneyId,
                },
              })
              .afterClosed()
          )
        )
      ),
      filter((result) => !!result),
      startWith(null),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.stats = combineLatest([
      rawStats,
      merge<string>(of(''), this.teamsFilter.valueChanges),
      merge<string>(of(''), this.playersFilters.valueChanges),
      this.focusedTeams,
    ]).pipe(
      map(([statsList, teamFilter, playerFilter, focusedTeamsList]) => {
        const lowerTeamFilter = teamFilter.toLowerCase();
        const lowerPlayerFilter = playerFilter.toLowerCase();
        return statsList.filter(
          (teamStats) =>
            teamStats.name.toLowerCase().startsWith(lowerTeamFilter) &&
            teamStats.members.find((member) =>
              member.name.toLowerCase().startsWith(lowerPlayerFilter)
            ) &&
            (!focusedTeamsList || focusedTeamsList.includes(teamStats.teamId))
        );
      })
    );
  }

  async openFocusedTeamsModal() {
    const currentFocusedTeam = await this.focusedTeams
      .pipe(take(1))
      .toPromise();
    this.changeFocusedTeams.next(currentFocusedTeam);
  }
}
