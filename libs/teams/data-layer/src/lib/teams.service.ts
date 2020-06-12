import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';
import { TournamentType } from '@shadow-arena-legends/tournaments/data-layer';

import {
  StatsDoc,
  TeamDoc,
  TeamEntity,
  TeamForList,
  TeamMember,
  TeamMemberEntity,
  TeamStatsForTourney,
  TeamWithMembers,
  TeamWithMembersAndStats,
} from '../types';

const teamsCollection = 'teams';
const membersCollection = 'members';
const statsCollection = 'stats';
const tourneyRefsCollection = 'tourneyRefs';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private firestore: AngularFirestore) {}

  getTeamEntity(referenceId: string): Observable<TeamEntity | null> {
    return this.firestore
      .doc<TeamDoc>(`${teamsCollection}/${referenceId}`)
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
      .collection<TeamDoc>(teamsCollection)
      .valueChanges({ idField: 'referenceId' });
  }

  getTeamsForList(): Observable<TeamForList[]> {
    return this.getTeamsWithMembers().pipe(
      switchMap((teams) =>
        !teams.length
          ? of([])
          : combineLatest(
              teams.map((team) =>
                this.getTournamentRefs(team.referenceId).pipe(
                  map((refs) => ({ ...team, canDelete: refs.length === 0 }))
                )
              )
            )
      )
    );
  }

  getTournamentRefs(referenceId: string): Observable<string[]> {
    return this.firestore
      .collection(`${teamsCollection}/${referenceId}/${tourneyRefsCollection}`)
      .valueChanges({ idField: 'ref' })
      .pipe(map((tourneyRefs) => tourneyRefs.map((tr) => tr.ref)));
  }

  initializeStatsForTourney(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .set({
        firstPlace: 0,
        secondPlace: 0,
        thirdPlace: 0,
      });
  }

  removeStatsForTourney(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .delete();
  }

  incrementFirstPlaceStat(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .update({
        firstPlace: firebase.firestore.FieldValue.increment(1),
      });
  }

  incrementSecondPlaceStat(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .update({
        secondPlace: firebase.firestore.FieldValue.increment(1),
      });
  }

  incrementThirdPlaceStat(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .update({
        thirdPlace: firebase.firestore.FieldValue.increment(1),
      });
  }

  decrementFirstPlaceStat(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .update({
        firstPlace: firebase.firestore.FieldValue.increment(-1),
      });
  }

  decrementSecondPlaceStat(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .update({
        secondPlace: firebase.firestore.FieldValue.increment(-1),
      });
  }

  decrementThirdPlaceStat(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(`${teamsCollection}/${teamId}/${statsCollection}/${tournamentId}`)
      .update({
        thirdPlace: firebase.firestore.FieldValue.increment(-1),
      });
  }

  getTeamMembers(teamId: string): Observable<TeamMemberEntity[]> {
    return this.firestore
      .collection<TeamMember>(
        `${teamsCollection}/${teamId}/${membersCollection}`
      )
      .valueChanges({ idField: 'referenceId' });
  }

  getTeamStatsForTourney(
    teamId: string,
    tourneyId: string
  ): Observable<TeamStatsForTourney | null> {
    return this.getTeamEntity(teamId).pipe(
      switchMap((team) => {
        if (!!team) {
          return this.firestore
            .doc<StatsDoc>(
              `${teamsCollection}/${teamId}/${statsCollection}/${tourneyId}`
            )
            .valueChanges()
            .pipe(
              map((stats) => {
                return {
                  name: team.name,
                  image: team.image,
                  teamId,
                  tourneyId,
                  firstPlace: stats?.firstPlace || 0,
                  secondPlace: stats?.secondPlace || 0,
                  thirdPlace: stats?.thirdPlace || 0,
                };
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }

  getTeamWithMembersAndStats(
    teamId: string,
    tourneyId: string
  ): Observable<TeamWithMembersAndStats | null> {
    return this.getTeamEntity(teamId).pipe(
      switchMap((team) => {
        if (!!team) {
          return combineLatest([
            this.getTeamMembers(team.referenceId),
            this.getTeamStatsForTourney(teamId, tourneyId),
          ]).pipe(
            map(([members, stats]) => ({
              ...team,
              members,
              stats,
            }))
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getTeamsWithMembers(): Observable<TeamWithMembers[]> {
    return this.getTeamEntities().pipe(
      switchMap((teams) =>
        !teams.length
          ? of([])
          : combineLatest(
              teams.map((team) =>
                this.getTeamMembers(team.referenceId).pipe(
                  map((members) => ({ ...team, members }))
                )
              )
            )
      )
    );
  }

  getTeamsForTypeAhead(
    tournamentType: TournamentType
  ): Observable<TypeAheadOption[]> {
    return this.firestore
      .collection<TeamDoc>(teamsCollection, (ref) =>
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

  addTournamentReference(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(
        `${teamsCollection}/${teamId}/${tourneyRefsCollection}/${tournamentId}`
      )
      .set({});
  }

  removeTournamentReference(teamId: string, tournamentId: string) {
    return this.firestore
      .doc(
        `${teamsCollection}/${teamId}/${tourneyRefsCollection}/${tournamentId}`
      )
      .delete();
  }

  addNewTeam(player: TeamDoc) {
    return this.firestore.collection<TeamDoc>(teamsCollection).add(player);
  }

  updateTeam(referenceId: string, player: TeamDoc) {
    this.firestore
      .doc<TeamDoc>(`${teamsCollection}/${referenceId}`)
      .update(player);
  }

  deleteTeam(referenceId: string) {
    this.firestore.doc<TeamDoc>(`${teamsCollection}/${referenceId}`).delete();
  }

  addMember(referenceId: string, playerId: string) {
    this.firestore
      .collection(`${teamsCollection}/${referenceId}/${membersCollection}`)
      .add({ playerId });
  }

  removeMember(referenceId: string, memberId: string) {
    this.firestore
      .doc(`${teamsCollection}/${referenceId}/${membersCollection}/${memberId}`)
      .delete();
  }
}
