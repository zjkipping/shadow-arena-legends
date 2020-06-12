import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sal-stat-tally',
  templateUrl: './stat-tally.component.html',
  styleUrls: ['./stat-tally.component.scss'],
})
export class StatTallyComponent {
  @Input() label = '';
  @Input() value = 0;

  @Output() incremented = new EventEmitter<number>();
  @Output() decremented = new EventEmitter<number>();
}
