import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ProfileDoc, ProfileEntity } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private firestore: AngularFirestore) {}

  getProfileOnce(uid: string) {
    return this.firestore.doc<ProfileDoc>(`profiles/${uid}`).get().toPromise();
  }

  getProfile(uid: string) {
    return this.firestore.doc<ProfileDoc>(`profiles/${uid}`).valueChanges();
  }

  getProfileEntities() {
    return this.firestore
      .collection<ProfileEntity>('profiles')
      .valueChanges({ idField: 'referenceId' });
  }

  setProfile(uid: string, profile: ProfileDoc) {
    return this.firestore.doc<ProfileDoc>(`profiles/${uid}`).set(profile);
  }

  updateProfile(profile: ProfileEntity) {
    return this.firestore
      .doc<ProfileDoc>(`profiles/${profile.referenceId}`)
      .update(profile);
  }
}
