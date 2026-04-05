import { useNavigate } from "react-router-dom";
import { supabase } from "../../infra/superBaseClient";


export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // encerra sessão
    navigate("/LoginRota");            // redireciona para login
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Sair
    </button>
  );
}