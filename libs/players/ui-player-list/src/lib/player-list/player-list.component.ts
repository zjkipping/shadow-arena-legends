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

import { PlayerForList } from '@shadow-arena-legends/players/data-layer';
import { TableColumn } from '@shadow-arena-legends/shared/util-types';

// this could be rewritten to be more reactive, but wait until after MVP
// Could also be more re-usable. Since i'm going to copy this setup to anywhere I need a table...
@Component({
  selector: 'sal-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnDestroy {
  @Input() set players(value: PlayerForList[] | null) {
    this._players = value || [];
    this.filterSortData();
  }

  @Output() editClicked = new EventEmitter<PlayerForList>();
  @Output() deleteClicked = new EventEmitter<PlayerForList>();

  filterControl = new FormControl('');
  destroy = new Subject();

  sortableColumns: TableColumn[] = [
    {
      label: 'Name',
      property: 'name',
    },
  ];
  selectedRow: any;
  selectedColumn: TableColumn | null = this.sortableColumns[0];
  sortDirection: 'asc' | 'desc' | '' = 'desc';
  filter = '';

  private _players: PlayerForList[] = [];
  rows: PlayerForList[] = [];

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
    let newRows = [...this._players];

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
