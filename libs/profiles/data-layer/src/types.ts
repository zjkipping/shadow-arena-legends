import { FirebaseEntity } from '@shadow-arena-legends/shared/util-types';

export interface ProfileDoc {
  name: string;
  email: string;
}

export type ProfileEntity = ProfileDoc & FirebaseEntity;
