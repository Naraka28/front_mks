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

export const UniversalTopBar = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedDate());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const cajaStatus = "Caja abierta";

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-lg block text-blac font-semibold">{currentTime}</span>
          <span className="text-sm block text-green-600 font-medium">{cajaStatus}</span>
        </div>
      </div>
    </div>
  );
};
