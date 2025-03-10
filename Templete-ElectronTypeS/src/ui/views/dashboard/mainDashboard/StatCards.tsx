import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  return (
    <>
      <Card
        title="Ganancias Netas"
        value="$618,916.69"
        period="Desde 1 Enero - 31 Diciembre"
      />
      <Card
        title="Gastos Totales"
        value="$217,469.86"
        period="Desde 1 Enero - 31 Diciembre"
      />
      <Card
        title="Ordenes Totales"
        value="$97,429"
        period="Últimos 365 días"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  period,
}: {
  title: string;
  value: string;
  period: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};