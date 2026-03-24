import { useAuthDomain } from "../domain/auth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthDomain();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}