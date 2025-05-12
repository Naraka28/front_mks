import React from 'react';

interface CounterButtonProps {
    count: number;
    label: string;
    price?: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const CounterButton: React.FC<CounterButtonProps> = ({ count, label, price, onIncrement, onDecrement }) => {
    const priceComponent = price && price > 0 ? (
        <span className="text-stone-500 font-semibold text-lg">+ ${price.toFixed(2)}</span>
    ) : null;

    return (
        <div className="flex flex-col items-center p-6 rounded-2xl w-full bg-white/90 shadow-lg border border-stone-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between w-full">
                <button
                    onClick={onDecrement}
                    className={`size-12 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-stone-200 transition-colors duration-200
                        ${count === 0
                            ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300 hover:text-stone-900'}`}
                    disabled={count === 0}
                >
                    <span className="text-2xl font-bold">-</span>
                </button>

                <div className="flex flex-col gap-1 px-4 font-[Poppins] flex-1 text-center min-h-[60px] justify-center items-center">
                    <div className="leading-tight">
                        <span className="text-stone-700 font-bold text-2xl">{label}</span>
                        {count > 0 && <span className="text-stone-500 font-medium text-xl"> × {count}</span>}
                    </div>
                    <div className="h-6">
                        {priceComponent}
                    </div>
                </div>

                <button
                    onClick={onIncrement}
                    className="size-12 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-stone-200 bg-stone-200 text-stone-700 hover:bg-stone-300 hover:text-stone-900 transition-colors duration-200"
                >
                    <span className="text-2xl font-bold">+</span>
                </button>
            </div>
        </div>
    );
}

export default CounterButton;
