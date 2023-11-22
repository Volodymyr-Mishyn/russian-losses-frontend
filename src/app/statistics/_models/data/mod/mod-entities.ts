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

export enum EntityCategories {
  personnel = 'personnel',
  groundVehicles = 'groundVehicles',
  artilleryVehicles = 'artilleryVehicles',
  antiAircraftVehicles = 'antiAircraftVehicles',
  aircraftVehicles = 'aircraftVehicles',
  waterVehicles = 'waterVehicles',
}
export type MoDEntitiesMap = {
  [k in EntityCategories]: Array<EntityNamesEnum>;
};

export const ALL_MOD_ENTITIES: Array<EntityNamesEnum> = [
  EntityNamesEnum.personnel,
  EntityNamesEnum.tank,
  EntityNamesEnum.armoredFightingVehicle,
  EntityNamesEnum.specialEquipment,
  EntityNamesEnum.antiAircraft,
  EntityNamesEnum.artillerySystem,
  EntityNamesEnum.MLRS,
  EntityNamesEnum.plane,
  EntityNamesEnum.helicopter,
  EntityNamesEnum.cruiseMissile,
  EntityNamesEnum.UAV,
  EntityNamesEnum.ship,
  EntityNamesEnum.submarine,
  EntityNamesEnum.carCistern,
];

export const MOD_ENTITIES_MAP: MoDEntitiesMap = {
  [EntityCategories.personnel]: [EntityNamesEnum.personnel],
  [EntityCategories.groundVehicles]: [
    EntityNamesEnum.tank,
    EntityNamesEnum.carCistern,
    EntityNamesEnum.armoredFightingVehicle,
    EntityNamesEnum.specialEquipment,
  ],
  [EntityCategories.antiAircraftVehicles]: [EntityNamesEnum.antiAircraft],
  [EntityCategories.artilleryVehicles]: [
    EntityNamesEnum.artillerySystem,
    EntityNamesEnum.MLRS,
  ],
  [EntityCategories.aircraftVehicles]: [
    EntityNamesEnum.plane,
    EntityNamesEnum.helicopter,
    EntityNamesEnum.cruiseMissile,
    EntityNamesEnum.UAV,
  ],
  [EntityCategories.waterVehicles]: [
    EntityNamesEnum.ship,
    EntityNamesEnum.submarine,
  ],
};
