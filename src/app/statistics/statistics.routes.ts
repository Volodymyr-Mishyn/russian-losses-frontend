import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics.component';
import { AboutComponent } from './about/about.component';
import { ministryOfDefenseResolver } from './resolvers/ministry-of-defense.resolver';
import { provideState } from '@ngrx/store';
import { modStoreFeature } from './_store/features/mod.feature';
import { provideEffects } from '@ngrx/effects';
import { MoDEffects } from './_store/effects/mod.effects';
import { oryxStoreFeature } from './_store/features/oryx.feature';
import { OryxEffects } from './_store/effects/oryx.effects';
import { oryxResolver } from './resolvers/oryx.resolver';

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
        providers: [
          provideState(oryxStoreFeature),
          provideEffects(OryxEffects),
        ],
        loadChildren: () =>
          import('./oryx/oryx.routes').then((m) => m.ORYX_ROUTES),
        resolve: {
          dataLoaded: oryxResolver,
        },
      },
    ],
  },
];
