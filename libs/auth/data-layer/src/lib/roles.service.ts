import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserRole } from '../types';

export interface RoleDoc {
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private firestore: AngularFirestore) {}

  setRole(uid: string, role: UserRole) {
    return this.firestore.doc<RoleDoc>(`roles/${uid}`).set({ role });
  }

  getRole(uid: string) {
    return this.firestore.doc<RoleDoc>(`roles/${uid}`).valueChanges();
  }
}
