import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

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

@Component({
  selector: 'sal-stats-tallier',
  templateUrl: './stats-tallier.component.html',
  styleUrls: ['./stats-tallier.component.scss'],
})
export class StatsTallierComponent {
  tournamentReferenceId: Observable<string>;
  isTourneyFinished: Observable<boolean>;
  isTourneyLive: Observable<boolean>;
  stats: Observable<TeamStatsForList[]>;

  constructor(
    route: ActivatedRoute,
    router: Router,
    private playersService: PlayersService,
    private teamsService: TeamsService,
    private tournamentsService: TournamentsService
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

    this.stats = tournamentEntityWithParticipants.pipe(
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
            )
          );
        } else {
          return of([]);
        }
      })
    );
  }
}
