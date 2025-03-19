import React from "react";

export const ReportLowerCards = () => {
    return (
        <div className="grid grid-cols-12 gap-4 col-span-12">
            <Card
                title="Ganancias Netas"
                value="$618,916.69"
                period="Desde 1 Enero - 31 Diciembre"
                className="col-span-8"
            />
            <Card
                title="Gastos Totales"
                value="$217,469.86"
                period="Desde 1 Enero - 31 Diciembre"
                className="col-span-4"
            />
        </div>
    );
};

const Card = ({
    title,
    value,
    period,
    className = "",
}: {
    title: string;
    value: string;
    period: string;
    className?: string;
}) => {
    return (
        <div className={`p-4 rounded border border-stone-300 ${className}`}>
            <div className="flex mb-8 items-start justify-between">
                <div>
                    <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
                    <p className="text-3xl font-semibold">{value}</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500">{period}</p>
                <svg id='Download_from_the_Cloud_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0' />


                    <g transform="matrix(0.63 0 0 0.63 12 12)" >
                        <path
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeDashoffset: 0,
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 4,
                                fill: "rgb(0,0,0)",
                                fillRule: "nonzero",
                                opacity: 1
                            }}
                            transform="translate(-16, -16)"
                            d="M 16 5 C 11.882813 5 8.640625 8.128906 8.1875 12.125 C 6.394531 12.425781 4.941406 13.644531 4.34375 15.34375 C 1.882813 16.054688 0 18.25 0 21 C 0 24.324219 2.675781 27 6 27 L 26 27 C 29.324219 27 32 24.324219 32 21 C 32 19.238281 31.144531 17.664063 29.90625 16.5625 C 29.675781 13.046875 26.871094 10.246094 23.34375 10.0625 C 22.140625 7.132813 19.378906 5 16 5 Z M 16 7 C 18.761719 7 20.972656 8.769531 21.75 11.28125 L 21.96875 12 L 23 12 C 25.753906 12 28 14.246094 28 17 L 28 17.5 L 28.40625 17.8125 C 29.351563 18.519531 30 19.734375 30 21 C 30 23.277344 28.277344 25 26 25 L 6 25 C 3.722656 25 2 23.277344 2 21 C 2 18.980469 3.449219 17.414063 5.28125 17.09375 L 5.9375 16.96875 L 6.0625 16.3125 C 6.363281 14.964844 7.554688 14 9 14 L 10 14 L 10 13 C 10 9.628906 12.628906 7 16 7 Z M 15 12 L 15 18.5625 L 12.71875 16.28125 L 11.28125 17.71875 L 15.28125 21.71875 L 16 22.40625 L 16.71875 21.71875 L 20.71875 17.71875 L 19.28125 16.28125 L 17 18.5625 L 17 12 Z"
                            strokeLinecap="round"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
};
