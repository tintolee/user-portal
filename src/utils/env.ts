export type EnvData = {
  API_BASE_URL: string;
  API_APPLICATION_ID: string;
  API_SECRET_KEY: string;
  APP_DEPLOY_URL: string;
  APP_VERSION: string;
  CAPTCHA_SITE_KEY: string;
  DB_DEFAULT_TIME_ZONE: string;
  ENVIRONMENT: string;
  FLUTTERWAVE_PUBLIC_KEY: string;
  IS_DEV: boolean;
  IS_STAGING: boolean;
  IS_PROD: boolean;
  LOGGED_IN_ENCRYPTION_SECRET: string;
  MIXPANEL_PROJECT_TOKEN: string;
  NETHONE_SRC: string;
  SENTRY_DSN_URL: string;
  USER_AUTO_LOGOUT_DURATION_MS: number;
  VERIFY_ENDPOINT: string;
  VOLUME_APP_ID: string;
  VOLUME_ENVIRONMENT: string;
  WEBSITE_URL: string;
};

export function getEnvData(): Readonly<EnvData> {
  const ENVIRONMENT = `${process.env.REACT_APP_ENV}`;
  const IS_DEV = ENVIRONMENT === 'development';

  return {
    API_BASE_URL: `${process.env.REACT_APP_API_BASE_URL}`,
    API_APPLICATION_ID: `${process.env.REACT_APP_API_APPLICATION_ID}`,
    API_SECRET_KEY: `${process.env.REACT_APP_API_SECRET_KEY}`,
    APP_DEPLOY_URL: `${IS_DEV ? window.location.origin : process.env.REACT_APP_DEPLOY_URL}`.replace(
      /[/]*$/,
      ''
    ),
    APP_VERSION: `${process.env.REACT_APP_VERSION}`,
    CAPTCHA_SITE_KEY: `${process.env.REACT_APP_CAPTCHA_SITE_KEY}`,
    DB_DEFAULT_TIME_ZONE: `${process.env.REACT_APP_DB_DEFAULT_TIME_ZONE}`,
    ENVIRONMENT,
    FLUTTERWAVE_PUBLIC_KEY: `${process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY}`,
    IS_DEV,
    IS_STAGING: ENVIRONMENT === 'staging',
    IS_PROD: ENVIRONMENT === 'production',
    LOGGED_IN_ENCRYPTION_SECRET: `${process.env.REACT_APP_LOGGED_IN_ENCRYPTION_SECRET}`,
    MIXPANEL_PROJECT_TOKEN: `${process.env.REACT_APP_MIXPANEL_PROJECT_TOKEN}`,
    NETHONE_SRC: `${process.env.REACT_APP_NETHONE_SRC}`,
    SENTRY_DSN_URL: `${process.env.REACT_APP_SENTRY_DSN_URL}`,
    USER_AUTO_LOGOUT_DURATION_MS: Number(process.env.REACT_APP_USER_AUTO_LOGOUT_DURATION_MS),
    VERIFY_ENDPOINT: `${process.env.REACT_APP_VERIFY_ENDPOINT}`,
    VOLUME_APP_ID: `${process.env.REACT_APP_VOLUME_APP_ID}`,
    VOLUME_ENVIRONMENT: `${process.env.REACT_APP_VOLUME_ENVIRONMENT}`,
    WEBSITE_URL: `${process.env.REACT_APP_WEBSITE_URL}`
  };
}
