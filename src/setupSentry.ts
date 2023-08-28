import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { getEnvData } from '@src/utils/env';

const { APP_VERSION, ENVIRONMENT, SENTRY_DSN_URL, IS_PROD } = getEnvData();
const sendSentryReport = IS_PROD && !window.location.href.includes('localhost');

export default function setupSentry(history: History) {
  Sentry.init({
    environment: ENVIRONMENT,
    release: `sprint-frontend@${APP_VERSION}`,
    dsn: sendSentryReport ? SENTRY_DSN_URL : undefined,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history)
      })
    ],
    tracesSampleRate: 0.5
  });
}
