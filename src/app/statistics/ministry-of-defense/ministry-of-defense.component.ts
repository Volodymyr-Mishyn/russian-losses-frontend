import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSelectionComponent } from '../components/range-selection/range-selection.component';

@Component({
  standalone: true,
  imports: [CommonModule, RangeSelectionComponent],
  templateUrl: './ministry-of-defense.component.html',
  styleUrl: './ministry-of-defense.component.scss',
})
export class MinistryOfDefenseComponent {
  public setRange(range: { start: Date; end: Date } | null) {
    console.log(range);
  }
}
