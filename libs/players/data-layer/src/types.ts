import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export interface PlayerDoc {
  name: string;
}

export type PlayerEntity = PlayerDoc & FirebaseEntity;
