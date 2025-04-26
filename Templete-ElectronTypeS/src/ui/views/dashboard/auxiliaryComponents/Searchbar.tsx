import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchbarProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchbarProducts: React.FC<SearchbarProps> = ({ placeholder = "Buscar un Registro", onChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddClick = () => {
    const currentPath = location.pathname;

    if (currentPath.includes("/sabores")) {
      navigate("/sabores/agregar-sabor");
    } else if (currentPath.includes("/tamanos")) {
      navigate("/tamanos/agregar-tamano");
    } else if (currentPath.includes("/leches")) {
      navigate("/leches/agregar-leche");
    } else if (currentPath.includes("/toppings")) {
      navigate("/toppings/agregar-topping");
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      <div className="flex justify-end mt-2">
        <button 
          onClick={handleAddClick} 
          className="px-4 py-2 bg-violet-600 text-sm text-white rounded-lg shadow-md hover:bg-violet-800 transition"
        >
          Agregar nuevo registro
        </button>
      </div>
    </div>
  );
};

export default SearchbarProducts;
