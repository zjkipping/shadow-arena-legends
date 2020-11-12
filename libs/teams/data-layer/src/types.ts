import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export enum TeamType {
  Solos = 'solos',
  Duos = 'duos',
  Trios = 'trios',
}

export interface TeamDoc {
  name: string;
  image: string;
  type: TeamType;
}

export type TeamEntity = TeamDoc & FirebaseEntity;

export interface TeamWithMembers extends TeamEntity {
  members: TeamMemberEntity[];
}

export interface TeamMember {
  playerId: string;
}

export type TeamMemberEntity = TeamMember & FirebaseEntity;

export interface TeamMemberWithName extends TeamMemberEntity {
  name: string;
}

export interface TeamForList extends TeamWithMembers {
  canDelete: boolean;
}

export interface StatsDoc {
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}

export interface TeamStatsForTourney extends StatsDoc {
  name: string;
  image: string;
  tourneyId: string;
  teamId: string;
}

export interface TeamWithMembersAndStats extends TeamWithMembers {
  stats: TeamStatsForTourney | null;
}
