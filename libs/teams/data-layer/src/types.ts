import {
  FirebaseEntity,
  TypeAheadOption,
} from '@shadow-arena-legends/shared/util-types';

export enum TeamType {
  Solos = 'solos',
  Duos = 'duos',
}

export interface TeamDoc {
  name: string;
  image: string;
  type: TeamType;
  members: TypeAheadOption[]; // todo convert this over to a collection...
}

export type TeamEntity = TeamDoc & FirebaseEntity;
