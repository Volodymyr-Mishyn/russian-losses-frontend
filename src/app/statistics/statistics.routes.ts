import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics.component';
import { AboutComponent } from './about/about.component';
import { ministryOfDefenseResolver } from './resolvers/ministry-of-defense.resolver';
import { provideState } from '@ngrx/store';
import { modStoreFeature } from './_store/features/mod.feature';
import { provideEffects } from '@ngrx/effects';
import { MoDEffects } from './_store/effects/mod.effects';

export const STATISTICS_ROUTES: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'ministry-of-defense',
        loadComponent: () =>
          import('./ministry-of-defense/ministry-of-defense.component').then(
            (m) => m.MinistryOfDefenseComponent
          ),
        providers: [provideState(modStoreFeature), provideEffects(MoDEffects)],
        resolve: {
          dataLoaded: ministryOfDefenseResolver,
        },
      },
      {
        path: 'oryx',
        loadChildren: () =>
          import('./oryx/oryx.routes').then((m) => m.ORYX_ROUTES),
      },
    ],
  },
];
