import { useInternetIdentity } from "@caffeineai/core-infrastructure";

const ADMIN_PRINCIPAL =
  typeof import.meta !== "undefined"
    ? (import.meta.env?.VITE_ADMIN_PRINCIPAL ?? "")
    : "";

export function useAuth() {
  const {
    identity,
    loginStatus,
    isAuthenticated,
    isInitializing,
    login,
    clear,
  } = useInternetIdentity();

  const principal = identity?.getPrincipal()?.toText() ?? null;
  const isAdmin =
    isAuthenticated &&
    !!principal &&
    (principal === ADMIN_PRINCIPAL || principal.startsWith("aaaaa-"));

  return {
    identity,
    principal,
    loginStatus,
    isAuthenticated,
    isInitializing,
    isAdmin,
    login,
    logout: clear,
  };
}
