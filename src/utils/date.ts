import { getEnvData } from '@src/utils/env';

const { DB_DEFAULT_TIME_ZONE: TZ = 'Z' } = getEnvData();

/**
 * Check if the supplied ISO-8601 datetime string contains a timezone.
 * We do this by checking if the end of the string matches the timezone formats.
 *
 * Valid timezone formats are `±hhmm`, `±hh:mm` or `Z`
 *
 * We don't use short `±hh` format because the Date constructor parses it as invalid
 * eg `new Date ('2021-03-05T11:45:00+01')` is invalid
 *
 * @param dateTime the datetime string.
 */
export const containsTimezone = (dateTime: string): boolean => {
  return /(Z|[+-]\d{2}:?\d{2})$/.test(dateTime);
};

/**
 * Add the DB server timezone to a ISO-8601 datetime string
 * @param dateTime
 */
const addTimezone = (dateTime: string): string => {
  return `${dateTime}${TZ}`;
};

/**
 * Get the ISO-8601 datetime always with timezone included
 * @param dateTime
 */
export const getDateTimeWithTimezone = (dateTime: string): string => {
  if (containsTimezone(dateTime)) {
    return dateTime;
  }
  return addTimezone(dateTime);
};
