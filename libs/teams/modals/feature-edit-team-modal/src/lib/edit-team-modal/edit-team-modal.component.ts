import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { last, map, takeUntil } from 'rxjs/operators';

import { PlayersService } from '@shadow-arena-legends/players/data-layer';
import { SelectOption } from '@shadow-arena-legends/shared/util-types';
import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';
import { TeamType } from '@shadow-arena-legends/teams/data-layer';
import {
  EditTeamModalData,
  EditTeamModalResult,
} from '@shadow-arena-legends/teams/modals/util-modal-types';

@Component({
  selector: 'shadow-arena-legends-edit-team-modal',
  templateUrl: './edit-team-modal.component.html',
  styleUrls: ['./edit-team-modal.component.scss'],
})
export class EditTeamModalComponent implements OnInit, OnDestroy {
  @ViewChild(MatAutocompleteTrigger)
  autocomplete?: MatAutocompleteTrigger;
  teamForm!: FormGroup;
  teamTypes: SelectOption[] = [
    { label: 'Solos', value: 'solos' },
    { label: 'Duos', value: 'duos' },
  ];
  playerOptions!: Observable<TypeAheadOption[]>;
  membersTypeAhead!: FormControl;
  membersFormArray!: FormArray;
  loading = true;

  destroy = new Subject();
  data?: EditTeamModalData;

  constructor(
    private fb: FormBuilder,
    private playersService: PlayersService,
    private dialogRef: MatDialogRef<EditTeamModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data$?: Observable<EditTeamModalData | undefined>
  ) {}

  async ngOnInit() {
    this.data = await this.data$?.pipe(last()).toPromise();
    this.loading = false;
    this.teamForm = this.fb.group(
      {
        name: this.fb.control(this.data?.team.name || '', [
          Validators.required,
        ]),
        type: this.fb.control(this.data?.team.type || '', [
          Validators.required,
        ]),
        members: this.fb.array(
          this.data?.members.map((m) =>
            this.fb.control({ name: m.name, referenceId: m.playerId })
          ) || []
        ),
      },
      {
        validators: [validateMembersLengthToTeamType],
      }
    );

    this.membersTypeAhead = this.fb.control('');
    this.membersFormArray = this.teamForm.get('members') as FormArray;
    if (!this.checkIfMembersUnderLimit()) {
      this.membersTypeAhead.disable();
    }

    this.playerOptions = combineLatest([
      this.playersService.getPlayersForMemberTypeAhead(),
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
      map(([options, memberIds, typeAhead]) => {
        let typeAheadFilter = '';
        if (typeof typeAhead === 'string') {
          typeAheadFilter = typeAhead.toLowerCase();
        }
        return options.filter(
          (o) =>
            !memberIds.includes(o.referenceId) &&
            o.name.toLowerCase().startsWith(typeAheadFilter)
        );
      })
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
          this.membersFormArray.push(this.fb.control(typeAhead));
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
    const formValue = this.teamForm.value;
    const membersToRemove = this.data?.members.filter(
      (m) => !formValue.members.find((mv: any) => mv.referenceId === m.playerId)
    );
    const membersToAdd = !this.data?.members
      ? formValue.members
      : formValue.members.filter(
          (m: any) =>
            // tslint:disable-next-line: no-non-null-assertion
            !this.data!.members.find((mv) => mv.playerId === m.referenceId)
        );
    const result: EditTeamModalResult = {
      team: {
        name: formValue.name,
        type: formValue.type,
        image: '',
      },
      membersToRemove,
      membersToAdd,
    };
    this.dialogRef.close(result);
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
