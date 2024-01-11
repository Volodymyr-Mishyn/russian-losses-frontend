export interface LanguageInfo {
  name: string;
  shortName: string;
  localeName: string;
  icon: string;
  baseHref: string;
}

export const LANGUAGES: Array<LanguageInfo> = [
  {
    name: $localize`English`,
    shortName: 'EN',
    localeName: 'en-US',
    icon: 'assets/img/gb_flag.png',
    baseHref: 'en',
  },
  {
    name: $localize`Ukrainian (Українська)`,
    shortName: 'UK',
    localeName: 'uk',
    icon: 'assets/img/ukraine_flag.png',
    baseHref: 'uk',
  },
];
