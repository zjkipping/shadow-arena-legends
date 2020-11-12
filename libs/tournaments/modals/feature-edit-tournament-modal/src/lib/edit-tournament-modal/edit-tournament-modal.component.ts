import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SelectOption } from '@shadow-arena-legends/shared/util-types';
import { TournamentForList } from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-edit-tournament-modal',
  templateUrl: './edit-tournament-modal.component.html',
  styleUrls: ['./edit-tournament-modal.component.scss'],
})
export class EditTournamentModalComponent {
  tournamentForm: FormGroup;

  tournamentTypes: SelectOption[] = [
    { label: 'Solos', value: 'solos' },
    { label: 'Duos', value: 'duos' },
    { label: 'Trios', value: 'trios' },
  ];

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTournamentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tournament?: TournamentForList
  ) {
    const now = new Date();
    const cleanToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      0,
      0
    );
    const cleanTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      0,
      0
    );
    cleanTomorrow.setDate(cleanTomorrow.getDate() + 1);

    this.tournamentForm = fb.group(
      {
        name: fb.control(tournament?.name || '', Validators.required),
        type: fb.control(
          {
            value: tournament?.type || '',
            disabled: !(!tournament || tournament.canEditType),
          },
          Validators.required
        ),
        live: fb.control(false),
        startDateTime: fb.control(
          tournament?.startDateTime
            ? new Date(tournament?.startDateTime)
            : cleanToday,
          Validators.required
        ),
        endDateTime: fb.control(
          tournament?.endDateTime
            ? new Date(tournament?.endDateTime)
            : cleanTomorrow,
          Validators.required
        ),
        pointsPerKill: fb.control(
          tournament?.pointsPerKill || '',
          Validators.required
        ),
        pointsPerFirst: fb.control(
          tournament?.pointsPerFirst || '',
          Validators.required
        ),
        pointsPerSecond: fb.control(
          tournament?.pointsPerSecond || '',
          Validators.required
        ),
        pointsPerThird: fb.control(
          tournament?.pointsPerThird || '',
          Validators.required
        ),
      },
      {
        validators: [endAfterStart],
      }
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    const formValue = this.tournamentForm.value;
    this.dialogRef.close({
      ...formValue,
      startDateTime: Number(formValue.startDateTime),
      endDateTime: Number(formValue.endDateTime),
    });
  }
}

function endAfterStart(form: FormGroup) {
  const startVal = form.get('startDateTime')?.value;
  const endVal = form.get('endDateTime')?.value;
  if (!startVal || !endVal) {
    return null;
  }
  const startDateTime = Number(startVal);
  const endDateTime = Number(endVal);
  return startDateTime < endDateTime
    ? null
    : {
        endAfterStart: 'The end datetime must be after the start datetime',
      };
}
