import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export interface PlayerDoc {
  name: string;
}

export type PlayerEntity = PlayerDoc & FirebaseEntity;

export interface PlayerForList extends PlayerEntity {
  canDelete: boolean;
}

export interface PlayerStatsDoc {
  kills: number;
}

export interface PlayerStatsForTourney extends PlayerStatsDoc {
  name: string;
  playerId: string;
  tourneyId: string;
}
