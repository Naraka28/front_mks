interface ButtonProps {
    text: string;
    imageSrc: string;
    price?: number;
    altText: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, imageSrc, price, altText, onClick }) => {

    let priceComponent = null;
    if (price && price > 0) {
        priceComponent = <span className="text-stone-500 font-semibold text-lg">{`+ $${price}.00`}</span>;
    }
    return (
        <button
            className="bg-white/90 rounded-2xl p-8 gap-4 shadow-lg hover:shadow-xl transition-all border border-stone-100 flex flex-col items-center hover:bg-white"
            onClick={onClick}
        >
            <div className="w-28 h-28 flex items-center justify-center bg-white rounded-xl border-stone-100 mb-2">
                <img
                    src={imageSrc}
                    alt={altText || "Button icon"}
                    className="w-32 h-32 object-contain rounded-lg"
                />
            </div>
            <span className="text-stone-700 font-bold text-lg text-center">{text}</span>
            {priceComponent}
        </button>
    );
};

export default Button;