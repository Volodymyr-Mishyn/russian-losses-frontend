import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = $localize`:@@pageTitle:Data and infographic about russian invasion of Ukraine`;
  constructor(private _titleService: Title) {
    this._titleService.setTitle(this.title);
  }
}
