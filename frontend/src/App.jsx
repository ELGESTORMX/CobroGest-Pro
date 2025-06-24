import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ******************************************************************************
// ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ IMPORTANTE: REVISA ESTO RIGUROSAMENTE !!!!!!!!!!!!!!!!!!!!!!!!!!
// ******************************************************************************
// EL PROBLEMA CASI SIEMPRE ES LA RUTA O EL NOMBRE DEL ARCHIVO/CARPETA.
// Por favor, haz lo siguiente:
//
// 1. Abre tu explorador de archivos (Finder en Mac, Explorador de Archivos en Windows).
// 2. Navega hasta la carpeta 'frontend/src'.
// 3. Dentro de 'src', ¿tienes una carpeta llamada 'pages'?
//    - Si sí, ¿qué archivos hay dentro? ¿'LandingPage.js', 'LandingPage.jsx', 'AuthPage.js', 'AuthPage.jsx'?
//      Asegúrate de que el nombre del archivo (incluyendo mayúsculas/minúsculas y la extensión)
//      coincida exactamente con lo que estás importando.
//
// 4. Dentro de 'src', ¿tienes una carpeta llamada 'components'?
//    - Si sí, ¿qué archivos hay dentro? ¿'Dashboard.js', 'Dashboard.jsx'?
//      Asegúrate de que el nombre del archivo (incluyendo mayúsculas/minúsculas y la extensión)
//      coincida exactamente con lo que estás importando.
//
// 5. Verifica el nombre de este archivo: ¿Es 'App.js' o 'App.jsx'? El error lo llama 'App.jsx'.
//
// ******************************************************************************

// Intenta con estas rutas. Estas son las más comunes si App.jsx está en 'src/':
// Ejemplo: frontend/src/pages/LandingPage.jsx
import LandingPage from './pages/LandingPage';
// Ejemplo: frontend/src/pages/AuthPage.jsx
import AuthPage from './pages/AuthPage';
// Ejemplo: frontend/src/pages/Dashboard.jsx  <-- Si Dashboard está en la carpeta 'pages'
import Dashboard from './pages/Dashboard';

// SI TU DASHBOARD ESTÁ EN 'src/components/' (ej: frontend/src/components/Dashboard.jsx),
// ENTONCES LA LÍNEA DE ARRIBA DEBERÍA SER ESTA:
// import Dashboard from './components/Dashboard';


function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-center text-5xl font-extrabold text-red-600">
        404 - Página no encontrada
      </h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        {/* Si tienes una ruta /register separada, también la incluirías aquí,
            o si AuthPage maneja ambos (login/registro), puedes mantener solo /login */}
        {/* <Route path="/register" element={<AuthPage />} */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard /> {/* Usa el componente Dashboard importado */}
            </PrivateRoute>
          }
        />
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
