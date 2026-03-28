// src/pages/Home/componentsHome/Sidebar.tsx
export const Sidebar = ({ open }: { open: boolean }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav className="flex flex-col space-y-2">
        <a href="/home/dashboard">Dashboard</a>
        <a href="/home/perfil">Perfil</a>
        <a href="/home/configuracoes">Configurações</a>
      </nav>
    </aside>
  );
};