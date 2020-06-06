import { Environment } from '@shadow-arena-legends/shared/util-types';

import { firebaseConfig } from './firebase';

export const environment: Environment = {
  production: false,
  firebaseConfig,
};
