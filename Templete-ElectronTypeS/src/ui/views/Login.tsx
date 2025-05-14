// components/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../assets/Logo.png";
import "./../Login.css";
import { login } from "../services/usersServices";
import { useMutation } from "@tanstack/react-query";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate= useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email: username, password });
    };

    const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
        login(email, password),
    onSuccess: (data) => {
        console.log("Login successful:", data);
        if (data.role === "admin") {
           navigate('/dashboard');
        } else if (data.role === "client") {
            navigate('/userhome');
        } else if (data.role === "cashier") {
            navigate('/cashier');
        }

        localStorage.setItem('token', data.access_token); 
    },
    onError: (error: Error) => {
        alert(error.message);
    },
    });

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white via-stone-100 to-stone-300">
            <div className="w-full max-w-md bg-white/90 p-8 rounded-2xl shadow-lg flex flex-col items-center border border-stone-100">
                {/* Círculo para el logotipo dentro del recuadro */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-white shadow flex items-center justify-center border-4 border-stone-200 -mt-16">
                        <img src={Logo} alt="Logo" className="rounded-full size-28 object-contain" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-2 text-stone-700">Bienvenido a MKS</h1>
                <p className="text-stone-400 mb-6">Accede a tu cuenta para continuar</p>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-5">
                        {/* Usuario */}
                        <div className="relative">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                                className="w-full py-3 border border-stone-200 bg-white/80 rounded-lg px-3 focus:outline-none focus:border-stone-400 hover:shadow transition placeholder-transparent text-stone-700"
                                placeholder="Nombre de Usuario"
                                autoComplete="username"
                            />
                            <label
                                htmlFor="username"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-stone-400 bg-white/80 px-1
                                    ${usernameFocused || username
                                        ? "text-xs -top-2.5"
                                        : "text-base top-2"}
                                `}
                            >
                                Nombre de Usuario
                            </label>
                        </div>
                        {/* Contraseña */}
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className="w-full py-3 border border-stone-200 bg-white/80 rounded-lg px-3 pr-10 focus:outline-none focus:border-stone-400 hover:shadow transition placeholder-transparent text-stone-700"
                                placeholder="Contraseña"
                                autoComplete="current-password"
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-3 transition-all duration-200 pointer-events-none text-stone-400 bg-white/80 px-1
            ${passwordFocused || password
                                        ? "text-xs -top-2.5"
                                        : "text-base top-2"}
        `}
                            >
                                Contraseña
                            </label>
                            <button
                                type="button"
                                
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 z-10"
                                onClick={() => setShowPassword(v => !v)}
                            >
                                {showPassword ? (
                                    // Ojo abierto
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (
                                    // Ojo cerrado
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.956 9.956 0 012.293-3.95m3.25-2.61A9.956 9.956 0 0112 5c4.478 0 8.269 2.943 9.543 7a9.956 9.956 0 01-4.422 5.568M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.364 6.364L19.778 4.222" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full py-3 font-semibold text-white bg-stone-400 hover:bg-stone-500 rounded-lg transition shadow flex items-center justify-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                              {loginMutation.isPending ? 'Cargando...' : 'Iniciar Sesión'}

                        </button>
                    </div>
                </form>
                <div className="mt-6 flex flex-col items-center w-full">
                    <div className="flex gap-4 text-sm text-stone-500 font-medium">
                        <Link to="/dashboard" className="hover:underline">Ir a Dashboard</Link>
                        <span className="text-stone-300">|</span>
                        <Link to="/userhome" className="hover:underline">Ir a Userhome</Link>
                        <span className="text-stone-300">|</span>
                        <Link to="/cashier" className="hover:underline">Ir a Cashier</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;