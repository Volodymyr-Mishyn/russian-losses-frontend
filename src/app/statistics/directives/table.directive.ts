import { ContentChild, Directive, ElementRef, inject } from '@angular/core';
import { FileSaverService } from '../services/file-saver.service';

@Directive({
  selector: '[appTableDirective]',
  standalone: true,
})
export class TableDirective {
  private _exporter = inject(FileSaverService);

  @ContentChild('tableTitle', { read: ElementRef })
  public tableTitle!: ElementRef;

  public export(data: unknown) {
    const title =
      this.tableTitle?.nativeElement?.innerText ||
      `table ${new Date().toLocaleString()}`;
    this._exporter.exportDataAsJSON(data, title);
  }
}
