import React from "react";
import Button from "./ButtonCard.tsx";
import Prueba1 from "./../assets/Prueba1.png";
import Prueba2 from "./../assets/Prueba2.png";
import Prueba3 from "./../assets/Prueba3.png";
import Prueba4 from "./../assets/Prueba4.png";

type MenuItemType = {
    name: string;
    category: "Bebida Caliente" | "Bebida Fría" | "Postre" | "Cafés";
    icon: string;

}; const menuItems: MenuItemType[] = [
    { name: "Té caliente", category: "Bebida Caliente", icon: Prueba3 },
    { name: "Espresso", category: "Cafés", icon: Prueba1 },
    { name: "Latte", category: "Cafés", icon: Prueba1 },
    { name: "Cappuccino", category: "Cafés", icon: Prueba1 },
    { name: "Americano", category: "Cafés", icon: Prueba1 },
    { name: "Frappé de Chocolate", category: "Bebida Fría", icon: Prueba2 },
    { name: "Galleta", category: "Postre", icon: Prueba4 },
];

interface MenuItemsProps {
    category: string | null;
}

const MenuItems: React.FC<MenuItemsProps> = ({ category }) => {
    const filteredItems = category
        ? menuItems.filter(item => item.category === category)
        : menuItems;

    return (
        <div className="grid grid-cols-3 gap-4 p-4 font-[Poppins]">
            {filteredItems.map((item) => (
                <Button
                    key={item.name}
                    text={item.name}
                    imageSrc={item.icon}
                    altText="Coffee cup"
                />
            ))}
        </div>
    );
};

export default MenuItems;
