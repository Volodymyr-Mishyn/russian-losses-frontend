import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
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
} from '../../../_models/data/mod/mod-model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  ALL_MOD_ENTITIES,
  EntityNamesEnum,
} from '../../../_models/data/mod/mod-entities';

const BASE_HEADER_COLUMNS = ['date', 'dayOfInvasion'];

@Component({
  selector: 'app-ministry-of-defense-days-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './ministry-of-defense-days-table.component.html',
  styleUrl: './ministry-of-defense-days-table.component.scss',
})
export class MinistryOfDefenseDaysTableComponent
  implements OnInit, OnChanges, AfterViewInit
{
  public currentDisplayedEntities: Array<EntityNamesEnum> = [];
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
    this.dataSource = new MatTableDataSource<MoDDayResultFlat>(this.daysData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
