import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { TeamDoc, TeamEntity } from '../types';

const teamsCollections = 'teams';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private firestore: AngularFirestore) {}

  getTeamEntities(): Observable<TeamEntity[]> {
    return this.firestore
      .collection<TeamDoc>(teamsCollections)
      .valueChanges({ idField: 'referenceId' });
  }

  addNewTeam(player: TeamDoc) {
    return this.firestore.collection<TeamDoc>(teamsCollections).add(player);
  }

  updateTeam(referenceId: string, player: TeamDoc) {
    this.firestore
      .doc<TeamDoc>(`${teamsCollections}/${referenceId}`)
      .update(player);
  }

  deleteTeam(referenceId: string) {
    this.firestore.doc<TeamDoc>(`${teamsCollections}/${referenceId}`).delete();
  }
}
