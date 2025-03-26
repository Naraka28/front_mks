import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Sidebar from "./auxiliaryComponents/Sidebar";
import MenuItems from "../user/Components/MenuItems";

function Menu() {
  const [selectedType, setselectedType] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para navegar

  const handleSelectItem = (id: number) => {
    navigate(`/selected/${id}`); // Redirige a MenuSelected con el ID
  };

  return (
    <div className="h-screen w-screen manrope-500 bg-[#F7F2F2]">
      {/* Ocultar scrollbar */}
      <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

      <div className="relative grid grid-cols-9 grid-rows-8 gap-3 p-5 min-h-screen">
        {/* Sidebar */}
        <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-8 flex">
          <Sidebar onSelectCategory={setselectedType} />
        </div>


        {/* Contenido */}
        <div className="col-span-6 rounded-2xl flex justify-start items-center text-5xl font-[Poppins] font-extrabold p-4">
          <h1>
            {selectedType ? `Categoría: ${selectedType}` : "¿Qué se te antoja hoy?"}
          </h1>
        </div>

        {/* Nueva Orden */}
        <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-8 col-span-2 flex flex-col justify-start items-center p-4">
          <p className="text-3xl font-[Poppins] font-black py-5 text-[#333333]">NUEVA ORDEN</p>
        </div>

        <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-7 col-span-6 overflow-y-auto p-4 scrollbar-hide" style={{ maxHeight: 'calc(108vh - 200px)' }}>
          <MenuItems category={selectedType} onSelectItem={handleSelectItem} />
        </div>
      </div>
    </div>
  );
}

export default Menu;
