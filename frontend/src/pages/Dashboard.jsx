import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, DollarSign, CreditCard, Settings, LogOut } from 'lucide-react'; // Importa íconos de Lucide React

function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview'); // Estado para la sección activa
  const [userName, setUserName] = useState('Usuario'); // Estado para el nombre del usuario

  // Efecto para simular la carga del nombre del usuario (puedes reemplazarlo con una llamada a tu API)
  useEffect(() => {
    // Aquí podrías hacer una llamada a tu backend para obtener los datos del usuario
    // Por ejemplo:
    // const fetchUserData = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     const response = await fetch('http://localhost:5000/api/user/profile', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //     if (response.ok) {
    //       const data = await response.json();
    //       setUserName(data.username || 'Usuario');
    //     } else {
    //       // Manejar error o token inválido, quizás forzar logout
    //       handleLogout();
    //     }
    //   } catch (error) {
    //     console.error("Error al obtener datos del usuario:", error);
    //     handleLogout();
    //   }
    // };
    // fetchUserData();

    // Placeholder para el nombre de usuario
    setUserName('CobroGest User');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    navigate('/login'); // Redirigir a la página de login
  };

  // Función para renderizar el contenido de la sección activa
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Visión General</h3>
            <p className="text-gray-600">Aquí podrás ver un resumen de tus métricas clave: total de deudas, deudas pendientes, pagos recientes, etc.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Deudas Pendientes</p>
                <p className="text-3xl font-bold text-blue-700">$5,400.00</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Pagos Recibidos (mes)</p>
                <p className="text-3xl font-bold text-green-700">$1,250.00</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">Clientes Activos</p>
                <p className="text-3xl font-bold text-yellow-700">75</p>
              </div>
            </div>
          </div>
        );
      case 'clients':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Clientes</h3>
            <p className="text-gray-600">Administra la información de tus clientes, añade nuevos o edita existentes.</p>
            {/* Tabla de clientes o listado */}
            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span>Cliente A - $120.00</span>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm">Ver Detalle</button>
              </li>
              <li className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span>Cliente B - $500.00</span>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm">Ver Detalle</button>
              </li>
            </ul>
          </div>
        );
      case 'debts':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Deudas</h3>
            <p className="text-gray-600">Registra y da seguimiento a las deudas pendientes de tus clientes.</p>
             {/* Listado de deudas */}
             <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-red-50">
                <span>Deuda #001 (Cliente A) - $120.00 - Vencida</span>
                <button className="text-red-600 hover:text-red-800 text-sm">Marcar como pagada</button>
              </li>
              <li className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span>Deuda #002 (Cliente B) - $500.00 - Pendiente</span>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm">Marcar como pagada</button>
              </li>
            </ul>
          </div>
        );
      case 'payments':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Historial de Pagos</h3>
            <p className="text-gray-600">Consulta el historial de todos los pagos recibidos.</p>
            {/* Listado de pagos */}
            <ul className="mt-4 space-y-2">
              <li className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span>Pago Cliente A - $120.00 (2024-07-22)</span>
              </li>
              <li className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <span>Pago Cliente C - $75.00 (2024-07-21)</span>
              </li>
            </ul>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Configuración</h3>
            <p className="text-gray-600">Ajusta las configuraciones de tu cuenta y de la aplicación.</p>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="appName">
                  Nombre de la Aplicación
                </label>
                <input
                  type="text"
                  id="appName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue="CobroGest Pro"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-indigo-800 to-purple-900 text-white p-6 flex flex-col justify-between shadow-lg rounded-r-xl">
        <div>
          <div className="text-3xl font-extrabold text-white mb-10 flex items-center justify-center">
            <DollarSign className="w-8 h-8 mr-2" /> CobroGest Pro
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('overview')}
                  className={`flex items-center w-full p-3 rounded-lg transition duration-200 ease-in-out ${
                    activeSection === 'overview' ? 'bg-indigo-700 shadow-md text-white' : 'hover:bg-indigo-700 hover:text-white text-indigo-200'
                  }`}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Visión General
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('clients')}
                  className={`flex items-center w-full p-3 rounded-lg transition duration-200 ease-in-out ${
                    activeSection === 'clients' ? 'bg-indigo-700 shadow-md text-white' : 'hover:bg-indigo-700 hover:text-white text-indigo-200'
                  }`}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Clientes
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('debts')}
                  className={`flex items-center w-full p-3 rounded-lg transition duration-200 ease-in-out ${
                    activeSection === 'debts' ? 'bg-indigo-700 shadow-md text-white' : 'hover:bg-indigo-700 hover:text-white text-indigo-200'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mr-3" />
                  Deudas
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('payments')}
                  className={`flex items-center w-full p-3 rounded-lg transition duration-200 ease-in-out ${
                    activeSection === 'payments' ? 'bg-indigo-700 shadow-md text-white' : 'hover:bg-indigo-700 hover:text-white text-indigo-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Pagos
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('settings')}
                  className={`flex items-center w-full p-3 rounded-lg transition duration-200 ease-in-out ${
                    activeSection === 'settings' ? 'bg-indigo-700 shadow-md text-white' : 'hover:bg-indigo-700 hover:text-white text-indigo-200'
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Configuración
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sección de usuario y logout */}
        <div className="mt-8 pt-4 border-t border-indigo-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-indigo-100 font-medium">{userName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-indigo-200 hover:bg-red-700 hover:text-white transition duration-200 ease-in-out"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Bienvenido, <span className="text-indigo-600">{userName}!</span>
          </h1>
          {/* Aquí puedes añadir más elementos a la cabecera si es necesario */}
        </header>

        {/* Contenido dinámico de las secciones */}
        <section className="bg-gray-100 p-6 rounded-xl shadow-inner">
          {renderSectionContent()}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
