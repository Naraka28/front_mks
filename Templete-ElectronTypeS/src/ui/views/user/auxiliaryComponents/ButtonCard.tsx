interface ButtonProps {
    text: string;
    imageSrc: string;
    altText: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, imageSrc, altText, onClick }) => {
    return (
        <button
            className="bg-[#FAF9F6] rounded-2xl p-4 gap-4 shadow-sm hover:shadow-md transition-all border border-[#E8E8E8] flex flex-col items-center hover:bg-[#f6f4ed]"
            onClick={onClick}
        >
            <img
                src={imageSrc}
                alt={altText || "Button icon"}
                className="size-32 object-contain rounded-md"
            />
            <span className="text-[#333333] font-bold text-xl font-[Poppins]">
                {text}
            </span>
        </button>
    );
};

export default Button;