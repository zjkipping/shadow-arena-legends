import { firebaseConfig } from './firebase';

export interface Environment {
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  };
}

export const environment: Environment = {
  production: false,
  firebaseConfig,
};
