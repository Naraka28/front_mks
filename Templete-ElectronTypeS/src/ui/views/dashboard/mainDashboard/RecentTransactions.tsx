import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";

export const RecentTransactions = () => {

  const navigate = useNavigate();
  
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Transacciones Recientes
        </h3>
        <button className="text-sm text-violet-500 hover:underline" onClick={() => navigate("/ventas")}>
          Ver Todos
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          <TableRow
            id="#91883"
            quantity="7"
            date="4 de Agosto"
            price="$354.25"
            order={1}
          />
          <TableRow
            id="#91882"
            quantity="1"
            date="4 de Agosto"
            price="$62.99"
            order={2}
          />
          <TableRow
            id="#91881"
            quantity="3"
            date="3 de Agosto"
            price="$223.50"
            order={3}
          />
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Transacción No.</th>
        <th className="text-start p-1.5">Artículos</th>
        <th className="text-start p-1.5">Fecha</th>
        <th className="text-start p-1.5">Importe</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  id,
  quantity,
  date,
  price,
  order,
}: {
  id: string;
  quantity: string;
  date: string;
  price: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{id}</td>
      <td className="p-1.5">{quantity}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};