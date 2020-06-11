import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export enum TournamentType {
  Solos = 'solos',
  Duos = 'duos',
}

export interface TournamentDoc {
  name: string;
  type: TournamentType;
  startDateTime: number;
  endDateTime: number;
  live: boolean;
  pointsPerKill: number;
  pointsPerFirst: number;
  pointsPerSecond: number;
  pointsPerThird: number;
}

export type TournamentEntity = TournamentDoc & FirebaseEntity;

export interface ParticipatingTeam {
  teamId: string;
}

export type ParticipatingTeamEntity = ParticipatingTeam & FirebaseEntity;

export interface TournamentWithParticipatingTeams extends TournamentEntity {
  participatingTeams: ParticipatingTeamEntity[];
}

export interface ParticipatingTeamForTable {
  tournamentId: string;
  referenceId: string;
  name: string;
  teamId: string;
}
