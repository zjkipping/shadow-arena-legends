import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { TeamsListComponent } from './teams-list/teams-list.component';

@NgModule({
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  declarations: [TeamsListComponent],
  exports: [TeamsListComponent],
})
export class TeamsUiTeamsListModule {}
