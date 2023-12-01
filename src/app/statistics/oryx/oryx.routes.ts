import { Routes } from '@angular/router';
import { OryxComponent } from './oryx.component';
import { OryxCountryLossesComponent } from './oryx-country-losses/oryx-country-losses.component';
import { OryxSideNames } from '../_models/data/oryx/oryx.types';
import { OryxCompareComponent } from './oryx-compare/oryx-compare.component';

export const ORYX_ROUTES: Routes = [
  {
    path: '',
    component: OryxComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'country-losses/russia' },
      {
        path: 'country-losses/russia',
        component: OryxCountryLossesComponent,
        data: {
          country: OryxSideNames.RUSSIA,
          url: 'https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-equipment.html',
        },
      },
      {
        path: 'country-losses/Ukraine',
        component: OryxCountryLossesComponent,
        data: {
          country: OryxSideNames.UKRAINE,
          url: 'https://www.oryxspioenkop.com/2022/02/attack-on-europe-documenting-ukrainian.html',
        },
      },
      {
        path: 'compare-losses',
        component: OryxCompareComponent,
      },
    ],
  },
];
