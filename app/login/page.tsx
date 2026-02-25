'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import AuthLayout from '@/app/components/AuthLayout'
import { getCurrentSeason, inputStyle, onInputFocus, onInputBlur } from '@/lib/authHelpers'

function IconUser() {
  return (
    <svg className="absolute left-3.5 top-1/2 w-4 h-4 pointer-events-none transition-colors"
      style={{ transform: 'translateY(-50%)', color: '#CBCBCB' }}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg className="absolute left-3.5 top-1/2 w-4 h-4 pointer-events-none transition-colors"
      style={{ transform: 'translateY(-50%)', color: '#CBCBCB' }}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const headerPattern = {
  backgroundImage: `
    repeating-linear-gradient(45deg, rgba(200,16,46,0.08) 0px, rgba(200,16,46,0.08) 1px, transparent 1px, transparent 18px),
    repeating-linear-gradient(-45deg, rgba(200,16,46,0.08) 0px, rgba(200,16,46,0.08) 1px, transparent 1px, transparent 18px)
  `
}

// Imagen lateral con mixBlendMode para eliminar fondo negro
function SideImage({ src, alt, side }: { src: string; alt: string; side: 'left' | 'right' }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        mixBlendMode: 'screen',
        filter: side === 'left'
          ? 'drop-shadow(-6px 0 20px rgba(200,16,46,0.6))'
          : 'drop-shadow(6px 0 20px rgba(200,16,46,0.6)) brightness(1.1)',
        animation: `fadeUp 1s ${side === 'left' ? '0.2s' : '0.35s'} cubic-bezier(0.16, 1, 0.3, 1) both`,
      }}
    />
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Usuario o contraseña incorrectos')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <style>{`
        .side-col { display: none; }
        @media (min-width: 1024px) { .side-col { display: block; } }
      `}</style>

      {/* Fila: gitana | card | 7copas */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '980px',
        gap: '0',
      }}>

        {/* GITANA — izquierda */}
        <div className="side-col" style={{ width: '190px', flexShrink: 0, marginRight: '36px' }}>
          <SideImage src="/gitana.png" alt="Gitana" side="left" />
        </div>

        {/* CARD */}
        <div style={{
          width: '100%',
          maxWidth: '430px',
          flexShrink: 0,
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(80,0,10,0.55), 0 0 0 2px rgba(255,255,255,0.25)',
          animation: 'entrada 0.85s cubic-bezier(0.16, 1, 0.3, 1) both',
          zIndex: 10,
        }}>

          {/* HEADER NEGRO con logo real */}
          <div style={{
            padding: '32px 40px 28px',
            textAlign: 'center',
            background: 'linear-gradient(170deg, #0a0a0a 0%, #1a1a1a 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...headerPattern }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, transparent, #C8102E, transparent)'
            }} />

            {/* Logo real de la peña — usa mixBlendMode screen para que el fondo negro desaparezca */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/penialogo.jpg"
              alt="Logo Peña Sevillista"
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto 14px',
                mixBlendMode: 'screen',
                filter: 'brightness(1.1)',
                animation: 'flotar 3s ease-in-out infinite alternate',
                position: 'relative',
                zIndex: 1,
              }}
            />

            <h1 style={{
              position: 'relative', zIndex: 1, margin: 0,
              fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', letterSpacing: '5px',
              color: 'white', textTransform: 'uppercase', lineHeight: 1,
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}>
              Peña Sevillista
            </h1>
            <p style={{
              position: 'relative', zIndex: 1, marginTop: '6px', marginBottom: 0,
              fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '3px',
              color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 600,
            }}>
              Área privada de socios
            </p>
          </div>

          {/* FORMULARIO */}
          <div style={{ padding: '36px 40px 40px' }}>

            {/* Email */}
            <div style={{ marginBottom: '20px', animation: 'fadeUp 0.6s 0.18s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700 }}>
                Usuario
              </label>
              <div style={{ position: 'relative' }}>
                <IconUser />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico" required
                  style={{ ...inputStyle, width: '100%', paddingLeft: '44px', paddingRight: '14px', paddingTop: '14px', paddingBottom: '14px', borderRadius: '6px', border: '2px solid #EBEBEB', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                  onFocus={onInputFocus} onBlur={(e) => onInputBlur(e)} />
              </div>
            </div>

            {/* Contraseña */}
            <div style={{ marginBottom: '8px', animation: 'fadeUp 0.6s 0.28s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700 }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <IconLock />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  style={{ ...inputStyle, width: '100%', paddingLeft: '44px', paddingRight: '14px', paddingTop: '14px', paddingBottom: '14px', borderRadius: '6px', border: '2px solid #EBEBEB', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                  onFocus={onInputFocus} onBlur={(e) => onInputBlur(e)} />
              </div>
            </div>

            {error && (
              <p style={{ color: '#C8102E', fontFamily: 'Barlow, sans-serif', fontSize: '14px', textAlign: 'center', marginBottom: '8px' }}>
                {error}
              </p>
            )}

            {/* ¿Olvidaste? */}
            <div style={{ textAlign: 'right', marginBottom: '28px', animation: 'fadeUp 0.6s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
              <a href="#" style={{ fontSize: '11px', letterSpacing: '1px', color: '#AAAAAA', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 600 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C8102E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#AAAAAA')}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón ACCEDER */}
            <button onClick={handleLogin} disabled={loading}
              style={{
                width: '100%', padding: '17px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #C8102E 0%, #E8193F 100%)',
                color: 'white', fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '5px',
                boxShadow: '0 6px 20px rgba(200,16,46,0.35)', transition: 'all 0.3s',
                opacity: loading ? 0.75 : 1,
                animation: 'fadeUp 0.6s 0.38s cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(200,16,46,0.45)' } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,16,46,0.35)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}>
              {loading ? 'Accediendo...' : 'Acceder'}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0', animation: 'fadeUp 0.6s 0.43s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
              <div style={{ flex: 1, height: '1px', background: '#E8E8E8' }} />
              <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#BBBBBB', textTransform: 'uppercase', fontWeight: 600 }}>¿Nuevo socio?</span>
              <div style={{ flex: 1, height: '1px', background: '#E8E8E8' }} />
            </div>

            {/* Link registro */}
            <div style={{ textAlign: 'center', fontSize: '13px', color: '#999', animation: 'fadeUp 0.6s 0.48s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
              ¿Aún no eres miembro?{' '}
              <Link href="/registro" style={{ color: '#C8102E', textDecoration: 'none', fontWeight: 700 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#8B0A1E')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C8102E')}>
                Solicita tu alta aquí
              </Link>
            </div>
          </div>

          {/* BARRA INFERIOR */}
          <div style={{
            textAlign: 'center', padding: '10px',
            background: '#0a0a0a', fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '12px', letterSpacing: '4px', color: 'rgba(200,16,46,0.6)'
          }}>
            Temporada {getCurrentSeason()}
          </div>
        </div>

        {/* LOGO 7 COPAS — derecha */}
        <div className="side-col" style={{ width: '170px', flexShrink: 0, marginLeft: '36px' }}>
          <SideImage src="/logo-7copas.png" alt="7 De Copas" side="right" />
        </div>

      </div>
    </AuthLayout>
  )
}
