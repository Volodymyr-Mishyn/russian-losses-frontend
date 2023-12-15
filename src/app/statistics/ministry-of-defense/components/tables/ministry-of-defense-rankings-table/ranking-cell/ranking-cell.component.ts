import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  MoDRankingsFormat,
  MoDRankingsPlace,
} from '../../../../../_models/data/mod/mod-model';

@Component({
  selector: 'app-ranking-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-cell.component.html',
  styleUrl: './ranking-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingCellComponent {
  private _placeRanking!: MoDRankingsPlace;
  private _rankingsFormat!: MoDRankingsFormat;

  @Input()
  public set placeRanking(placeRanking: MoDRankingsPlace) {
    this._placeRanking = placeRanking;
  }

  public get placeRanking() {
    return this._placeRanking;
  }

  @Input()
  public set rankingsFormat(rankingsFormat: MoDRankingsFormat) {
    this._rankingsFormat = rankingsFormat;
  }

  public get rankingsFormat() {
    return this._rankingsFormat;
  }
}
