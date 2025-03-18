import React from "react";

export const EmployeesTable = () => {
  const customers = [
    {
      name: "Alex Shatov",
      email: "alexshatov@gmail.com",
      spent: "$2,890.66",
      country: "🇺🇸",
      img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg",
    },
    {
      name: "Philip Harbach",
      email: "philip.h@gmail.com",
      spent: "$2,767.04",
      country: "🇩🇪",
      img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg",
    },
    {
      name: "Mirko Fisuk",
      email: "mirkofisuk@gmail.com",
      spent: "$2,996.00",
      country: "🇫🇷",
      img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg",
    },
    {
      name: "Olga Semklo",
      email: "olga.s@cool.design",
      spent: "$1,220.66",
      country: "🇮🇹",
      img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg",
    },
    {
      name: "Burak Long",
      email: "longburak@gmail.com",
      spent: "$1,890.66",
      country: "🇬🇧",
      img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg",
    },
  ];

  return (
    <div className="col-span-12 p-4 rounded border border-gray-300 bg-white shadow-lg">
      <div className="mb-4 flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Customers</h3>
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
        <th className="p-2 text-left">Name</th>
        <th className="p-2 text-left">Email</th>
        <th className="p-2 text-left">Spent</th>
        <th className="p-2 text-center">Country</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  name,
  email,
  spent,
  country,
  img,
}: {
  name: string;
  email: string;
  spent: string;
  country: string;
  img: string;
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
      <td className="p-2 whitespace-nowrap">{email}</td>
      <td className="p-2 whitespace-nowrap font-medium text-green-500">{spent}</td>
      <td className="p-2 text-lg text-center">{country}</td>
    </tr>
  );
};