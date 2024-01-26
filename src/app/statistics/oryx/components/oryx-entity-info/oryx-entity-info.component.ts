import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OryxEntityInfo } from '../../../_models/data/oryx/oryx-model';
import { UNUSABLE_RESOURCES } from '../../../../_constants/unusable-resources';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-oryx-entity-info',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './oryx-entity-info.component.html',
  styleUrl: './oryx-entity-info.component.scss',
})
export class OryxEntityInfoComponent {
  private _info!: OryxEntityInfo | null;
  public images: Array<string> | null = null;

  @Input()
  public set info(info: OryxEntityInfo | undefined) {
    if (info) {
      this._info = info;
      if (this._info.images) {
        this.images = this._info.images.filter(
          (image) =>
            !UNUSABLE_RESOURCES.some((unusable) => image.includes(unusable))
        );
      }
    } else {
      this._info = null;
    }
  }

  public get info(): OryxEntityInfo | null {
    return this._info;
  }
}
