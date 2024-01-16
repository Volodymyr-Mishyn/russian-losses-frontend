import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-google-analytics-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  templateUrl: './google-analytics-snackbar.component.html',
  styleUrl: './google-analytics-snackbar.component.scss',
})
export class GoogleAnalyticsSnackbarComponent {
  public question = $localize`:@@googleAnalyticsSnackbarQuestion:Hey, I am using Google Analytics to collect data about your visit to know which languages to translate the site into next. Therefore I need your consent for using cookies. Do you agree?`;
  public yes = $localize`:@@googleAnalyticsSnackbarYes:Accept`;
  public no = $localize`:@@googleAnalyticsSnackbarNo:Decline`;

  public optionSelected$ = new EventEmitter<boolean>();

  public snackBarRef = inject(MatSnackBarRef);

  public selectAnswer(answer: boolean): void {
    this.optionSelected$.emit(answer);
    this.snackBarRef.dismiss();
  }
}
