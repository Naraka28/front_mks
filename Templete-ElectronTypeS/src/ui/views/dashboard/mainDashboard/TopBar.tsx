import React, { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";

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

export const TopBar = () => {

  const [currentTime, setCurrentTime] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedDate());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">Que Rollo Plebes!</span>
          <span className="text-xs block text-stone-500">
            {currentTime}
          </span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Últimos 6 Meses</span>
        </button>
      </div>
    </div>
  );
};