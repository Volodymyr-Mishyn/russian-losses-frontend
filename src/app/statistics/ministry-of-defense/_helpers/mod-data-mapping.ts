import {
  MoDEntityCategories,
  MoDEntityNamesEnum,
  MOD_ENTITIES_MAP,
} from '../../_models/data/mod/mod-entities';

export function getCategoryByEntityName(
  entityName: MoDEntityNamesEnum
): MoDEntityCategories {
  for (const category in MOD_ENTITIES_MAP) {
    if (
      MOD_ENTITIES_MAP[category as MoDEntityCategories].includes(entityName)
    ) {
      return category as MoDEntityCategories;
    }
  }
  throw new Error('wrong category provided');
}

export function getEntityNamesForCategory(
  category: MoDEntityCategories
): Array<MoDEntityNamesEnum> {
  return MOD_ENTITIES_MAP[category];
}
