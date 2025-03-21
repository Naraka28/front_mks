import { useState } from "react";
import Sidebar from "../user/Components/Sidebar";
import MenuItems from "../user/Components/MenuItems";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen manrope-500">
      <div className="relative grid grid-cols-9 grid-rows-8 gap-3 p-5 min-h-screen">

        {/* Sidebar */}
        <div className="bg-[#ffdbe8] rounded-2xl row-span-8 flex">
          <Sidebar onSelectCategory={setSelectedCategory} />
        </div>

        {/* Contenido */}
        <div className="bg-white col-span-6 rounded-2xl flex justify-start items-center text-5xl font-[Poppins] font-extrabold p-4">
          <h1>
            {selectedCategory ? `Categoría: ${selectedCategory}` : "¿Qué se te antoja hoy?"}
          </h1>
        </div>

        <div className="bg-[#ffdbe8] rounded-2xl row-span-8 col-span-2">
          <div className="flex flex-col justify-start items-center h-full">
            <p className="text-3xl font-[Poppins] font-black py-5">NUEVA ORDEN</p>
          </div>
        </div>

        <div className="bg-[#ffdbe8] rounded-2xl row-span-7 col-span-6 overflow-y overflow-hidden p-4" style={{ maxHeight: 'calc(109vh - 200px)' }}>
          <MenuItems category={selectedCategory} />
        </div>


      </div>
    </div>
  );
}

export default Menu;
