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
  {
    name: $localize`Spanish (Español)`,
    shortName: 'ES',
    localeName: 'es',
    icon: 'assets/img/spain_flag.png',
    baseHref: 'es',
  },
  {
    name: $localize`French (Français)`,
    shortName: 'FR',
    localeName: 'fr',
    icon: 'assets/img/france_flag.webp',
    baseHref: 'fr',
  },
  {
    name: $localize`German (Deutsch)`,
    shortName: 'DE',
    localeName: 'de',
    icon: 'assets/img/germany_flag.png',
    baseHref: 'de',
  },
  {
    name: $localize`Italian (Italiano)`,
    shortName: 'IT',
    localeName: 'it',
    icon: 'assets/img/italy_flag.png',
    baseHref: 'it',
  },
  {
    name: $localize`Japanese (日本語)`,
    shortName: 'JA',
    localeName: 'ja',
    icon: 'assets/img/japan_flag.png',
    baseHref: 'ja',
  },
];
