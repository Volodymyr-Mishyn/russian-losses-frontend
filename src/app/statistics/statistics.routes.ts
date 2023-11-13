import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics.component';

export const STATISTICS_ROUTES: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      {
        path: 'ministry-of-defense',
        loadComponent: () =>
          import('./ministry-of-defense/ministry-of-defense.component').then(
            (m) => m.MinistryOfDefenseComponent
          ),
      },
      {
        path: 'oryx',
        loadChildren: () =>
          import('./oryx/oryx.routes').then((m) => m.ORYX_ROUTES),
      },
    ],
  },
];
