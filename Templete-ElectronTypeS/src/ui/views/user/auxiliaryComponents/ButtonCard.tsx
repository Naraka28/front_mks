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
        priceComponent = <span className="text-[#333333] font-medium text-xl font-[Poppins]">+ $ {price}.00</span>;
    }
    return (
        <button
            className="bg-[#FAF9F6] rounded-2xl p-10 gap-4 shadow-sm hover:shadow-md transition-all border border-[#E8E8E8] flex flex-col items-center hover:bg-[#f6f4ed]"
            onClick={onClick}
        >
            <img
                src={imageSrc}
                alt={altText || "Button icon"}
                className="w-32 h-32 object-contain rounded-md"
            />
            <span className="text-[#333333] font-bold text-xl font-[Poppins]">
                {text}
            </span>
            {priceComponent}
        </button>
    );
};

export default Button;