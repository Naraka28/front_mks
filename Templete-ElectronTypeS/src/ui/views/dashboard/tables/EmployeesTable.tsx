import React from "react";

export const EmployeesTable = () => {
  const customers = [
    {
      name: "Alejandro Fernandez",
      contact: "6621234567",
      spent: "$2,890.66",
      status: "Activo",
      img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg",
    },
    {
      name: "Felipe Gonzalez",
      contact: "6623234668",
      spent: "$2,767.04",
      status: "Activo",
      img: "https://xsgames.co/randomusers/assets/avatars/male/6.jpg",
    },
    {
      name: "Gabriel Garcia",
      contact: "6624254866",
      spent: "$2,996.00",
      status: "Baja",
      img: "https://xsgames.co/randomusers/assets/avatars/male/71.jpg",
    },
    {
      name: "Olga Martinez",
      contact: "6622254764",
      spent: "$3,654.00",
      status: "Activo",
      img: "https://xsgames.co/randomusers/assets/avatars/female/22.jpg",
    },
    {
      name: "Rodrigo Torres",
      contact: "6623274668",
      spent: "$1,890.66",
      status: "Baja",
      img: "https://xsgames.co/randomusers/assets/avatars/male/73.jpg",
    },
  ];

  return (
    <div className="col-span-12 p-4 rounded border border-gray-300 bg-white shadow-lg">
      <div className="mb-4 flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 text-2xl">Trabajadores</h3>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody className="text-sm divide-y divide-gray-100">
          {customers.map((customer, index) => (
            <TableRow key={index} {...customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
      <tr>
        <th className="p-2 text-left">Nombre</th>
        <th className="p-2 text-left">Contacto</th>
        <th className="p-2 text-left">Nómina</th>
        <th className="p-2 text-center">Estado</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  name,
  contact,
  spent,
  status,
  img,
}: {
  img: string;
  name: string;
  contact: string;
  spent: string;
  status: string;
}) => {
  return (
    <tr className="text-gray-600">
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={img}
            alt={name}
          />
          <span className="font-medium text-gray-800">{name}</span>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap font-medium">{contact}</td>
      <td className="p-2 whitespace-nowrap font-medium text-green-600">{spent}</td>
      <td className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${status === "Activo" ? "bg-green-500/20 text-green-900" : status === "Baja" ? "bg-red-500/20 text-red-900" : "bg-amber-500/20 text-amber-900" } justify-center mt-2.5 py-2 px-1 text-s rounded-md`}>{status}</td>
    </tr>
  );
};