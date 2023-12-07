import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  EntityStatusInfo,
  OryxEntityModel,
} from '../../../../../_models/data/oryx/oryx-model';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface OryxEntityLossDetailDialogData {
  entityModel: OryxEntityModel;
  detailKey: string;
}

@Component({
  selector: 'app-oryx-entity-loss-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './oryx-entity-loss-detail-dialog.component.html',
  styleUrl: './oryx-entity-loss-detail-dialog.component.scss',
})
export class OryxEntityLossDetailDialogComponent {
  public detail!: EntityStatusInfo;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OryxEntityLossDetailDialogData
  ) {
    this.detail = data.entityModel[
      data.detailKey as keyof OryxEntityModel
    ] as EntityStatusInfo;
  }
}
