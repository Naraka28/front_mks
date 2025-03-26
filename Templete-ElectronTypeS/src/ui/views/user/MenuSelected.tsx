import { useParams, useNavigate } from "react-router-dom";
import Sizes from "./Components/Sizes";
import Boton from "./auxiliaryComponents/Boton";
import { FaArrowLeft } from "react-icons/fa"; // Importar icono de regreso

const MenuSelected: React.FC = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();

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

            <div className="relative grid grid-cols-8 grid-rows-8 gap-3 p-5 min-h-screen">
                {/* Botón de regreso en la esquina superior izquierda */}

                {/* Contenido */}
                <div className="col-span-6 rounded-2xl flex justify-start items-center font-[Poppins] font-extrabold p-4 ">
                    <div className="text-2xl top-5 left-5 z-10">
                        <Boton
                            texto="Regresar"
                            tipo="regresar"
                            onClick={() => navigate(-1)}
                            className="pl-3 pr-4 py-2"
                        />
                    </div>
                    <h1 className="px-10 text-4xl">¿Cómo se te antoja? ID del producto {itemId}</h1>
                </div>

                {/* Nueva Orden */}
                <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-8 col-span-2 flex flex-col justify-start items-center p-4">
                    <p className="text-3xl font-[Poppins] font-black py-5 text-[#333333]">NUEVA ORDEN</p>

                    <div className="flex flex-col gap-4 w-full px-4 mt-auto mb-8">
                    </div>
                </div>

                <div className="shadow-lg border-2 border-[#E8E8E8] rounded-2xl row-span-7 col-span-6 overflow-y-auto p-4 scrollbar-hide" style={{ maxHeight: 'calc(108vh - 200px)' }}>
                    <Sizes onSelectSize={() => { }} selectedCategory={null} />
                </div>
            </div>
        </div>
    );
};

export default MenuSelected;