import { OryxEntityType } from '../../_models/data/oryx/oryx-model';
import {
  OryxComparison,
  OryxEntitiesComparison,
  OryxSideEntitiesLosses,
  OryxSideTypeLossesCountComparison,
} from '../../_models/data/oryx/oryx-comparison';
import { OryxSideNames } from '../../_models/data/oryx/oryx.types';

function createEntitiesMap(
  sidesTypesInfo: Array<Array<OryxEntityType>>
): Map<string, OryxEntitiesComparison> {
  const entityModelTypesComparisonMap = new Map<
    string,
    OryxEntitiesComparison
  >();

  const entities = sidesTypesInfo.flatMap((sideTypes) =>
    sideTypes.flatMap((sideType) => sideType.entities)
  );

  entities.forEach((entity) => {
    const entitiesComparisonElement = entityModelTypesComparisonMap.get(
      entity.entityType
    );
    if (entitiesComparisonElement) {
      entitiesComparisonElement.names = [
        ...new Set([...entitiesComparisonElement.names, entity.name]),
      ];
      const alreadyPresentForCountry =
        entitiesComparisonElement.countComparison.find(
          (countComparison) => countComparison.name === entity.countryName
        );
      if (alreadyPresentForCountry) {
        alreadyPresentForCountry.values = [
          ...alreadyPresentForCountry.values,
          { name: entity.name, value: entity.count },
        ];
      } else {
        entitiesComparisonElement.countComparison = [
          ...entitiesComparisonElement.countComparison,
          {
            name: entity.countryName as OryxSideNames,
            values: [{ name: entity.name, value: entity.count }],
          },
        ];
      }
    } else {
      const entityComparison: OryxEntitiesComparison = {
        names: [entity.name],
        countComparison: [
          {
            name: entity.countryName as OryxSideNames,
            values: [{ name: entity.name, value: entity.count }],
          },
        ],
      };
      entityModelTypesComparisonMap.set(entity.entityType, entityComparison);
    }
  });
  return entityModelTypesComparisonMap;
}

function fillEmptyEntities(
  entitiesComparison: OryxEntitiesComparison
): OryxEntitiesComparison {
  const filledCountComparison: Array<OryxSideEntitiesLosses> =
    entitiesComparison.countComparison.map((countrySide) => {
      const allNamesForCountryEntitiesSet = new Set(
        countrySide.values.map((sideEntitiesLosses) => sideEntitiesLosses.name)
      );
      const notPresentEntities = entitiesComparison.names.filter(
        (name) => !allNamesForCountryEntitiesSet.has(name)
      );
      return {
        ...countrySide,
        values: [
          ...countrySide.values,
          ...notPresentEntities.map((name) => ({ name, value: 0 })),
        ],
      };
    });
  return { ...entitiesComparison, countComparison: filledCountComparison };
}

function createTypesCountMap(
  sidesTypesInfo: Array<Array<OryxEntityType>>
): Map<string, OryxSideTypeLossesCountComparison> {
  const entityTypes = sidesTypesInfo.flatMap((sideTypes) =>
    sideTypes.map((entityType) => ({
      name: entityType.name,
      countryName: entityType.countryName,
      count: entityType.statistics.count,
    }))
  );
  const typesMap = new Map<
    string,
    Array<{ name: OryxSideNames; value: number }>
  >();
  entityTypes.forEach((entityTypeInfo) => {
    const presentType = typesMap.get(entityTypeInfo.name);
    if (presentType) {
      presentType.push({
        name: entityTypeInfo.countryName as OryxSideNames,
        value: entityTypeInfo.count,
      });
    } else {
      const countComparison = [
        {
          name: entityTypeInfo.countryName as OryxSideNames,
          value: entityTypeInfo.count,
        },
      ];
      typesMap.set(entityTypeInfo.name, countComparison);
    }
  });
  return typesMap;
}

function combineOryxMaps(
  entitiesMap: Map<string, OryxEntitiesComparison>,
  typesCountMap: Map<string, OryxSideTypeLossesCountComparison>
): OryxComparison {
  return [...entitiesMap.entries()].map(([typeName, entitiesInfo]) => {
    return {
      name: typeName,
      countComparison: typesCountMap.get(typeName),
      entitiesComparison: entitiesInfo,
    };
  }) as OryxComparison;
}

export function createOryxComparison(
  sidesTypesInfo: Array<Array<OryxEntityType>>
): OryxComparison {
  const entitiesMap = createEntitiesMap(sidesTypesInfo);
  const typesCountMap = createTypesCountMap(sidesTypesInfo);
  const combined = combineOryxMaps(entitiesMap, typesCountMap).map(
    (singleType) => ({
      ...singleType,
      entitiesComparison: fillEmptyEntities(singleType.entitiesComparison),
    })
  );
  console.log(combined);
  return combined;
}
