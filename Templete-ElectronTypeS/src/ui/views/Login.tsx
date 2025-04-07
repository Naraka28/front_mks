// components/Login.tsx
import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    return (
        <div>
            <div className="antialiased bg-slate-200 min-h-screen flex items-center justify-center">
                <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <h1 className="text-4xl font-medium mb-3">Inicio de Sesión</h1>
                    <p className="text-slate-500">Hola, Bienvenido 👋</p>

                    <form className="my-10">
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="username">
                                <p className="font-medium text-slate-700 pb-2">Nombre de Usuario</p>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Ingrese su nombre de usuraio"
                                />
                            </label>
                            <label htmlFor="password">
                                <p className="font-medium text-slate-700 pb-2">Contraseña</p>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Ingrese su contraseña"
                                />
                            </label>
                            <div className="flex flex-row justify-between items-center">
                                <label htmlFor="remember" className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                                    />
                                    <span>Recordar Información</span>
                                </label>
                                <a href="#" className="font-medium text-indigo-600">
                                    Olvidé mi contraseña
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Iniciar Sesión</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Link to="/dashboard">Go to Dashboard </Link>
            <Link to="/userhome">Go to userhome </Link>
            <Link to="/cashier">Go to cashier </Link>
        </div>
    );
};

export default Login;
