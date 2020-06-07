import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { PlayerDoc, PlayerEntity } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private firestore: AngularFirestore) {}

  getPlayerEntities(): Observable<PlayerEntity[]> {
    return this.firestore
      .collection<PlayerDoc>('players')
      .valueChanges({ idField: 'referenceId' });
  }

  addNewPlayer(player: PlayerDoc) {
    return this.firestore.collection<PlayerDoc>('players').add(player);
  }

  updatePlayer(referenceId: string, player: PlayerDoc) {
    this.firestore
      .collection<PlayerDoc>('players')
      .doc(referenceId)
      .update(player);
  }

  deletePlayer(referenceId: string) {
    this.firestore.collection<PlayerDoc>('players').doc(referenceId).delete();
  }
}
