import React from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";

export const SalesTable = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="p-6 overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <TableHead />
          <tbody>
            <TableRow
              id="#91883"
              quantity="7"
              date="4 de Agosto"
              price="$354.25"
              order={1}
              status="Pagado"
              account="visa"
              image="https://centrosantafe.com.mx/cdn/shop/files/255.png?v=10504390230999457819"
            />
            <TableRow
              id="#91882"
              quantity="1"
              date="4 de Agosto"
              price="$62.99"
              order={2}
              status="Pendiente"
              account="mastercard"
              image="https://centrosantafe.com.mx/cdn/shop/files/255.png?v=10504390230999457819"
            />
            <TableRow
              id="#91881"
              quantity="3"
              date="3 de Agosto"
              price="$223.50"
              order={3}
              status="Pendiente"
              account="visa"
              image="https://centrosantafe.com.mx/cdn/shop/files/255.png?v=10504390230999457819"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Sucursal</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Cantidad</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Fecha</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Estado</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Cuenta</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70"></p>
        </th>
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
  status,
  account,
  image,
}: {
  id: string;
  quantity: string;
  date: string;
  price: string;
  order: number;
  status: string;
  account: string;
  image: string;
}) => {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <img src={image} alt="Logo" className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Starbucks Lomas</p>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{price}</p>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{date}</p>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="w-max">
          <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${status === "Pagado" ? "bg-green-500/20 text-green-900" : status === "Pendiente" ? "bg-amber-500/20 text-amber-900" : "bg-red-500/20 text-red-900"} py-1 px-2 text-xs rounded-md`}>
            <span>{status}</span>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
            <img src={`https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/${account}.png`} alt={account} className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1" />
          </div>
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">{account}</p>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">06/2026</p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <FiMoreHorizontal />
          </span>
        </button>
      </td>
    </tr>
  );
};
