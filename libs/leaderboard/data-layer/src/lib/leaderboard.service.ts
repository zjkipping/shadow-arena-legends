import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  PlayersService,
  PlayerStatsForTourney,
} from '@shadow-arena-legends/players/data-layer';
import { TeamsService } from '@shadow-arena-legends/teams/data-layer';
import {
  TournamentsService,
  TourneyPointsConfig,
} from '@shadow-arena-legends/tournaments/data-layer';

import { TeamWithPoints } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor(
    private tournamentsService: TournamentsService,
    private teamsService: TeamsService,
    private playersService: PlayersService
  ) {}

  private getCompositeDataList(tournamentId: string) {
    return this.tournamentsService
      .getParticipatingTeamsInTournament(tournamentId)
      .pipe(
        map((pTeams) =>
          !pTeams.length
            ? of([])
            : combineLatest(
                pTeams.map((team) => {
                  return combineLatest([
                    this.teamsService.getTeamEntity(team.teamId),
                    this.teamsService.getTeamStatsForTourney(
                      team.teamId,
                      tournamentId
                    ),
                    this.teamsService.getTeamMembers(team.teamId).pipe(
                      switchMap((members) => {
                        return combineLatest(
                          members.map((member) => {
                            return this.playersService.getPlayerStatsForTourney(
                              member.playerId,
                              tournamentId
                            );
                          })
                        ).pipe(
                          map((playerStats) =>
                            playerStats.filter(
                              (player): player is PlayerStatsForTourney =>
                                !!player
                            )
                          )
                        );
                      })
                    ),
                  ]);
                })
              )
        )
      );
  }

  getTeamsWithPoints(
    tournamentId: string,
    pointsConfig: TourneyPointsConfig
  ): Observable<TeamWithPoints[]> {
    return this.getCompositeDataList(tournamentId).pipe(
      switchMap((dataList) =>
        dataList.pipe(
          map((teams) =>
            teams.map(([team, stats, members]) => {
              if (team && stats && members) {
                return {
                  name: team.name,
                  image: team.image,
                  points: calculateTotalTeamPoints(
                    pointsConfig,
                    stats.firstPlace,
                    stats.secondPlace,
                    stats.thirdPlace,
                    members.reduce((prev, curr) => prev + curr.kills, 0)
                  ),
                };
              } else {
                return null;
              }
            })
          )
        )
      ),
      map((teams) => teams.filter((team): team is TeamWithPoints => !!team)),
      map((teams) =>
        teams
          .sort((a, b) => {
            if (a.points === b.points) {
              if (a.name === b.name) {
                return 0;
              } else if (a.name > b.name) {
                return 1;
              } else {
                return -1;
              }
            } else if (a.points < b.points) {
              return 1;
            } else {
              return -1;
            }
          })
          .map((team, index) => ({ ...team, place: index + 1 }))
      )
    );
  }

  getTeamsWithStats(_tournamentId: string) {}
}

function calculateTotalTeamPoints(
  config: TourneyPointsConfig,
  firstPlace: number,
  secondPlace: number,
  thirdPlace: number,
  kills: number
) {
  return (
    config.pointsPerFirst * firstPlace +
    config.pointsPerSecond * secondPlace +
    config.pointsPerThird * thirdPlace +
    config.pointsPerKill * kills
  );
}
