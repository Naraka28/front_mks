import React from "react";
import { IconType } from "react-icons";
import {
  FiBox,
  FiDollarSign,
  FiHome,
  FiPaperclip,
  FiUsers,
} from "react-icons/fi";
import { Link } from 'react-router-dom';

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" path="/dashboard" />
      <Route Icon={FiUsers} selected={false} title="Trabajadores" path="/trabajadores" />
      <Route Icon={FiPaperclip} selected={false} title="Reportes" path="/reportes" />
      <Route Icon={FiDollarSign} selected={false} title="Ventas" path="/ventas" />
      <Route Icon={FiBox} selected={false} title="Inventario" path="/inventario" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  path,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}) => {
  return (
    <Link to={path}>
      <button
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
      >
        <Icon className={selected ? "text-violet-800" : ""} />
        <span>{title}</span>
      </button>
    </Link>
  );
};