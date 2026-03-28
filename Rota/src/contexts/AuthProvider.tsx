import { useAuthentic } from "../application/useAuthentic";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthentic();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}