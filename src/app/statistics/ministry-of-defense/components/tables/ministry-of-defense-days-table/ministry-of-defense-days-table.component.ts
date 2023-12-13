import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MoDDataFlat,
  MoDDayResultFlat,
} from '../../../../_models/data/mod/mod-model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ALL_MOD_ENTITIES,
  MoDEntityNamesEnum,
} from '../../../../_models/data/mod/mod-entities';
import { CasualtyCellComponent } from './casualty-cell/casualty-cell.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableDirective } from '../../../../directives/table.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

const BASE_HEADER_COLUMNS = ['date', 'dayOfInvasion'];
const BASE_PAGE_SIZE = 7;
@Component({
  selector: 'app-ministry-of-defense-days-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    CasualtyCellComponent,
  ],
  templateUrl: './ministry-of-defense-days-table.component.html',
  styleUrl: './ministry-of-defense-days-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinistryOfDefenseDaysTableComponent
  extends TableDirective
  implements OnInit, OnChanges, AfterViewInit
{
  public pageSize = BASE_PAGE_SIZE;
  public showIncrementComparisonToAverage = false;
  public currentDisplayedEntities: Array<MoDEntityNamesEnum> = [];
  public displayedColumns: Array<string> = [];
  @Input()
  public daysData: MoDDataFlat = [];

  public dataSource = new MatTableDataSource<MoDDayResultFlat>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.currentDisplayedEntities = ALL_MOD_ENTITIES;
    this.displayedColumns = [
      ...BASE_HEADER_COLUMNS,
      ...this.currentDisplayedEntities,
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('daysData' in changes && !changes['daysData'].firstChange) {
      this.dataSource.data = this.daysData;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.daysData;
  }
}
