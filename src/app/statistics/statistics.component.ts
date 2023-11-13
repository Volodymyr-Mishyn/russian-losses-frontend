import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {}
