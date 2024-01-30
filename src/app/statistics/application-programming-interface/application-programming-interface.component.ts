import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PlatformService } from '../../services/platform.service';
import { SeoService } from '../../services/seo.service';
const MOD_DATA = [
  {
    _id: '65674bf0d8d545dcf72e4bfa',
    date: '2022-03-26T00:00:00.000Z',
    dayOfInvasion: 30,
    casualties: [
      {
        name: 'Tanks',
        code: 'tank',
        total: 575,
        increment: 14,
        _id: '6581bb8779f7412ca145a865',
      },
      {
        name: 'Armored fighting vehicle',
        code: 'armored_fighting_vehicle',
        total: 1640,
        increment: 15,
        _id: '6581bb8779f7412ca145a866',
      },
      {
        name: 'Planes',
        code: 'plane',
        total: 117,
        increment: 2,
        _id: '6581bb8779f7412ca145a867',
      },
      {
        name: 'Helicopters',
        code: 'helicopter',
        total: 127,
        increment: 2,
        _id: '6581bb8779f7412ca145a868',
      },
      {
        name: 'Artillery systems',
        code: 'artillery_system',
        total: 293,
        increment: 2,
        _id: '6581bb8779f7412ca145a869',
      },
      {
        name: 'Cars and cisterns',
        code: 'car_cistern',
        total: 1204,
        increment: 43,
        _id: '6581bb8779f7412ca145a86a',
      },
      {
        name: 'MLRS',
        code: 'mlrs',
        total: 93,
        increment: 3,
        _id: '6581bb8779f7412ca145a86b',
      },
      {
        name: 'Anti-aircraft warfare',
        code: 'anti_aircraft',
        total: 51,
        increment: 2,
        _id: '6581bb8779f7412ca145a86c',
      },
      {
        name: 'UAV',
        code: 'uav',
        total: 53,
        increment: 0,
        _id: '6581bb8779f7412ca145a86d',
      },
      {
        name: 'Ships (boats)',
        code: 'ship',
        total: 7,
        increment: 2,
        _id: '6581bb8779f7412ca145a86e',
      },
      {
        name: 'Special equipment',
        code: 'special_equipment',
        total: 19,
        increment: 1,
        _id: '6581bb8779f7412ca145a86f',
      },
      {
        name: 'Military personnel',
        code: 'personnel',
        total: 16400,
        increment: 300,
        _id: '6581bb8779f7412ca145a870',
      },
      {
        name: 'Cruise missiles',
        code: 'cruise_missile',
        total: 0,
        increment: 0,
        _id: '6581bb8779f7412ca145a871',
      },
      {
        name: 'Submarines',
        code: 'submarine',
        total: 0,
        increment: 0,
        _id: '6581bb8779f7412ca145a872',
      },
    ],
    createdAt: '2023-11-29T14:34:24.792Z',
  },
  {
    _id: '65674bf0d8d545dcf72e4c0b',
    date: '2022-03-25T00:00:00.000Z',
    dayOfInvasion: 29,
    casualties: [
      {
        name: 'Tanks',
        code: 'tank',
        total: 561,
        increment: 31,
        _id: '6581bb8779f7412ca145a883',
      },
      {
        name: 'Armored fighting vehicle',
        code: 'armored_fighting_vehicle',
        total: 1625,
        increment: 28,
        _id: '6581bb8779f7412ca145a884',
      },
      {
        name: 'Planes',
        code: 'plane',
        total: 115,
        increment: 7,
        _id: '6581bb8779f7412ca145a885',
      },
      {
        name: 'Helicopters',
        code: 'helicopter',
        total: 125,
        increment: 1,
        _id: '6581bb8779f7412ca145a886',
      },
      {
        name: 'Artillery systems',
        code: 'artillery_system',
        total: 291,
        increment: 11,
        _id: '6581bb8779f7412ca145a887',
      },
      {
        name: 'Cars and cisterns',
        code: 'car_cistern',
        total: 1161,
        increment: 56,
        _id: '6581bb8779f7412ca145a888',
      },
      {
        name: 'MLRS',
        code: 'mlrs',
        total: 90,
        increment: 8,
        _id: '6581bb8779f7412ca145a889',
      },
      {
        name: 'Anti-aircraft warfare',
        code: 'anti_aircraft',
        total: 49,
        increment: 2,
        _id: '6581bb8779f7412ca145a88a',
      },
      {
        name: 'UAV',
        code: 'uav',
        total: 53,
        increment: 3,
        _id: '6581bb8779f7412ca145a88b',
      },
      {
        name: 'Ships (boats)',
        code: 'ship',
        total: 5,
        increment: 1,
        _id: '6581bb8779f7412ca145a88c',
      },
      {
        name: 'Special equipment',
        code: 'special_equipment',
        total: 18,
        increment: 2,
        _id: '6581bb8779f7412ca145a88d',
      },
      {
        name: 'Military personnel',
        code: 'personnel',
        total: 16100,
        increment: 300,
        _id: '6581bb8779f7412ca145a88e',
      },
      {
        name: 'Cruise missiles',
        code: 'cruise_missile',
        total: 0,
        increment: 0,
        _id: '6581bb8779f7412ca145a88f',
      },
      {
        name: 'Submarines',
        code: 'submarine',
        total: 0,
        increment: 0,
        _id: '6581bb8779f7412ca145a890',
      },
    ],
    createdAt: '2023-11-29T14:34:24.793Z',
  },
  {
    _id: '65674bf0d8d545dcf72e4c1c',
    date: '2022-03-24T00:00:00.000Z',
    dayOfInvasion: 28,
    casualties: [
      {
        name: 'Tanks',
        code: 'tank',
        total: 530,
        increment: 13,
        _id: '6581bb8779f7412ca145a8a1',
      },
      {
        name: 'Armored fighting vehicle',
        code: 'armored_fighting_vehicle',
        total: 1597,
        increment: 19,
        _id: '6581bb8779f7412ca145a8a2',
      },
      {
        name: 'Planes',
        code: 'plane',
        total: 108,
        increment: 7,
        _id: '6581bb8779f7412ca145a8a3',
      },
      {
        name: 'Helicopters',
        code: 'helicopter',
        total: 124,
        increment: 0,
        _id: '6581bb8779f7412ca145a8a4',
      },
      {
        name: 'Artillery systems',
        code: 'artillery_system',
        total: 280,
        increment: 13,
        _id: '6581bb8779f7412ca145a8a5',
      },
      {
        name: 'Cars and cisterns',
        code: 'car_cistern',
        total: 1105,
        increment: 27,
        _id: '6581bb8779f7412ca145a8a6',
      },
      {
        name: 'MLRS',
        code: 'mlrs',
        total: 82,
        increment: 2,
        _id: '6581bb8779f7412ca145a8a7',
      },
      {
        name: 'Anti-aircraft warfare',
        code: 'anti_aircraft',
        total: 47,
        increment: 0,
        _id: '6581bb8779f7412ca145a8a8',
      },
      {
        name: 'UAV',
        code: 'uav',
        total: 50,
        increment: 8,
        _id: '6581bb8779f7412ca145a8a9',
      },
      {
        name: 'Ships (boats)',
        code: 'ship',
        total: 4,
        increment: 0,
        _id: '6581bb8779f7412ca145a8aa',
      },
      {
        name: 'Special equipment',
        code: 'special_equipment',
        total: 16,
        increment: 1,
        _id: '6581bb8779f7412ca145a8ab',
      },
      {
        name: 'Military personnel',
        code: 'personnel',
        total: 15800,
        increment: 200,
        _id: '6581bb8779f7412ca145a8ac',
      },
      {
        name: 'Cruise missiles',
        code: 'cruise_missile',
        total: 0,
        increment: 0,
        _id: '6581bb8779f7412ca145a8ad',
      },
      {
        name: 'Submarines',
        code: 'submarine',
        total: 0,
        increment: 0,
        _id: '6581bb8779f7412ca145a8ae',
      },
    ],
    createdAt: '2023-11-29T14:34:24.795Z',
  },
];
const MOD_DATA_FLAT = [
  {
    date: '2022-03-26T00:00:00.000Z',
    dayOfInvasion: 30,
    data: {
      tank: { name: 'Tanks', total: 575, increment: 14 },
      armored_fighting_vehicle: {
        name: 'Armored fighting vehicle',
        total: 1640,
        increment: 15,
      },
      plane: { name: 'Planes', total: 117, increment: 2 },
      helicopter: { name: 'Helicopters', total: 127, increment: 2 },
      artillery_system: { name: 'Artillery systems', total: 293, increment: 2 },
      car_cistern: { name: 'Cars and cisterns', total: 1204, increment: 43 },
      mlrs: { name: 'MLRS', total: 93, increment: 3 },
      anti_aircraft: { name: 'Anti-aircraft warfare', total: 51, increment: 2 },
      uav: { name: 'UAV', total: 53, increment: 0 },
      ship: { name: 'Ships (boats)', total: 7, increment: 2 },
      special_equipment: { name: 'Special equipment', total: 19, increment: 1 },
      personnel: { name: 'Military personnel', total: 16400, increment: 300 },
      cruise_missile: { name: 'Cruise missiles', total: 0, increment: 0 },
      submarine: { name: 'Submarines', total: 0, increment: 0 },
    },
  },
  {
    date: '2022-03-25T00:00:00.000Z',
    dayOfInvasion: 29,
    data: {
      tank: { name: 'Tanks', total: 561, increment: 31 },
      armored_fighting_vehicle: {
        name: 'Armored fighting vehicle',
        total: 1625,
        increment: 28,
      },
      plane: { name: 'Planes', total: 115, increment: 7 },
      helicopter: { name: 'Helicopters', total: 125, increment: 1 },
      artillery_system: {
        name: 'Artillery systems',
        total: 291,
        increment: 11,
      },
      car_cistern: { name: 'Cars and cisterns', total: 1161, increment: 56 },
      mlrs: { name: 'MLRS', total: 90, increment: 8 },
      anti_aircraft: { name: 'Anti-aircraft warfare', total: 49, increment: 2 },
      uav: { name: 'UAV', total: 53, increment: 3 },
      ship: { name: 'Ships (boats)', total: 5, increment: 1 },
      special_equipment: { name: 'Special equipment', total: 18, increment: 2 },
      personnel: { name: 'Military personnel', total: 16100, increment: 300 },
      cruise_missile: { name: 'Cruise missiles', total: 0, increment: 0 },
      submarine: { name: 'Submarines', total: 0, increment: 0 },
    },
  },
  {
    date: '2022-03-24T00:00:00.000Z',
    dayOfInvasion: 28,
    data: {
      tank: { name: 'Tanks', total: 530, increment: 13 },
      armored_fighting_vehicle: {
        name: 'Armored fighting vehicle',
        total: 1597,
        increment: 19,
      },
      plane: { name: 'Planes', total: 108, increment: 7 },
      helicopter: { name: 'Helicopters', total: 124, increment: 0 },
      artillery_system: {
        name: 'Artillery systems',
        total: 280,
        increment: 13,
      },
      car_cistern: { name: 'Cars and cisterns', total: 1105, increment: 27 },
      mlrs: { name: 'MLRS', total: 82, increment: 2 },
      anti_aircraft: { name: 'Anti-aircraft warfare', total: 47, increment: 0 },
      uav: { name: 'UAV', total: 50, increment: 8 },
      ship: { name: 'Ships (boats)', total: 4, increment: 0 },
      special_equipment: { name: 'Special equipment', total: 16, increment: 1 },
      personnel: { name: 'Military personnel', total: 15800, increment: 200 },
      cruise_missile: { name: 'Cruise missiles', total: 0, increment: 0 },
      submarine: { name: 'Submarines', total: 0, increment: 0 },
    },
  },
];

