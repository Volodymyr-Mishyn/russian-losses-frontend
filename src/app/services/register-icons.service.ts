import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RegisterIconsService {
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {}

  public registerIcons(
    icons: string[],
    iconNamePrefix = '',
    source = 'assets/img'
  ): void {
    icons.forEach((icon) => {
      this._matIconRegistry.addSvgIcon(
        iconNamePrefix + icon,
        this._domSanitizer.bypassSecurityTrustResourceUrl(
          `${source}/${icon}.svg`
        )
      );
    });
  }
}
