import React, { useEffect, useState } from "react";

const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleString('es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getCajaStatus = () => {
  const now = new Date();
  const hour = now.getHours();
  // Caja abierta de 7:00 a 21:59, cerrada de 22:00 a 6:59
  if (hour >= 7 && hour < 22) {
    return { status: "Caja abierta", color: "text-green-600" };
  } else {
    return { status: "Caja cerrada", color: "text-red-600" };
  }
};

export const UniversalTopBar = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedDate());
  const [caja, setCaja] = useState(getCajaStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedDate());
      setCaja(getCajaStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-lg block text-blac font-semibold">{currentTime}</span>
          <span className={`text-sm block font-medium ${caja.color}`}>{caja.status}</span>
        </div>
      </div>
    </div>
  );
};
