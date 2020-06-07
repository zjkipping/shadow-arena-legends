import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PlayerEntity } from '@shadow-arena-legends/players/data-layer';

@Component({
  selector: 'shadow-arena-legends-edit-player-modal',
  templateUrl: './edit-player-modal.component.html',
  styleUrls: ['./edit-player-modal.component.scss'],
})
export class EditPlayerModalComponent {
  playerForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPlayerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public player?: PlayerEntity
  ) {
    this.playerForm = fb.group({
      name: fb.control(player?.name || '', Validators.required),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.playerForm.value);
  }
}
