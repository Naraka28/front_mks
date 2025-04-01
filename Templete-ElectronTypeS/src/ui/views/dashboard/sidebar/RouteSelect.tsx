import React from "react";
import { IconType } from "react-icons";
import {
  FiBox,
  FiDollarSign,
  FiHome,
  FiPaperclip,
  FiUsers,
  FiCoffee,
  FiStar,
  FiDroplet,
  FiMaximize,
  FiTag
} from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';

export const RouteSelect = () => {

  const location = useLocation();

  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={location.pathname === "/dashboard"} title="Dashboard" path="/dashboard" />
      <Route Icon={FiUsers} selected={location.pathname === "/trabajadores"} title="Trabajadores" path="/trabajadores" />
      <Route Icon={FiPaperclip} selected={location.pathname === "/reportes"} title="Reportes" path="/reportes" />
      <Route Icon={FiDollarSign} selected={location.pathname === "/ventas"} title="Ventas" path="/ventas" />
      <Route Icon={FiDroplet} selected={location.pathname === "/sabores"} title="Sabores" path="/sabores" />
      <Route Icon={FiMaximize} selected={location.pathname === "/tamanos"} title="Tamaños" path="/tamanos" />
      <Route Icon={FiCoffee} selected={location.pathname === "/leches"} title="Leches" path="/leches" />
      <Route Icon={FiStar} selected={location.pathname === "/toppings"} title="Toppings" path="/toppings" />
      <Route Icon={FiTag} selected={location.pathname === "/productos"} title="Productos" path="/productos" />
      <Route Icon={FiBox} selected={location.pathname === "/inventario"} title="Inventario" path="/inventario" />
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