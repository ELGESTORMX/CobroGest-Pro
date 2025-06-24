import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Error en login');
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); // Cambia a la ruta que quieras tras login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50">
      <div className="flex flex-col md:flex-row flex-grow max-w-6xl mx-auto my-12 p-6 md:p-12 bg-white rounded-lg shadow-lg">
        <div className="md:w-1/2 flex flex-col justify-center px-6">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left text-gray-800">Administrador Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 px-6 text-gray-700">
          <h3 className="text-2xl font-bold mb-6">¿Qué puedes hacer?</h3>
          <ul className="list-disc list-inside space-y-3 mb-8">
            <li>Gestionar cobros: registra clientes y servicios, recibe alertas de cobros pendientes y atrasados.</li>
            <li>Controlar pagos: administra tus servicios propios y recibe recordatorios de vencimientos.</li>
            <li>Notificaciones automáticas: recibe emails diarios con las personas que debes cobrar y los pagos que debes realizar.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-6">¿Cómo funciona?</h3>
          <ol className="list-decimal list-inside space-y-3">
            <li>Registra tus clientes y servicios para llevar un control detallado.</li>
            <li>Recibe recordatorios diarios vía email sobre cobros y pagos próximos o atrasados.</li>
            <li>Visualiza tu estado financiero con reportes para tomar decisiones acertadas.</li>
          </ol>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-300 py-6 text-center text-sm sm:text-base mt-auto">
        <p>© 2025 CobroGest Pro. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
