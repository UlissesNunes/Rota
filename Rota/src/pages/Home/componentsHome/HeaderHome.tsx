// src/pages/Home/componentsHome/HeaderHome.tsx
import { useState } from "react";
import { Menu, Plus, User } from "lucide-react";
import { LogoutButton } from "../LogoutHome";

type AddItem = {
  label: string;
  action: () => void;
};

export const HeaderHome = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  // Lista dinâmica de itens de adicionar
  const addItems: AddItem[] = [
    { label: "Adicionar Serviço", action: () => console.log("Serviço adicionado") },
    { label: "Adicionar Motorista", action: () => console.log("Motorista adicionado") },
    { label: "Adicionar Frota", action: () => console.log("Frota adicionada") },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-[#000000] from-100% via-[#e36600] to-[#FE751B] text-white p-2 flex items-center justify-between">
      {/* Logo + botão de menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-[#FE751B]/80 rounded"
        >
          <Menu size={28} />
        </button>
        <img
          src="/rotaicone.webp" // substitua pelo caminho da sua logo
          alt="Logo da empresa"
          className="h-8 w-auto"
        />
      </div>

      {/* Espaço central vazio para minimalismo */}
      <div className="flex-1" />

      {/* Ações do canto direito */}
      <div className="flex items-center gap-4">
        {/* Botão Adicionar */}
        <div className="relative">
          <button
            onClick={() => setOpenAddMenu(!openAddMenu)}
            className="flex items-center gap-2 bg-black text-[#FE751B] px-3 py-1 rounded hover:bg-gray-100"
          >
            <Plus size={20} /> Adicionar
          </button>

          {openAddMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-black shadow-lg rounded-lg overflow-hidden">
              <ul className="flex flex-col">
                {addItems.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={item.action}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#FE751B]"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Menu do usuário com Logout */}
        <div className="relative">
          <button
            onClick={() => setOpenUserMenu(!openUserMenu)}
            className="flex items-center gap-2 bg-black text-[#FE751B] px-3 py-1 rounded hover:bg-gray-100"
          >
            <User size={20} /> Perfil
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#FE751B]">
                  Configurações
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};