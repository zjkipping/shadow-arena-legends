import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export enum TeamType {
  Solos = 'solos',
  Duos = 'duos',
}

export interface TeamMember {
  referenceId: string;
  name: string;
}

export interface TeamDoc {
  name: string;
  image: string;
  type: TeamType;
  members: TeamMember[];
}

export type TeamEntity = TeamDoc & FirebaseEntity;
