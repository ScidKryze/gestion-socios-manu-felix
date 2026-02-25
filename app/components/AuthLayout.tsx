export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #8B0A1E 0%, #C8102E 50%, #D91030 100%)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Patrón diagonal tipo camiseta — fixed para que no haga scroll */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 1px, transparent 1px, transparent 24px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 1px, transparent 1px, transparent 24px)
          `
        }}
      />

      {/* Resplandor blanco central — fixed */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulso 4s ease-in-out infinite alternate',
        }}
      />

      {/* Contenido centrado — scrolleable */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px',
        }}
      >
        {children}

        {/* Texto decorativo */}
        <p
          style={{
            marginTop: '32px',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '0.1em',
            fontSize: '1rem',
            textAlign: 'center',
          }}
        >
          Sevillista seré hasta la muerte • Sevilla FC
        </p>
      </div>
    </div>
  )
}
