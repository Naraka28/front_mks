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
        <span className="text-slate-600 font-medium text-xl">+ ${price.toFixed(2)}</span>
    ) : null;

    return (
        <div className="flex flex-col items-center p-6 rounded-3xl w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between w-full">
                <button
                    onClick={onDecrement}
                    className={`size-12 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200
                        ${count === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-slate-500 text-white hover:bg-slate-600'}`}
                    disabled={count === 0}
                >
                    -
                </button>

                <div className="flex flex-col gap-1 px-4 font-[Poppins] flex-1 text-center min-h-[60px] justify-center items-center">
                    <div className="leading-tight">
                        <span className="text-gray-800 font-bold text-2xl">{label}</span>
                        {count > 0 && <span className="text-gray-600 font-medium text-xl"> × {count}</span>}
                    </div>

                    <div className="h-6">
                        {priceComponent}
                    </div>
                </div>

                <button
                    onClick={onIncrement}
                    className="size-12 flex-shrink-0 flex items-center justify-center bg-slate-500 text-white text-xl rounded-full hover:bg-slate-600 transition-colors duration-200"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default CounterButton;
