import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  OryxEntityStatusInfo,
  OryxEntityModel,
} from '../../../../../_models/data/oryx/oryx-model';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '../../../../../../pipes/translate.pipe';
import { TranslationService } from '../../../../../../_translate/translation.service';
import { OryxTranslationService } from '../../../../services/oryx-translation.service';

export interface OryxEntityLossDetailDialogData {
  entityModel: OryxEntityModel;
  detailKey: string;
}

@Component({
  selector: 'app-oryx-entity-loss-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, TranslatePipe],
  providers: [
    {
      provide: TranslationService,
      useClass: OryxTranslationService,
    },
  ],
  templateUrl: './oryx-entity-loss-detail-dialog.component.html',
  styleUrl: './oryx-entity-loss-detail-dialog.component.scss',
})
export class OryxEntityLossDetailDialogComponent {
  public detail!: OryxEntityStatusInfo;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OryxEntityLossDetailDialogData
  ) {
    this.detail = data.entityModel[
      data.detailKey as keyof OryxEntityModel
    ] as OryxEntityStatusInfo;
  }
}
