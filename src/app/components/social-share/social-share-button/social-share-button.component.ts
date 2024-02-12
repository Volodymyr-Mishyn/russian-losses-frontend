import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SocialShareDialogComponent } from '../social-share-dialog/social-share-dialog.component';

@Component({
  selector: 'app-social-share-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './social-share-button.component.html',
  styleUrl: './social-share-button.component.scss',
})
export class SocialShareButtonComponent {
  @Input() public url!: string;
  constructor(private _dialog: MatDialog) {}

  public openShareDialog() {
    this._dialog.open(SocialShareDialogComponent, {
      data: {
        url: this.url,
      },
    });
  }
}
