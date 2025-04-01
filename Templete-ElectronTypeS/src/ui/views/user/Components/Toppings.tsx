import { useState } from 'react';
import CounterButton from '../auxiliaryComponents/CounterButton.tsx';

const toppingOptions = [
    { id: 1, name: "Azúcar", price: 2, freecuantity: 1, maxcuantity: 10 },
    { id: 2, name: "Canela", price: 1, freecuantity: 2, maxcuantity: 10 },
    { id: 3, name: "Mascabado", price: 3, freecuantity: 3, maxcuantity: 10 },
    { id: 4, name: "Svetia", price: 2.5, freecuantity: 3, maxcuantity: 10 },
    { id: 5, name: "Fruta", price: 1, freecuantity: 1, maxcuantity: 10 },
    { id: 6, name: "Nutella", price: 6, freecuantity: 1, maxcuantity: 10 },
    { id: 7, name: "Shot", price: 3, freecuantity: 1, maxcuantity: 10 },
    { id: 8, name: "Splenda", price: 1, freecuantity: 1, maxcuantity: 10 }
];

interface ToppingsProps {
    onSelectionChange: (selectedToppings: Record<number, number>) => void;
}

const Toppings: React.FC<ToppingsProps> = ({ onSelectionChange }) => {
    const [counters, setCounters] = useState<Record<number, number>>({});

    // Removed duplicate handleIncrement function

    const handleDecrement = (id: number) => {
        const newCounters = {
            ...counters,
            [id]: Math.max((counters[id] || 0) - 1, 0)
        };
        setCounters(newCounters);
        onSelectionChange(newCounters);
    };

    const calculatePrice = (id: number) => {
        const quantity = counters[id] || 0;
        const topping = toppingOptions.find(topping => topping.id === id);
        if (!topping) return 0;

        const freeQuantity = topping.freecuantity || 0;
        const pricePerUnit = topping.price || 0;

        if (quantity <= freeQuantity) {
            return 0;
        } else {
            return (quantity - freeQuantity) * pricePerUnit;
        }
    };

    const handleIncrement = (id: number) => {
        const topping = toppingOptions.find(topping => topping.id === id);
        if (!topping) return;

        const currentCount = counters[id] || 0;
        if (currentCount < topping.maxcuantity) {
            const newCounters = { ...counters, [id]: currentCount + 1 };
            setCounters(newCounters);
            onSelectionChange(newCounters);
        }
    };
    
    return (
        <div className=" max-w-3xl mx-auto rounded-3xl shadow-2xl">
            <div className="grid grid-cols-2 gap-2 p-4">
                {toppingOptions.map(topping => (
                    <CounterButton
                        key={topping.id}
                        label={topping.name}
                        count={counters[topping.id] || 0}
                        price={calculatePrice(topping.id)}
                        onIncrement={() => handleIncrement(topping.id)}
                        onDecrement={() => handleDecrement(topping.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Toppings;