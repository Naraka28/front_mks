import Button from "../auxiliaryComponents/ButtonCard";
import prueba1 from "./../../../assets/Prueba1.png";

const flavourOptions = [
    { id: 1, name: "Vainilla", icon: prueba1, price: 0 },
    { id: 2, name: "Chocolate", icon: prueba1, price: 15 },
    { id: 3, name: "Caramelo", icon: prueba1, price: 0 },
    { id: 4, name: "Avellana", icon: prueba1, price: 0 },
    { id: 5, name: "Moka", icon: prueba1, price: 0 },
    { id: 6, name: "Café", icon: prueba1, price: 12 },
    { id: 7, name: "Coco", icon: prueba1, price: 0 },
    { id: 8, name: "Almendra", icon: prueba1, price: 18 }
];

interface FlavoursProps {
    onSelectFlavour: (id: number) => void;
}

const Flavours: React.FC<FlavoursProps> = ({ onSelectFlavour }) => {
    return (
        <div className="grid grid-cols-4 gap-4 p-4 font-[Poppins]">
            {flavourOptions.map((flavour) => (
                <Button
                    key={flavour.id}
                    text={flavour.name}
                    imageSrc={flavour.icon}
                    price={flavour.price}
                    altText={`${flavour.name} flavour`}
                    onClick={() => onSelectFlavour(flavour.id)}
                />
            ))}
        </div>
    );
};

export default Flavours;