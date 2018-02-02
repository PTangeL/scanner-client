const config = key =>
  typeof window !== 'undefined' &&
    window.__sthaler_config &&
    window.__sthaler_config[key]
    ? window.__sthaler_config[key]
    : null

export const API_BASE_URL: string = config('API_BASE_URL') || 'http://nodejs0.fingopay.com:8888' // last one is production

export const SENTRY_DSN: string = config('SENTRY_DSN') ||
  'https://6409c15610534caa81dbe1bb6a0f3430@sentry.io/195941' // last one is production
