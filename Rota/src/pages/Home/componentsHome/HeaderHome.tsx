// src/pages/Home/componentsHome/HeaderHome.tsx
import { useState } from "react";
import { Menu, Plus } from "lucide-react"; // ícones modernos

export const HeaderHome = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <header className="w-full bg-[#FE751B] text-white p-4 flex justify-between items-center relative">
      {/* Ícone de menu estilo Google */}
      <button onClick={onToggleSidebar} className="p-2 hover:bg-[#FE751B]/80 rounded">
        <Menu size={28} />
      </button>

      <h1 className="text-lg font-semibold">Minha Empresa</h1>

      {/* Botão para abrir nav suspenso */}
      <div className="relative">
        <button
          onClick={() => setOpenNav(!openNav)}
          className="flex items-center gap-2 bg-white text-[#FE751B] px-3 py-1 rounded hover:bg-gray-100"
        >
          <Plus size={20} /> Adicionar
        </button>

        {openNav && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden animate-slideDown">
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Adicionar Serviço</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Adicionar Motorista</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Adicionar Frota</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};