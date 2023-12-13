import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  CalculatedData,
  CalculatedDataElement,
} from '../../../../_models/data/mod/mod-model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MoDEntityNamesEnum } from '../../../../_models/data/mod/mod-entities';
import { getCategoryByEntityName } from '../../../_helpers/mod-data-mapping';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableDirective } from '../../../../directives/table.directive';
const BASE_HEADER_COLUMNS = ['type', 'category', 'value'];

@Component({
  selector: 'app-ministry-of-defense-calculated-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './ministry-of-defense-calculated-table.component.html',
  styleUrl: './ministry-of-defense-calculated-table.component.scss',
})
export class MinistryOfDefenseCalculatedTableComponent extends TableDirective {
  public data: Array<CalculatedDataElement> = [];
  public dataSource = new MatTableDataSource<CalculatedDataElement>([]);

  public displayedColumns: string[] = [...BASE_HEADER_COLUMNS];
  @Input()
  public set calculatedData(calculated: CalculatedData) {
    this.data = Object.entries(calculated).map(([key, value]) => ({
      entityType: key as MoDEntityNamesEnum,
      entityCategory: getCategoryByEntityName(key as MoDEntityNamesEnum),
      value,
    }));
    this.dataSource = new MatTableDataSource<CalculatedDataElement>(this.data);
  }
}
