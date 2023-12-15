import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FullMoDRankings } from '../../../../_models/data/mod/mod-model';
import { MinistryOfDefenseRankingsTableComponent } from '../ministry-of-defense-rankings-table/ministry-of-defense-rankings-table.component';

@Component({
  selector: 'app-ministry-of-defense-rankings-tables',
  standalone: true,
  imports: [CommonModule, MinistryOfDefenseRankingsTableComponent],
  templateUrl: './ministry-of-defense-rankings-tables.component.html',
  styleUrl: './ministry-of-defense-rankings-tables.component.scss',
})
export class MinistryOfDefenseRankingsTablesComponent {
  @Input()
  public rankings!: FullMoDRankings;
}
