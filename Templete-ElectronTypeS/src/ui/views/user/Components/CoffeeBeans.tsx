import Button from "../auxiliaryComponents/ButtonCard";
import decaf from "./../../../assets/decaf.png";
import cafe from "./../../../assets/cafeine.png";

const CoffeeBeansOptions = [
    { id: 1, name: "Regular", icon: cafe },
    { id: 2, name: "Descafeinado", icon: decaf },
];

interface CoffeeBeansProps {
    onSelectCoffeeBeans: (id: number) => void;
}

const CoffeeBeans: React.FC<CoffeeBeansProps> = ({ onSelectCoffeeBeans }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 p-6 font-[Poppins] ">
            {CoffeeBeansOptions.map((CoffeeBeans) => (
                <Button
                    key={CoffeeBeans.id}
                    text={CoffeeBeans.name}
                    imageSrc={CoffeeBeans.icon}
                    altText={`${CoffeeBeans.name} CoffeeBeans`}
                    onClick={() => onSelectCoffeeBeans(CoffeeBeans.id)}
                />
            ))}
        </div>
    );
};

export default CoffeeBeans;