// src/utils/session.ts
const KEY = "loginTimestamp";

export function setLoginTimestamp() {
  localStorage.setItem(KEY, Date.now().toString());
}

export function clearLoginTimestamp() {
  localStorage.removeItem(KEY);
}

export function isSessionValid(): boolean {
  const ts = localStorage.getItem(KEY);
  if (!ts) return false;
  const elapsed = Date.now() - parseInt(ts, 10);
  return elapsed < 24 * 60 * 60 * 1000; // 24h
}