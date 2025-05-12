import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaMugHot, FaCoffee, FaGlassMartini, FaCookie } from "react-icons/fa";

const TYPES = [
    { icon: FaMugHot, name: "Bebida Caliente" },
    { icon: FaCoffee, name: "Cafés" },
    { icon: FaGlassMartini, name: "Bebida Fría" },
    { icon: FaCookie, name: "Postre" },
];

interface SidebarProps {
    onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleSelect = (category: string) => {
        setSelectedCategory(category);
        onSelectCategory(category);
    };

    return (
        <aside className="flex flex-col items-center w-full h-full py-8 px-2 justify-between bg-white/90 rounded-2xl shadow-lg border border-stone-100">
            <FaChevronUp className="text-stone-400 cursor-pointer text-2xl hover:text-stone-600 transition" />

            <div className="flex flex-col items-center gap-6">
                {TYPES.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(item.name)}
                        className={`flex items-center justify-center p-6 border-2 rounded-full transition-all duration-200 shadow
                            ${selectedCategory === item.name
                                ? "bg-white border-stone-400 shadow-lg"
                                : "bg-white/80 border-stone-200 hover:border-stone-400 hover:shadow-md"}
                        `}
                        style={{ minWidth: 72, minHeight: 72 }}
                    >
                        <item.icon
                            className={`text-3xl transition-colors duration-200
                                ${selectedCategory === item.name ? "text-stone-500" : "text-stone-400"}
                            `}
                        />
                    </button>
                ))}
            </div>

            <FaChevronDown className="text-stone-400 cursor-pointer text-2xl hover:text-stone-600 transition" />
        </aside>
    );
};

export default Sidebar;
