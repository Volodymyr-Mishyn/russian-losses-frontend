import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MoDRankingsFormat,
  MoDRankings,
} from '../../../../_models/data/mod/mod-model';
import { MatTableModule } from '@angular/material/table';
import { RankingCellComponent } from './ranking-cell/ranking-cell.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableDirective } from '../../../../directives/table.directive';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';

@Component({
  selector: 'app-ministry-of-defense-rankings-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RankingCellComponent,
    TranslatePipe,
  ],
  templateUrl: './ministry-of-defense-rankings-table.component.html',
  styleUrl: './ministry-of-defense-rankings-table.component.scss',
})
export class MinistryOfDefenseRankingsTableComponent extends TableDirective {
  private _modRankings: Array<MoDRankings> = [];

  public displayTable = false;
  public displayedColumns: Array<string> = [];
  public placesColumns: Array<string> = [];
  public places: Array<number> = [];

  public placesEmojis: { [key: number]: string } = {
    0: '🥇',
    1: '🥈',
    2: '🥉',
  };

  @Input()
  public rankingsFormat!: MoDRankingsFormat;

  @Input()
  public set modRankings(modRankings: Array<MoDRankings>) {
    this._modRankings = modRankings;
    if (this._modRankings.length > 0) {
      this.places = this._modRankings[0].places.map(
        (placeObject) => placeObject.place
      );
      this.placesColumns = this.places.map((place) => `${place}-place`);
      this.displayedColumns = ['entityName', ...this.placesColumns];
    }
  }

  public get modRankings() {
    return this._modRankings;
  }
}
