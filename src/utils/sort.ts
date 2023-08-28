import ClientApi from '@src/types/client';
import { getBrowserLocales } from '@src/utils/locale';

/**
 * ============================
 *  String sorting
 * ============================
 */

type CollatorOptions = { locales?: ClientApi.Locales } & Intl.CollatorOptions;
// eslint-disable-next-line no-unused-vars
type CompareFn = (a: string, b: string) => number;

const DEFAULT_COLLATOR_OPTIONS: CollatorOptions = {
  locales: getBrowserLocales(),
  sensitivity: 'base',
  ignorePunctuation: true
};

/**
 * Get a function to use to sort (localeCompare) between two strings.
 * Uses Intl.Collator when available for performance improvements
 */
const getLocaleCompareFn = (options?: CollatorOptions): CompareFn => {
  const { locales, ...collatorOptions }: CollatorOptions = {
    ...DEFAULT_COLLATOR_OPTIONS,
    ...options
  };
  let compare: CompareFn;

  try {
    compare = new Intl.Collator(locales, collatorOptions).compare;
  } catch (e) {
    compare = (a, b) => a.localeCompare(b, locales, collatorOptions);
  }

  return compare;
};

/**
 * Do a locale compare between two strings
 */
export const localeCompare: CompareFn = getLocaleCompareFn();

/**
 * ============================
 *  Date sorting
 * ============================
 */

/**
 * Sort dates (oldest first)
 */
export const dateAsc = (a: Date, b: Date): number => a.getTime() - b.getTime();

/**
 * Sort dates (recent first)
 */
export const dateDesc = (a: Date, b: Date): number => dateAsc(b, a);
