import {
  EntityCategories,
  EntityNamesEnum,
  MOD_ENTITIES_MAP,
} from '../../_models/data/mod/mod-entities';

export function getCategoryByEntityName(
  entityName: EntityNamesEnum
): EntityCategories {
  for (const category in MOD_ENTITIES_MAP) {
    if (MOD_ENTITIES_MAP[category as EntityCategories].includes(entityName)) {
      return category as EntityCategories;
    }
  }
  throw new Error('wrong category provided');
}

export function getEntityNamesForCategory(
  category: EntityCategories
): Array<EntityNamesEnum> {
  return MOD_ENTITIES_MAP[category];
}
