import React, { useState } from "react";
import ButtonCard from "../auxiliaryComponents/ButtonCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsByType } from "../../../services/productsServices.ts";




interface MenuItemsProps {
    category: string | null;
    onSelectItem: (id: number) => void; // Nueva prop para manejar selección
    selectedProductId?: number; // ID del producto seleccionado (opcional)
}

const MenuItems: React.FC<MenuItemsProps> = ({  onSelectItem }) => {

    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);


    const { data: menuItems =[], isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: ()=> getProducts(),   
    });
    console.log(menuItems);

    const handleSelectItem = (id: number) => {
        setSelectedProductId(id); // Guardar el ID del producto seleccionado
        onSelectItem(id); // Llamar la función externa si es necesario
    };

    if (isLoading) return <p>Cargando productos...</p>;
    if (error) {
        console.log(error);
      
        return <p>Error al cargar los productos</p>;
      }
    


    return (
        <div className="grid grid-cols-3 gap-4 p-4 font-[Poppins]">
            {menuItems.map((item) => (
                <ButtonCard
                    key={item.id}
                    text={item.name}
                    imageSrc={item.image}
                    altText={`${item.name} product`}
                    onClick={() => handleSelectItem(item.id)} // Enviar ID al hacer clic
                />
            ))}
        </div>
    );
};

export default MenuItems;
