import { useState } from 'react';
import CounterButton from '../auxiliaryComponents/CounterButton.tsx';

const toppingOptions = [
    { id: 1, name: "Azúcar" },
    { id: 2, name: "Canela" },
    { id: 3, name: "Mascabado" },
    { id: 4, name: "Svetia" },
    { id: 5, name: "Fruta" },
    { id: 6, name: "Nutella" },
    { id: 7, name: "Shot" },
    { id: 8, name: "Splenda" }
];

interface ToppingsProps {
    onSelectionChange: (selectedToppings: Record<number, number>) => void;
}

const Toppings: React.FC<ToppingsProps> = ({ onSelectionChange }) => {
    const [counters, setCounters] = useState<Record<number, number>>({});

    const handleIncrement = (id: number) => {
        const newCounters = { ...counters, [id]: (counters[id] || 0) + 1 };
        setCounters(newCounters);
        onSelectionChange(newCounters);
    };

    const handleDecrement = (id: number) => {
        const newCounters = {
            ...counters,
            [id]: Math.max((counters[id] || 0) - 1, 0)
        };
        setCounters(newCounters);
        onSelectionChange(newCounters);
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-[#f9f6ee] rounded-3xl shadow-2xl">
            <div className="grid grid-cols-2 gap-6">
                {toppingOptions.map(topping => (
                    <CounterButton
                        key={topping.id}
                        label={topping.name}
                        count={counters[topping.id] || 0}
                        onIncrement={() => handleIncrement(topping.id)}
                        onDecrement={() => handleDecrement(topping.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Toppings;