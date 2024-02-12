import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SocialShareComponent } from '../social-share.component';
import { MatButtonModule } from '@angular/material/button';
// TODO: Fix dialog on small screens
@Component({
  selector: 'app-social-share-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    SocialShareComponent,
  ],
  templateUrl: './social-share-dialog.component.html',
  styleUrl: './social-share-dialog.component.scss',
})
export class SocialShareDialogComponent {
  public url!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { url: string },
    private _dialogRef: MatDialogRef<SocialShareDialogComponent>
  ) {
    this.url = data.url;
  }

  public close() {
    this._dialogRef.close();
  }
}
