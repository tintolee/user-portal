import ClientApi from '@src/types/client';

export const getBrowserLocales = (defaultLocale = 'en'): ClientApi.Locales => {
  const n = navigator;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore TS:2339 In IE, userLanguage, browserLanguage are used
  const primaryLocale = n.userLanguage || n.language || n.browserLanguage;

  let locales: string[] = (n.languages as string[]) || [];
  // In some browsers, the primary locale isn't first on the array list
  locales = [primaryLocale, ...locales];

  if (locales.length === 1) {
    locales = [defaultLocale];
  }

  return locales;
};
