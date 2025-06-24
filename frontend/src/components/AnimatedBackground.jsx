export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-10 left-1/4 w-72 h-72 bg-black rounded-full opacity-30 filter blur-3xl animate-float border-4 border-gray-700"
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-96 h-96 bg-gray-900 rounded-full opacity-25 filter blur-2xl animate-floatReverse"
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-800 rounded-full opacity-28 filter blur-3xl animate-float"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}
