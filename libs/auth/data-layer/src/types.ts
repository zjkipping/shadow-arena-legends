import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export enum UserRole {
  Admin = 'admin',
  Tallier = 'tallier',
  Player = 'player',
}

export interface UserDoc {
  role: UserRole;
}

export type UserEntity = UserDoc & FirebaseEntity;

export interface UsernamePasswordPayload {
  username: string;
  password: string;
}
