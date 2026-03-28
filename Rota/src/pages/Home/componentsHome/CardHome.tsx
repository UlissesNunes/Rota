// src/pages/Home/components/CardResumo.tsx
type Props = {
  titulo: string;
  valor: string;
};

export const CardResumo = ({ titulo, valor }: Props) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-sm text-gray-600">{titulo}</h3>
      <p className="text-xl font-bold">{valor}</p>
    </div>
  );
};