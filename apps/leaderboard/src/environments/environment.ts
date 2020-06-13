import {
  Environment,
  EnvironmentType,
} from '@shadow-arena-legends/shared/util-types';

import { firebaseConfig } from './firebase';

export const environment: Environment = {
  type: EnvironmentType.Dev,
  firebaseConfig,
};
