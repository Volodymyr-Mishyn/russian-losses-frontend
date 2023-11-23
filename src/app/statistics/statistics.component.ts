import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationElement } from './_models/navigation/navigation-element';
import { NavigationListComponent } from './components/navigation-list/navigation-list.component';

const NAVIGATION: Array<NavigationElement> = [
  {
    title: 'mod',
    tooltip: 'Ministry of defense',
    route: '/statistics/ministry-of-defense',
  },
  { title: 'oryx', tooltip: 'Oryx data', route: '/statistics/oryx' },
  { title: 'about', tooltip: 'About', route: '/statistics/about' },
];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    NavigationListComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  public navigationList = NAVIGATION;
}
