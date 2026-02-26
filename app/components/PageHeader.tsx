type Props = { title: string; subtitle: string }

const pattern = {
  backgroundImage: `
    repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px),
    repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)
  `
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div
      className="px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #0a0a0a 0%, #1a1a1a 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={pattern} />
      <div className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent, #C8102E, transparent)' }} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/penialogo.jpg"
        alt="Logo Peña Sevillista"
        style={{
          width: '90px', height: '90px', objectFit: 'contain',
          display: 'block', margin: '0 auto 16px',
          mixBlendMode: 'screen', filter: 'brightness(1.1)',
          animation: 'flotar 3s ease-in-out infinite alternate',
          position: 'relative', zIndex: 1,
        }}
      />

      <h1 className="relative z-10" style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 'clamp(26px, 5vw, 34px)',
        letterSpacing: '6px', color: 'white',
        textTransform: 'uppercase', lineHeight: 1,
        fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.5)', margin: 0,
      }}>
        {title}
      </h1>
      <p className="relative z-10 mt-2" style={{
        fontFamily: 'Barlow, sans-serif',
        fontSize: 'clamp(10px, 2vw, 12px)',
        letterSpacing: '3px', color: 'rgba(255,255,255,0.55)',
        textTransform: 'uppercase', fontWeight: 600, marginBottom: 0,
      }}>
        {subtitle}
      </p>
    </div>
  )
}
