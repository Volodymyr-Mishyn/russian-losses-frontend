import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  OryxEntityStatusInfo,
  OryxEntityModel,
} from '../../../../../_models/data/oryx/oryx-model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslatePipe } from '../../../../../../pipes/translate.pipe';
import { TranslationService } from '../../../../../../_translate/translation.service';
import { OryxTranslationService } from '../../../../services/oryx-translation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface OryxEntityLossDetailDialogData {
  entityModel: OryxEntityModel;
  detailKey: string;
}

export interface ImageLinkItem {
  link: string;
  type: 'image' | 'web';
}

@Component({
  selector: 'app-oryx-entity-loss-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
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
  public images: Array<ImageLinkItem> = [];
  public detail!: OryxEntityStatusInfo;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OryxEntityLossDetailDialogData,
    private _dialogRef: MatDialogRef<OryxEntityLossDetailDialogComponent>
  ) {
    this.detail = data.entityModel[
      data.detailKey as keyof OryxEntityModel
    ] as OryxEntityStatusInfo;
    this._setImages();
  }

  private _isImage(link: string): boolean {
    return link.endsWith('.png') || link.endsWith('.jpg');
  }

  private _setImages(): void {
    if (this.detail.list) {
      this.images = this.detail.list.map((image) => {
        return {
          link: image,
          type: this._isImage(image) ? 'image' : 'web',
        };
      });
    }
  }

  public closeDialog(): void {
    this._dialogRef.close();
  }
}
