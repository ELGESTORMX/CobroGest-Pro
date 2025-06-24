import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Estados para login
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados para registro
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNombreCompleto, setRegNombreCompleto] = useState('');
  const [regTelefono, setRegTelefono] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.msg || 'Error en login');
      }

      localStorage.setItem('token', data.token);
      alert('Login exitoso');
      // Aquí puedes redirigir a dashboard o página principal
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (regPassword !== regConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          nombreCompleto: regNombreCompleto,
          telefono: regTelefono,
          password: regPassword,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.msg || 'Error en registro');
      }

      alert('Registro exitoso, ahora puedes iniciar sesión');
      setIsLogin(true);
      setRegUsername('');
      setRegEmail('');
      setRegNombreCompleto('');
      setRegTelefono('');
      setRegPassword('');
      setRegConfirmPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50">
      <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              isLogin ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Iniciar Sesión
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              !isLogin ? 'border-b-4 border-green-600 text-green-600' : 'text-gray-600'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="loginUsername" className="block text-gray-700 font-semibold mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="loginUsername"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-gray-700 font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
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
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="regUsername" className="block text-gray-700 font-semibold mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="regUsername"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="regEmail" className="block text-gray-700 font-semibold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="regEmail"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="regNombreCompleto" className="block text-gray-700 font-semibold mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="regNombreCompleto"
                value={regNombreCompleto}
                onChange={(e) => setRegNombreCompleto(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="regTelefono" className="block text-gray-700 font-semibold mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="regTelefono"
                value={regTelefono}
                onChange={(e) => setRegTelefono(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="regPassword" className="block text-gray-700 font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="regPassword"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="regConfirmPassword" className="block text-gray-700 font-semibold mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="regConfirmPassword"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
            >
              Registrarse
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
