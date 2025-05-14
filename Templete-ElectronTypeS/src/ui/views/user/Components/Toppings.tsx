import { useState } from 'react';
import CounterButton from '../auxiliaryComponents/CounterButton.tsx';
import { useQuery } from '@tanstack/react-query';
import { getAllowedToppings } from '../../../services/productsServices.ts';
import { Topping } from '../../../services/toppingsServices.ts';
import { SyncLoader } from 'react-spinners';

interface ToppingsProps {
    onSelectionChange: (selectedToppings: Record<number, number>) => void;
    productId: number;
}


const Toppings: React.FC<ToppingsProps> = ({ onSelectionChange, productId }) => {
    const [counters, setCounters] = useState<Record<number, number>>({});

    const { data: toppingOptions = [], isLoading, error } = useQuery<Topping[]>({
        queryKey: ["toppings", productId],
        queryFn: () => getAllowedToppings(productId),
    });    

    if (isLoading) return <div className='flex mt-32 items-center justify-center w-full h-full'><SyncLoader color="#5d1abc" margin={8} size={36} speedMultiplier={1}/></div>;
    if (error) return <p>Error loading toppings</p>;

    const handleDecrement = (id: number) => {
        const newCount = Math.max((counters[id] || 0) - 1, 0);
        const newCounters = { ...counters, [id]: newCount };
        setCounters(newCounters);
        onSelectionChange(newCounters);
    };

    const handleIncrement = (id: number) => {
        const topping = toppingOptions.find(t => t.id === id);
        if (!topping) return;

        const currentCount = counters[id] || 0;
        if (currentCount < topping.max_quantity) {
            const newCounters = { ...counters, [id]: currentCount + 1 };
            setCounters(newCounters);
            onSelectionChange(newCounters);
        }
    };

    const calculatePrice = (id: number) => {
        const quantity = counters[id] || 0;
        const topping = toppingOptions.find(t => t.id === id);
        if (!topping) return 0;

        const freeQuantity = topping.free_quantity || 0;
        const pricePerUnit = topping.price || 0;

        return quantity <= freeQuantity ? 0 : (quantity - freeQuantity) * pricePerUnit;
    };

    return (
        <div className="max-w-4xl mx-auto rounded-3xl bg-white shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-4 p-6">
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
