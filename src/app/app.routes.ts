import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/statistics', pathMatch: 'full' },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./statistics/statistics.routes').then((m) => m.STATISTICS_ROUTES),
  },
  {
    path: '**',
    redirectTo: '/statistics',
  },
];
