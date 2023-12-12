import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OryxEntitiesComparison } from '../../../../_models/data/oryx/oryx-comparison';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-oryx-compare-type-entities',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './oryx-compare-type-entities.component.html',
  styleUrl: './oryx-compare-type-entities.component.scss',
})
export class OryxCompareTypeEntitiesComponent {
  private _entitiesComparison!: OryxEntitiesComparison;

  public tableData: Array<Record<string, number | string>> = [];
  public displayedColumns: string[] = ['name'];

  @Input()
  public set entitiesComparison(entitiesComparison: OryxEntitiesComparison) {
    this._entitiesComparison = entitiesComparison;
    this._setTableData();
  }

  public get entitiesComparison() {
    return this._entitiesComparison;
  }

  public _setTableData(): void {
    this.displayedColumns = ['name', ...this.entitiesComparison.names];
    this.tableData = this.entitiesComparison.countComparison.map(
      (singleSideData) => ({
        name: singleSideData.name,
        ...singleSideData.values.reduce(
          (acc, entityData) => ({
            ...acc,
            [entityData.name]: entityData.value,
          }),
          {}
        ),
      })
    );
  }
}
