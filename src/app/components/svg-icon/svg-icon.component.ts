import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss',
})
export class SvgIconComponent {
  @Input()
  public icon!: string;

  @Input()
  public classes: string = '';

  public get isBrowser(): boolean {
    return this._platformService.isRunningOnBrowser();
  }

  constructor(private _platformService: PlatformService) {}
}
