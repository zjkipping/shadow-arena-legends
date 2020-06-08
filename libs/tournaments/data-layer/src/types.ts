import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export interface TournamentDoc {
  name: string;
  startDateTime: string;
  endDateTime: string;
  live: boolean;
  pointsPerKill: number;
  pointsPerFirst: number;
  pointsPerSecond: number;
  pointsPerThird: number;
}

export type TournamentEntity = TournamentDoc & FirebaseEntity;

export interface ParticipatingTeam {
  referenceId: string;
}

export interface TournamentWithTeams extends TournamentDoc {
  participatingTeams: ParticipatingTeam[];
}

export type TournamentsWithParticipatingTeamsEntity = ParticipatingTeam &
  FirebaseEntity;
