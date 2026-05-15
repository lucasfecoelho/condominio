export const APP_LOGIN_AT_COOKIE = "condominio_login_at";
export const APP_SESSION_MAX_AGE_SECONDS = 60 * 60 * 48;

export function hasAppSessionExpired(loginStartedAt?: string) {
  if (!loginStartedAt) {
    return true;
  }

  const loginStartedAtMs = Date.parse(loginStartedAt);

  if (Number.isNaN(loginStartedAtMs)) {
    return true;
  }

  return Date.now() - loginStartedAtMs > APP_SESSION_MAX_AGE_SECONDS * 1000;
}

