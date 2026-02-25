export default function Escudo() {
  return (
    <svg
      className="mx-auto mb-4 block relative z-10"
      style={{
        width: '80px', height: '80px',
        filter: 'drop-shadow(0 4px 16px rgba(200,16,46,0.6))',
        animation: 'flotar 3s ease-in-out infinite alternate'
      }}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo del escudo blanco */}
      <path d="M50 5 L90 20 L90 65 C90 85 70 100 50 108 C30 100 10 85 10 65 L10 20 Z" fill="white" />
      {/* Cruz decorativa en rojo */}
      <line x1="22" y1="28" x2="78" y2="82" stroke="#C8102E" strokeWidth="3.5" opacity="0.4" />
      <line x1="78" y1="28" x2="22" y2="82" stroke="#C8102E" strokeWidth="3.5" opacity="0.4" />
      {/* Texto SFC */}
      <text x="50" y="65" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif"
        fontSize="24" fill="#C8102E" letterSpacing="1" fontWeight="bold">
        SFC
      </text>
      {/* Borde rojo del escudo */}
      <path d="M50 5 L90 20 L90 65 C90 85 70 100 50 108 C30 100 10 85 10 65 L10 20 Z"
        fill="none" stroke="#C8102E" strokeWidth="2.5" opacity="0.7" />
    </svg>
  )
}
