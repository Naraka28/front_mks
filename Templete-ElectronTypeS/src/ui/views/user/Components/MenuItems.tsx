import React from "react";
import Button from "../auxiliaryComponents/ButtonCard.tsx";
import Prueba1 from "./../../../assets/Prueba1.png";
import Prueba2 from "./../../../assets/Prueba2.png";
import Prueba3 from "./../../../assets/Prueba3.png";
import Prueba4 from "./../../../assets/Prueba4.png";

const menuItems = [
    { id: 1, name: "Té caliente", category: "Bebida Caliente", icon: Prueba3 },
    { id: 2, name: "Espresso", category: "Cafés", icon: Prueba1 },
    { id: 3, name: "Latte", category: "Cafés", icon: Prueba1 },
    { id: 4, name: "Cappuccino", category: "Cafés", icon: Prueba1 },
    { id: 5, name: "Americano", category: "Cafés", icon: Prueba1 },
    { id: 6, name: "Frappé de Chocolate", category: "Bebida Fría", icon: Prueba2 },
    { id: 7, name: "Galleta", category: "Postre", icon: Prueba4 },
];

interface MenuItemsProps {
    category: string | null;
    onSelectItem: (id: number) => void; // Nueva prop para manejar selección
}

const MenuItems: React.FC<MenuItemsProps> = ({ category, onSelectItem }) => {
    const filteredItems = category
        ? menuItems.filter(item => item.category === category)
        : menuItems;

    return (
        <div className="grid grid-cols-3 gap-4 p-4 font-[Poppins]">
            {filteredItems.map((item) => (
                <Button
                    key={item.id}
                    text={item.name}
                    imageSrc={item.icon}
                    altText="Coffee cup"
                    onClick={() => onSelectItem(item.id)} // Enviar ID al hacer clic
                />
            ))}
        </div>
    );
};

export default MenuItems;
