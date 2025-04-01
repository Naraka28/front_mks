import React from "react";
import Button from "../auxiliaryComponents/ButtonCard.tsx";
import SmallSizeIcon from "./../../../assets/Prueba3.png";
import TallSizeIcon from "./../../../assets/Prueba1.png";
import GrandeSizeIcon from "./../../../assets/Prueba1.png";
import VentiSizeIcon from "./../../../assets/Prueba1.png";

const sizeItems = [
    { id: 1, name: "Short", category: "size", icon: SmallSizeIcon, price: 0 },
    { id: 2, name: "Tall", category: "size", icon: TallSizeIcon,price: 5 },
    { id: 3, name: "Grande", category: "size", icon: GrandeSizeIcon, price: 10 },
    { id: 4, name: "Venti", category: "size", icon: VentiSizeIcon, price: 15 },
];

interface SizesProps {
    selectedCategory: string | null;
    onSelectSize: (id: number) => void;
}

const Sizes: React.FC<SizesProps> = ({ selectedCategory, onSelectSize }) => {
    // Filtramos solo los items de tipo 'size' por si acaso
    const filteredItems = selectedCategory
        ? sizeItems.filter(item => item.category === selectedCategory)
        : sizeItems;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 font-[Poppins]">
            {filteredItems.map((item) => (
                <Button
                    key={item.id}
                    text={item.name}
                    imageSrc={item.icon}
                    altText={`${item.name} size`}
                    price={item.price}
                    onClick={() => onSelectSize(item.id)}
                />
            ))}
        </div>
    );
};

export default Sizes;