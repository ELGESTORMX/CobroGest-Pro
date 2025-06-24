import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
      navigate('/dashboard');  // Redirige al dashboard después del login
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
      <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Formulario */}
        <div className="md:w-1/2 p-6">
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

        {/* Información inspiradora */}
        <div className="mt-8 md:mt-0 md:w-1/2 bg-blue-50 p-8 rounded-lg text-gray-800 order-last md:order-none">
          <h3 className="text-3xl font-extrabold mb-6 text-blue-700">¿Por qué elegir CobroGest Pro?</h3>
          <p className="mb-6 text-lg leading-relaxed">
            En un mundo donde la gestión financiera puede ser compleja y abrumadora, CobroGest Pro te ofrece la solución integral para mantener tus finanzas bajo control, sin estrés ni sorpresas.
          </p>
          <h4 className="text-2xl font-semibold mb-4">Optimiza tu tiempo y recursos</h4>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>Automatiza el seguimiento de cobros y pagos para que nunca pierdas un ingreso ni olvides una factura.</li>
            <li>Recibe alertas diarias personalizadas por email con las personas a las que debes cobrar y los pagos que debes realizar.</li>
            <li>Gestiona tus servicios y sus vencimientos, desde suscripciones hasta facturas recurrentes, todo en un solo lugar.</li>
          </ul>
          <h4 className="text-2xl font-semibold mb-4">Toma decisiones financieras inteligentes</h4>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>Visualiza reportes claros y actualizados para entender tu flujo de caja y estado financiero.</li>
            <li>Planifica con anticipación gracias a recordatorios y análisis que te ayudan a evitar retrasos y multas.</li>
            <li>Concentra toda la información relevante para que puedas enfocarte en hacer crecer tu negocio o gestionar mejor tus finanzas personales.</li>
          </ul>
          <p className="text-lg font-semibold text-blue-800">
            Únete a cientos de usuarios que ya disfrutan de la tranquilidad y eficiencia que solo CobroGest Pro puede ofrecer.  
            Regístrate hoy y comienza a transformar la forma en que manejas tus finanzas.
          </p>
        </div>
      </div>
    </div>
  );
}
