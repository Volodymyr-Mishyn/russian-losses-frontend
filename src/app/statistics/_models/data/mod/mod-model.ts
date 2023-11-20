export enum EntityNamesEnum {
  tank = 'tank',
  armoredFightingVehicle = 'armored_fighting_vehicle',
  artillerySystem = 'artillery_system',
  MLRS = 'mlrs',
  antiAircraft = 'anti_aircraft',
  plane = 'plane',
  helicopter = 'helicopter',
  UAV = 'uav',
  cruiseMissile = 'cruise_missile',
  ship = 'ship',
  submarine = 'submarine', //14.09.2023
  carCistern = 'car_cistern',
  specialEquipment = 'special_equipment',
  personnel = 'personnel',
}

export type CalculatedData = {
  [key in EntityNamesEnum]: number;
};

export interface CalculatedIncrement {
  comparedToAverage: number;
  diffWithAverage: number;
}

export interface CalculatedIncrementPeriod extends CalculatedIncrement {
  period: {
    start: string;
    end: string;
  };
}

export interface EntityLossFlat {
  name: string;
  total: number;
  increment: number;
  calculatedIncrement?: CalculatedIncrement;
  calculatedIncrementPeriod?: CalculatedIncrementPeriod;
}

export interface MoDDayResultFlat {
  date: string;
  data: {
    [key in EntityNamesEnum]: EntityLossFlat;
  };
}

export type MoDDataFlat = Array<MoDDayResultFlat>;
