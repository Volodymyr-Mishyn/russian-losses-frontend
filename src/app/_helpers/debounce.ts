export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  immediate: boolean = false
): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeout!);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}
