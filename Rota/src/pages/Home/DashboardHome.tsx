// src/pages/Home/Dashboard.tsx

import { CardResumo } from "./componentsHome/CardHome";


export const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <CardResumo titulo="Vendas do dia" valor="R$ 1.250,00" />
      <CardResumo titulo="Clientes ativos" valor="320" />
      <CardResumo titulo="Pedidos pendentes" valor="12" />
    </div>
  );
};