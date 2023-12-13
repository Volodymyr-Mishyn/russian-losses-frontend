export enum MoDEntityNamesEnum {
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

export enum MoDEntityCategories {
  personnel = 'personnel',
  groundVehicles = 'groundVehicles',
  artilleryVehicles = 'artilleryVehicles',
  antiAircraftVehicles = 'antiAircraftVehicles',
  aircraftVehicles = 'aircraftVehicles',
  waterVehicles = 'waterVehicles',
}
export type MoDEntitiesMap = {
  [k in MoDEntityCategories]: Array<MoDEntityNamesEnum>;
};

export const ALL_MOD_ENTITIES: Array<MoDEntityNamesEnum> = [
  MoDEntityNamesEnum.personnel,
  MoDEntityNamesEnum.tank,
  MoDEntityNamesEnum.armoredFightingVehicle,
  MoDEntityNamesEnum.specialEquipment,
  MoDEntityNamesEnum.antiAircraft,
  MoDEntityNamesEnum.artillerySystem,
  MoDEntityNamesEnum.MLRS,
  MoDEntityNamesEnum.plane,
  MoDEntityNamesEnum.helicopter,
  MoDEntityNamesEnum.cruiseMissile,
  MoDEntityNamesEnum.UAV,
  MoDEntityNamesEnum.ship,
  MoDEntityNamesEnum.submarine,
  MoDEntityNamesEnum.carCistern,
];

export const MOD_ENTITIES_MAP: MoDEntitiesMap = {
  [MoDEntityCategories.personnel]: [MoDEntityNamesEnum.personnel],
  [MoDEntityCategories.groundVehicles]: [
    MoDEntityNamesEnum.tank,
    MoDEntityNamesEnum.carCistern,
    MoDEntityNamesEnum.armoredFightingVehicle,
    MoDEntityNamesEnum.specialEquipment,
  ],
  [MoDEntityCategories.antiAircraftVehicles]: [MoDEntityNamesEnum.antiAircraft],
  [MoDEntityCategories.artilleryVehicles]: [
    MoDEntityNamesEnum.artillerySystem,
    MoDEntityNamesEnum.MLRS,
  ],
  [MoDEntityCategories.aircraftVehicles]: [
    MoDEntityNamesEnum.plane,
    MoDEntityNamesEnum.helicopter,
    MoDEntityNamesEnum.cruiseMissile,
    MoDEntityNamesEnum.UAV,
  ],
  [MoDEntityCategories.waterVehicles]: [
    MoDEntityNamesEnum.ship,
    MoDEntityNamesEnum.submarine,
  ],
};
