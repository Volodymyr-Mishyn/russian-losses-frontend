import { ORYX_STATISTICS_ORDER } from '../_models/data/oryx/oryx.types';

export function sortOryxData<T>(data: Array<T>, field: keyof T): Array<T> {
  const dataCopy = [...data];
  dataCopy.sort(
    (firstElement, secondElement) =>
      ORYX_STATISTICS_ORDER[firstElement[field] as string] -
      ORYX_STATISTICS_ORDER[secondElement[field] as string]
  );
  return dataCopy;
}
