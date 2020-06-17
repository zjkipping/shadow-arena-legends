import {
  Environment,
  EnvironmentType,
} from '@shadow-arena-legends/shared/util-types';

import { firebaseConfig } from './firebase';

export const environment: Environment = {
  type: EnvironmentType.Production,
  leaderboardDomain: 'https://sa-legends.com',
  firebaseConfig,
};
