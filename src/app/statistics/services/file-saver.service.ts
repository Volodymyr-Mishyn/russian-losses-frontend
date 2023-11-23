import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class FileSaverService {
  constructor() {}

  public exportDataAsJSON(
    data: unknown,
    fileName: string,
    appendDate = false
  ): void {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      let name = fileName;
      if (appendDate) {
        const date = new Date();
        name += `(${date.toLocaleString()})`;
      }
      FileSaver.saveAs(blob, name + '.json');
    } catch (e) {
      console.log(e);
    }
  }
}
