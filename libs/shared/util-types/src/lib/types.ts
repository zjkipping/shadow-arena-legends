import { InjectionToken } from '@angular/core';

export enum EnvironmentType {
  Production = 'prod',
  Dev = 'dev',
  Local = 'local',
}

export interface Environment {
  type: EnvironmentType;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  };
}

export interface NavLink {
  label: string;
  route: string;
}

export interface FirebaseEntity {
  referenceId: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');