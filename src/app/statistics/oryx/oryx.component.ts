import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './oryx.component.html',
  styleUrl: './oryx.component.scss',
})
export class OryxComponent {}
