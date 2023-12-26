import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATE_OF_INVASION_INSTANCE } from '../../_constants/russian-invasion-date';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _currentDate = new Date();

  public daysCount = 0;
  constructor() {
    const timeDifference =
      this._currentDate.getTime() - DATE_OF_INVASION_INSTANCE.getTime();
    this.daysCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  }
}
