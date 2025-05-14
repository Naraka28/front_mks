import React, { useState } from "react";

interface TicketActionsProps {
    onPay: (paymentAmount: number) => void;
    onCancel: () => void;
    disabled?: boolean;
    ticketNumber?: number;
    total?: number;
}

const TicketActions: React.FC<TicketActionsProps> = ({
    onPay,
    onCancel,
    disabled,
    ticketNumber,
    total = 0,
}) => {
    const [modal, setModal] = useState<null | "pay" | "cancel">(null);
    const [payment, setPayment] = useState<string>("");

    const paymentNumber = Number(payment) || 0;
    const cambio = paymentNumber > total ? paymentNumber - total : 0;

    const handleConfirm = () => {
        if (modal === "pay") onPay(paymentNumber);
        if (modal === "cancel") onCancel();
        setModal(null);
        setPayment("");
    };

    // Estilos de botón reutilizables
    const btnPay =
        "px-7 py-3 border border-green-400 text-green-700 rounded-xl font-semibold bg-white shadow-md hover:bg-green-50 hover:border-green-600 transition disabled:opacity-50";
    const btnCancel =
        "px-7 py-3 border border-red-400 text-red-600 rounded-xl font-semibold bg-white shadow-md hover:bg-red-50 hover:border-red-600 transition disabled:opacity-50";
    const btnGray =
        "px-7 py-3 border border-stone-300 text-stone-700 rounded-xl font-semibold bg-white shadow-md hover:bg-stone-100 transition";

    return (
        <div className="flex gap-4 mt-4">
            <button
                onClick={() => setModal("pay")}
                disabled={disabled}
                className={btnPay}
            >
                Pagar Ticket
            </button>
            <button
                onClick={() => setModal("cancel")}
                disabled={disabled}
                className={btnCancel}
            >
                Cancelar Ticket
            </button>
            {modal === "pay" && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col gap-6 border border-green-200 relative animate-fade-in">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                            onClick={() => setModal(null)}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold text-green-700 mb-2 text-center tracking-tight">
                            Pago de Ticket
                        </h2>
                        <div className="flex flex-col gap-3 text-base text-stone-700">
                            <div className="flex justify-between">
                                <span className="text-stone-500">Ticket</span>
                                <span className="font-mono font-semibold">
                                    #{ticketNumber ?? "—"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-500">Total</span>
                                <span className="font-mono font-semibold text-green-700">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-stone-500">Monto pagado</span>
                                <input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    value={payment}
                                    onChange={(e) => setPayment(e.target.value)}
                                    className="border border-green-200 rounded-md px-2 py-1 w-24 text-right focus:outline-none focus:ring-2 focus:ring-green-300 font-mono bg-stone-50"
                                    placeholder="0.00"
                                    autoFocus
                                />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-500">Cambio</span>
                                <span
                                    className={
                                        cambio > 0
                                            ? "text-green-600 font-bold font-mono"
                                            : "text-stone-400 font-mono"
                                    }
                                >
                                    ${cambio.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleConfirm}
                                disabled={paymentNumber < total}
                                className={btnPay + " flex-1"}
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setModal(null)}
                                className={btnGray + " flex-1"}
                            >
                                Cancelar
                            </button>
                        </div>
                        {paymentNumber < total && (
                            <div className="text-red-500 text-xs mt-1 text-center">
                                El monto debe ser igual o mayor al total.
                            </div>
                        )}
                    </div>
                </div>
            )}
            {modal === "cancel" && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col gap-6 border border-red-200 relative animate-fade-in">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                            onClick={() => setModal(null)}
                            aria-label="Cerrar"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold text-red-600 mb-2 text-center tracking-tight">
                            Cancelar Ticket
                        </h2>
                        <p className="text-base text-stone-600 text-center mb-2">
                            ¿Estás seguro que deseas cancelar este ticket?
                        </p>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleConfirm}
                                className={btnCancel + " flex-1"}
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setModal(null)}
                                className={btnGray + " flex-1"}
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketActions;