import { useParams } from "react-router-dom";

const MenuSelected: React.FC = () => {
    const { itemId } = useParams(); // Obtiene el ID de la URL

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <h1 className="text-4xl font-bold">Producto seleccionado: {itemId}</h1>
        </div>
    );
};

export default MenuSelected;
