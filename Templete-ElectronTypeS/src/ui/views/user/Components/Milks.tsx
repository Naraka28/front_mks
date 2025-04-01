import Button from "../auxiliaryComponents/ButtonCard";

const milksOptions = [
    { id: 1, name: "Entera", icon: "/icons/whole-milk.png", price: 1.00 },
    { id: 2, name: "Deslactosada", icon: "/icons/lactose-free.png", price: 0.00 },
    { id: 3, name: "Almendras", icon: "/icons/almond-milk.png", price: 2.0 },
    { id: 4, name: "Avena", icon: "/icons/oat-milk.png" }
];

interface MilksProps {
    onSelectMilk: (id: number) => void;
}

const Milks: React.FC<MilksProps> = ({ onSelectMilk }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {milksOptions.map(milks => (
            <Button
            key={milks.id}
            text={milks.name}
            imageSrc={milks.icon}
            altText={`${milks.name} size`}
            price={milks.price}
            onClick={() => onSelectMilk(milks.id)}
            />
            ))}
        </div>
    );
};

export default Milks;