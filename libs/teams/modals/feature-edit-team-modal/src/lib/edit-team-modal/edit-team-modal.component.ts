import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, defer, merge, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { PlayersService } from '@shadow-arena-legends/players/data-layer';
import { SelectOption } from '@shadow-arena-legends/shared/util-types';
import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';
import { TeamEntity, TeamType } from '@shadow-arena-legends/teams/data-layer';

@Component({
  selector: 'shadow-arena-legends-edit-team-modal',
  templateUrl: './edit-team-modal.component.html',
  styleUrls: ['./edit-team-modal.component.scss'],
})
export class EditTeamModalComponent implements OnDestroy {
  @ViewChild(MatAutocompleteTrigger)
  autocomplete?: MatAutocompleteTrigger;
  teamForm: FormGroup;
  teamTypes: SelectOption[] = [
    { label: 'Solos', value: 'solos' },
    { label: 'Duos', value: 'duos' },
  ];
  playerOptions: Observable<TypeAheadOption[]>;
  membersTypeAhead: FormControl;
  membersFormArray: FormArray;

  destroy = new Subject();

  constructor(
    fb: FormBuilder,
    playersService: PlayersService,
    private dialogRef: MatDialogRef<EditTeamModalComponent>,
    @Inject(MAT_DIALOG_DATA) public team?: TeamEntity
  ) {
    this.teamForm = fb.group(
      {
        name: fb.control(team?.name || '', [Validators.required]),
        type: fb.control(team?.type || '', [Validators.required]),
        members: fb.array(team?.members.map((m) => fb.control(m)) || []),
      },
      {
        validators: [validateMembersLengthToTeamType],
      }
    );

    this.membersTypeAhead = fb.control('');
    this.membersFormArray = this.teamForm.get('members') as FormArray;

    this.playerOptions = combineLatest([
      playersService.getPlayersForMemberTypeAhead(),
      merge(
        defer(() => of(this.membersFormArray.value)) as Observable<
          TypeAheadOption[]
        >,
        this.membersFormArray.valueChanges as Observable<TypeAheadOption[]>
      ).pipe(map((arr) => arr.map((o) => o.referenceId))),
      merge(
        defer(() => of(this.membersTypeAhead.value as string)),
        this.membersTypeAhead.valueChanges as Observable<string>
      ),
    ]).pipe(
      map(([options, memberIds, typeAhead]) =>
        options.filter(
          (o) =>
            !memberIds.includes(o.referenceId) &&
            o.name.toLowerCase().startsWith(typeAhead.toLowerCase())
        )
      )
    );

    this.membersTypeAhead.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((typeAhead: string | TypeAheadOption) => {
        if (
          typeof typeAhead !== 'string' &&
          !!typeAhead.name &&
          !!typeAhead.referenceId
        ) {
          this.membersTypeAhead.setValue('');
          this.membersFormArray.push(fb.control(typeAhead));
          if (this.checkIfMembersUnderLimit()) {
            setTimeout(() => {
              if (this.autocomplete) {
                this.membersTypeAhead.markAsTouched();
                this.autocomplete.openPanel();
              }
            });
          } else {
            this.membersTypeAhead.disable();
          }
        }
      });

    this.teamForm
      .get('type')
      ?.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe((type: TeamType) => {
        if (this.checkIfMembersUnderLimit(type)) {
          this.membersTypeAhead.enable();
        } else {
          this.membersTypeAhead.disable();
        }
      });
  }

  private checkIfMembersUnderLimit(type?: TeamType) {
    if (!type) {
      type = this.teamForm.get('type')?.value;
    }
    return (
      this.membersFormArray.controls.length < (type === TeamType.Solos ? 1 : 2)
    );
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  displayFn(playerOption: TypeAheadOption): string {
    return playerOption && playerOption.name ? playerOption.name : '';
  }

  removeMember(index: number) {
    this.membersFormArray.removeAt(index);
    if (this.checkIfMembersUnderLimit()) {
      this.membersTypeAhead.enable();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.teamForm.value);
  }
}

function validateMembersLengthToTeamType(form: FormGroup) {
  const type = form.get('type')?.value;
  if (type) {
    const expectedLength = type === TeamType.Solos ? 1 : 2;
    const membersArr = form.get('members') as FormArray;
    return expectedLength === membersArr.length
      ? null
      : {
          membersLength: `Team must have ${expectedLength} member${
            expectedLength > 1 ? 's' : ''
          }`,
        };
  } else {
    return null;
  }
}
