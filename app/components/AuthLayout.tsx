export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #8B0A1E 0%, #C8102E 50%, #D91030 100%)' }}
    >
      {/* Patrón diagonal tipo camiseta */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 1px, transparent 1px, transparent 24px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 1px, transparent 1px, transparent 24px)
          `
        }}
      />
      {/* Resplandor blanco central */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '50%', left: '50%',
          width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 70%)',
          animation: 'pulso 4s ease-in-out infinite alternate'
        }}
      />
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
        {/* Texto decorativo */}
        <p
          className="mt-8 text-white opacity-80 text-center"
          style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em', fontSize: '1rem' }}
        >
          Sevillista seré hasta la muerte • Sevilla FC
        </p>
      </div>
    </div>
  )
}
