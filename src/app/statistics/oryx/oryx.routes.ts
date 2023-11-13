import { Routes } from '@angular/router';
import { OryxComponent } from './oryx.component';
import { RussianLossesComponent } from './russian-losses/russian-losses.component';

export const ORYX_ROUTES: Routes = [
  {
    path: '',
    component: OryxComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'russian-losses' },
      { path: 'russian-losses', component: RussianLossesComponent },
    ],
  },
];
