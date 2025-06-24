import React from "react";
import { useNavigate } from "react-router-dom";

function AnimatedBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      viewBox="0 0 1440 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#635bff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0e0727" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="1440" height="720" fill="url(#glow)" />
      <g className="animate-fade-in-slow">
        <circle cx="200" cy="150" r="5" fill="#92ffde" opacity="0.8" />
        <circle cx="430" cy="100" r="7" fill="#e0aaff" opacity="0.7" />
        <circle cx="900" cy="180" r="6" fill="#ffb9f6" opacity="0.7" />
        <circle cx="1200" cy="400" r="4" fill="#89b4ff" opacity="0.7" />
        <circle cx="1050" cy="600" r="8" fill="#a6ffcb" opacity="0.7" />
        <circle cx="300" cy="600" r="7" fill="#fff" opacity="0.4" />
        <line x1="200" y1="150" x2="430" y2="100" stroke="#635bff" strokeWidth="2" opacity="0.2" />
        <line x1="430" y1="100" x2="900" y2="180" stroke="#b988f7" strokeWidth="2" opacity="0.2" />
        <line x1="900" y1="180" x2="1200" y2="400" stroke="#92ffde" strokeWidth="2" opacity="0.18" />
        <line x1="1200" y1="400" x2="1050" y2="600" stroke="#89b4ff" strokeWidth="2" opacity="0.18" />
        <line x1="1050" y1="600" x2="300" y2="600" stroke="#a6ffcb" strokeWidth="2" opacity="0.15" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 15 -10; 0 0"
          dur="7s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

export default function HeroSection({ onShowVideo }) {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-x-hidden bg-black px-2 sm:px-4 py-10 sm:py-16">
      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center">
        {/* Logo/Nombre */}
        <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-wide drop-shadow-lg mb-4 select-none">
          CobroGest Pro
        </span>
        {/* Eslogan */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Gestiona tus cobros y pagos con recordatorios automáticos
        </h1>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-5">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl
                       hover:bg-indigo-500 transition duration-300 transform hover:scale-105"
          >
            Launch App
          </button>
          {/* Si quieres mostrar el botón de video, descomenta abajo */}
          {/* <button
            onClick={onShowVideo}
            className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-indigo-400 text-indigo-200 font-bold text-lg rounded-full shadow-xl
                       hover:bg-indigo-400 hover:text-black transition duration-300 transform hover:scale-105"
          >
            ¿Qué es Web3 y DeFi?
          </button> */}
        </div>

      </div>
      {/* Animación CSS para el fondo SVG */}
      <style>{`
        @keyframes fade-in-slow {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in-slow { animation: fade-in-slow 2s ease-out forwards; }
      `}</style>
    </section>
  );
}
