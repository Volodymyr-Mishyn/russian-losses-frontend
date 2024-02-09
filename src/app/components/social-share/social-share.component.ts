import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faTelegram,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SocialShareOption {
  name: string;
  icon: IconDefinition;
}
const SOCIAL_SHARE_OPTIONS = {
  facebook: {
    name: 'Facebook',
    icon: faFacebook,
  },
  twitter: {
    name: 'Twitter',
    icon: faTwitter,
  },
  linkedin: {
    name: 'Linkedin',
    icon: faLinkedin,
  },
  telegram: {
    name: 'Telegram',
    icon: faTelegram,
  },
};
@Component({
  selector: 'app-social-share',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
  ],
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.scss',
})
export class SocialShareComponent {
  public socialShareOptions: SocialShareOption[] =
    Object.values(SOCIAL_SHARE_OPTIONS);
  @Input() public url!: string;
  constructor(private _clipboard: Clipboard, private _snackBar: MatSnackBar) {}

  private _openShare(platform: string) {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(this.url);

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://telegram.me/share/url?url=${encodedUrl}`;
        break;
      default:
        console.error('Unsupported platform');
        return;
    }

    window.open(shareUrl, '_blank');
  }

  public share(option: SocialShareOption): void {
    this._openShare(option.name.toLowerCase());
  }

  public copy() {
    this._clipboard.copy(this.url);
    this._snackBar.open($localize`Link copied to clipboard`, undefined, {
      duration: 5000,
    });
  }
}