const ORYX_DATA = {
  statistics: {
    count: 13637,
    destroyed: 9513,
    damaged: 616,
    abandoned: 606,
    captured: 2902,
  },
  name: 'Russia',
  countryName: 'RUSSIA',
  date: '2023-12-19T15:49:42.327Z',
  entityTypes: [],
  createdAt: '2023-12-19T15:52:05.839Z',
  updatedAt: '2023-12-27T10:44:36.184Z',
};

const ORYX_MODEL = `
export interface OryxStatistics {
  count: number;
  destroyed: number;
  damaged: number;
  captured: number;
  abandoned: number;
}

export interface OryxEntityStatusInfo {
  count: number;
  list: Array<string>;
}

export interface OryxEntityInfo {
  title?: string;
  description?: Array<string>;
  images?: Array<string>;
  url?: string;
}

export interface OryxEntityModel {
  //t-90
  name: string;
  code: string;
  count: number;
  info?: OryxEntityInfo;
  countryName: string;
  entityType: string;
  destroyed: OryxEntityStatusInfo;
  damaged: OryxEntityStatusInfo;
  captured: OryxEntityStatusInfo;
  abandoned: OryxEntityStatusInfo;
  damagedAndCaptured: OryxEntityStatusInfo;
  damagedAndAbandoned: OryxEntityStatusInfo;
}

export interface OryxEntityType {
  //tanks
  name: string;
  code: string;
  countryName: string;
  statistics: OryxStatistics;
  entities: Array<OryxEntityModel>;
}
`;
@Component({
  selector: 'app-application-programming-interface',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './application-programming-interface.component.html',
  styleUrl: './application-programming-interface.component.scss',
})
export class ApplicationProgrammingInterfaceComponent implements OnInit {
  public modData = MOD_DATA;
  public modDataFlat = MOD_DATA_FLAT;
  public oryxData = ORYX_DATA;
  public oryxModel = ORYX_MODEL;

  public title = $localize`:@@pageTitleAPI:Data and infographic about russian invasion of Ukraine Application Programming Interface (API)`;
  public ogTitle = $localize`:@@ogTitleAPI:Data and infographic about russian invasion of Ukraine Application Programming Interface (API)`;
  public ogDescription = $localize`:@@ogDescriptionAPI:Application programming interface (API) for data about russian losses during invasion of Ukraine`;

  public baseUrl: string = '';

  constructor(
    private _platformService: PlatformService,
    private _seoService: SeoService
  ) {
    if (this._platformService.isRunningOnBrowser()) {
      this.baseUrl = window.location.origin;
    }
  }

  private _setMetaTags(): void {
    this._seoService.updateTitle(this.title);
    this._seoService.updateMetaTags([
      { name: 'og:title', content: this.ogTitle },
      { name: 'og:description', content: this.ogDescription },
      { name: 'twitter:title', content: this.ogTitle },
      { name: 'twitter:description', content: this.ogDescription },
    ]);
  }

  public ngOnInit(): void {
    this._setMetaTags();
  }
}
