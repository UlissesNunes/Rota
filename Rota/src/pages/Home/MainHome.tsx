// src/pages/Home/MainHome.tsx
import { useAuth } from "../../contexts/useAuth";
import { DashboardHome } from "./DashboardHome";
 
export const MainHome = () => {
  const { state } = useAuth();
 
  if (!state.user) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100%", padding: "4rem",
      }}>
        <p style={{ color: "#e74c3c", fontWeight: 600, fontSize: 15 }}>
          Usuário não autenticado.
        </p>
      </div>
    );
  }
 
  return <DashboardHome user={state.user} />;
};
 