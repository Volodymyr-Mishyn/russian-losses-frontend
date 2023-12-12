import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOryxComparison } from '../../_store/selectors/oryx.selectors';
import { OryxCompareTypeComponent } from './components/oryx-compare-type/oryx-compare-type.component';
import { Observable } from 'rxjs';
import { OryxComparison } from '../../_models/data/oryx/oryx-comparison';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-oryx-compare',
  standalone: true,
  imports: [CommonModule, OryxCompareTypeComponent, MatDividerModule],
  templateUrl: './oryx-compare.component.html',
  styleUrl: './oryx-compare.component.scss',
})
export class OryxCompareComponent {
  public oryxTypesComparison$: Observable<OryxComparison> =
    this._store.select(selectOryxComparison);
  constructor(private _store: Store) {}
}
