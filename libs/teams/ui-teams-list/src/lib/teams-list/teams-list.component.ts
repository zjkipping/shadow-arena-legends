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
import { TeamEntity } from '@shadow-arena-legends/teams/data-layer';

@Component({
  selector: 'sal-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnDestroy {
  @Input() set teams(value: TeamEntity[] | null) {
    this._teams = value || [];
    this.filterSortData();
  }

  @Output() editClicked = new EventEmitter<TeamEntity>();
  @Output() deleteClicked = new EventEmitter<TeamEntity>();

  filterControl = new FormControl('');
  destroy = new Subject();

  sortableColumns: TableColumn[] = [
    {
      label: 'Name',
      property: 'name',
    },
    {
      label: 'Type',
      property: 'type',
    },
  ];
  selectedRow: any;
  selectedColumn: TableColumn | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';
  filter = '';

  private _teams: TeamEntity[] = [];
  rows: TeamEntity[] = [];

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
