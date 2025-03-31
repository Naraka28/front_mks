import React from 'react';

interface CounterButtonProps {
    count: number;
    label: string;
    onIncrement: () => void;
    onDecrement: () => void;
}

const CounterButton: React.FC<CounterButtonProps> = ({ count, label, onIncrement, onDecrement }) => {
    return (
        <div className="flex flex-col items-center bg-neutral-100 p-5 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between w-full">
                <button
                    onClick={onDecrement}
                    className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white text-lg rounded-full hover:bg-gray-500 transition"
                    disabled={count === 0}
                >
                    -
                </button>
                <span className="font-semibold text-xl flex-1 text-center">{label}</span>
                <button
                    onClick={onIncrement}
                    className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white text-lg rounded-full hover:bg-gray-500 transition"
                >
                    +
                </button>
            </div>
            {count > 0 && (
                <span className="mt-2 text-base font-medium text-gray-700">{count}</span>
            )}
        </div>
    );
};

export default CounterButton;
