import Button from "../auxiliaryComponents/ButtonCard";

const tempOptions = [
    { id: 1, name: "Caliente", icon: "/icons/hot.png" },
    { id: 2, name: "Tibio", icon: "/icons/warm.png" },
    { id: 3, name: "Frío", icon: "/icons/cold.png" }
];

interface TemperatureProps {
    onSelectTemp: (id: number) => void;
}

const Temperature: React.FC<TemperatureProps> = ({ onSelectTemp }) => {
    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {tempOptions.map(temp => (
                <Button
                    key={temp.id}
                    text={temp.name}
                    imageSrc={temp.icon}
                    altText={`${temp.name} size`}
                    onClick={() => onSelectTemp(temp.id)}
                />
            ))}
        </div>
    );
};

export default Temperature;