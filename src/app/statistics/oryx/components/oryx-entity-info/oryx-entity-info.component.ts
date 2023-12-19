import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OryxEntityInfo } from '../../../_models/data/oryx/oryx-model';

@Component({
  selector: 'app-oryx-entity-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oryx-entity-info.component.html',
  styleUrl: './oryx-entity-info.component.scss',
})
export class OryxEntityInfoComponent {
  private _info!: OryxEntityInfo | null;
  @Input()
  public set info(info: OryxEntityInfo | undefined) {
    if (info) {
      this._info = info;
      console.log(this._info);
    } else {
      this._info = null;
    }
  }

  public get info(): OryxEntityInfo | null {
    return this._info;
  }
}
