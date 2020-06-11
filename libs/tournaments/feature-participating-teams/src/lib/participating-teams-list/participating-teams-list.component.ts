import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TableColumn } from '@shadow-arena-legends/shared/util-types';
import { ParticipatingTeamForTable } from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-participating-teams-list',
  templateUrl: './participating-teams-list.component.html',
  styleUrls: ['./participating-teams-list.component.scss'],
})
export class ParticipatingTeamsListComponent implements OnDestroy {
  @Input() set teams(value: ParticipatingTeamForTable[] | null) {
    this._teams = value || [];
    this.filterSortData();
  }

  @Input() isTourneyFinished = true;

  @Output() deleteClicked = new EventEmitter<ParticipatingTeamForTable>();

  filterControl = new FormControl('');
  destroy = new Subject();

  sortableColumns: TableColumn[] = [
    {
      label: 'Name',
      property: 'name',
    },
  ];
  selectedRow: any;
  selectedColumn: TableColumn | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';
  filter = '';

  private _teams: ParticipatingTeamForTable[] = [];
  rows: ParticipatingTeamForTable[] = [];

  constructor() {
    this.filterControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        this.filter = value;
        this.filterSortData();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  headerClicked(column: TableColumn) {
    if (column === this.selectedColumn) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = '';
        this.selectedColumn = null;
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.selectedColumn = column;
      this.sortDirection = 'desc';
    }
    this.filterSortData();
  }

  filterSortData() {
    let newRows = [...this._teams];

    if (!!this.filter) {
      newRows = newRows.filter((r) =>
        r.name.toLowerCase().startsWith(this.filter.toLowerCase())
      );
    }

    if (this.selectedColumn && this.sortDirection) {
      newRows = newRows.sort((a, b) => {
        const aValue = (a as any)[
          this.selectedColumn?.property || ''
        ].toLowerCase();
        const bValue = (b as any)[
          this.selectedColumn?.property || ''
        ].toLowerCase();

        if (aValue === bValue) {
          return 0;
        } else if (aValue < bValue) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
      });
    }

    this.rows = newRows;
  }
}
