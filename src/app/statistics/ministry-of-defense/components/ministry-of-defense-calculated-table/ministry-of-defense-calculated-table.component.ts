import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  CalculatedData,
  CalculatedDataElement,
} from '../../../_models/data/mod/mod-model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EntityNamesEnum } from '../../../_models/data/mod/mod-entities';
import { getCategoryByEntityName } from '../../_helpers/mod-data-mapping';
const BASE_HEADER_COLUMNS = ['type', 'category', 'value'];

@Component({
  selector: 'app-ministry-of-defense-calculated-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './ministry-of-defense-calculated-table.component.html',
  styleUrl: './ministry-of-defense-calculated-table.component.scss',
})
export class MinistryOfDefenseCalculatedTableComponent {
  private _data: Array<CalculatedDataElement> = [];
  public dataSource = new MatTableDataSource<CalculatedDataElement>([]);

  public displayedColumns: string[] = [...BASE_HEADER_COLUMNS];
  @Input()
  public set calculatedData(calculated: CalculatedData) {
    this._data = Object.entries(calculated).map(([key, value]) => ({
      entityType: key as EntityNamesEnum,
      entityCategory: getCategoryByEntityName(key as EntityNamesEnum),
      value,
    }));
    this.dataSource = new MatTableDataSource<CalculatedDataElement>(this._data);
  }
}
