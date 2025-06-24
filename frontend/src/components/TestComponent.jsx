// src/components/TestComponent.jsx
import React from 'react';

export default function TestComponent() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-48 h-48 bg-purple-600 rounded-full animate-bounce flex items-center justify-center text-white text-xl font-bold">
        ¡Hola!
      </div>
    </div>
  );
}
