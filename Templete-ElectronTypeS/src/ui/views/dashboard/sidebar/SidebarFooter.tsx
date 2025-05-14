import React from "react";
import { useNavigate } from "react-router-dom";

export const SidebarFooter = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2 border-stone-300 justify-end text-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">Mokkasoft</p>
          <p className="text-stone-500">Administrador</p>
        </div>

        <button className="px-2 py-1.5 font-medium bg-stone-200 hover:bg-stone-300 transition-colors rounded" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};