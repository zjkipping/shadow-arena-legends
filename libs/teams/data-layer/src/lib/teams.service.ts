import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';
import { TournamentType } from '@shadow-arena-legends/tournaments/data-layer';

import { TeamDoc, TeamEntity } from '../types';

const teamsCollections = 'teams';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private firestore: AngularFirestore) {}

  getTeamEntity(referenceId: string): Observable<TeamEntity | null> {
    return this.firestore
      .doc<TeamDoc>(`${teamsCollections}/${referenceId}`)
      .valueChanges()
      .pipe(
        map((team) => {
          if (team) {
            return { ...team, referenceId };
          } else {
            return null;
          }
        })
      );
  }

  getTeamEntities(): Observable<TeamEntity[]> {
    return this.firestore
      .collection<TeamDoc>(teamsCollections)
      .valueChanges({ idField: 'referenceId' });
  }

  getTeamsForTypeAhead(
    tournamentType: TournamentType
  ): Observable<TypeAheadOption[]> {
    return this.firestore
      .collection<TeamDoc>(teamsCollections, (ref) =>
        ref.where('type', '==', tournamentType)
      )
      .valueChanges({ idField: 'referenceId' })
      .pipe(
        map((teams) =>
          teams.map((team) => ({
            name: team.name,
            referenceId: team.referenceId,
          }))
        )
      );
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
