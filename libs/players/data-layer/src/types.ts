import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export interface PlayerEntity extends FirebaseEntity {
  name: string;
}

export type PlayerDoc = Exclude<PlayerEntity, keyof FirebaseEntity>;
