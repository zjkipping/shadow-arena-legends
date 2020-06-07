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

export interface NavLink {
  label: string;
  route: string;
}

export interface FirebaseEntity {
  referenceId: string;
}
