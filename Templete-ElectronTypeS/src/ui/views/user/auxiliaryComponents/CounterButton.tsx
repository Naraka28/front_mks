import React from 'react';

interface CounterButtonProps {
    count: number;
    label: string;
    price?: number;
    onIncrement: () => void;
    onDecrement: () => void;
}



const CounterButton: React.FC<CounterButtonProps> = ({ count, label, price, onIncrement, onDecrement }) => {
    let priceComponent = null;
    if (price && price > 0) {
        priceComponent = <span className="text-[#333333] font-medium text-xl font-[Poppins]">+ $ {price}.00</span>;
    }

    return (
        <div className="flex flex-col items-center p-4 rounded-3xl w-full">
            <div className="flex items-center justify-between w-full">
                <button
                    onClick={onDecrement}
                    className="size-12 flex-shrink-0 flex items-center justify-center bg-gray-400 text-white text-lg rounded-full hover:bg-gray-500 transition"
                    disabled={count === 0}
                >
                    -
                </button>

                <div className="flex flex-col gap-2 px-4 font-[Poppins] flex-1 text-center min-h-[60px] justify-center items-center">
                    <div className="leading-tight">
                        <span className="text-[#333333] font-bold text-2xl">{label}</span>
                        {count > 0 && <span className="text-[#333333] font-medium text-xl"> × {count}</span>}
                    </div>

                    <div className="h-6">  {/* Contenedor con altura fija para el precio */}
                        {priceComponent}
                    </div>
                </div>

                <button
                    onClick={onIncrement}
                    className="size-12 flex-shrink-0 flex items-center justify-center bg-gray-400 text-white text-lg rounded-full hover:bg-gray-500 transition"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default CounterButton;
