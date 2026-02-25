'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import AuthLayout from '@/app/components/AuthLayout'
import Escudo from '@/app/components/Escudo'
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
    repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px),
    repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)
  `
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
      <div
        className="w-full bg-white rounded-xl overflow-hidden"
        style={{
          maxWidth: '430px',
          boxShadow: '0 40px 100px rgba(80,0,10,0.55), 0 0 0 2px rgba(255,255,255,0.25)',
          animation: 'entrada 0.85s cubic-bezier(0.16, 1, 0.3, 1) both'
        }}
      >
        {/* HEADER ROJO */}
        <div className="px-10 py-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(170deg, #8B0A1E 0%, #C8102E 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={headerPattern} />
          <div className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />
          <Escudo />
          <h1 className="relative z-10"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', letterSpacing: '5px', color: 'white', textTransform: 'uppercase', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Peña Sevillista
          </h1>
          <p className="relative z-10 mt-1.5"
            style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 600 }}>
            Área privada de socios
          </p>
        </div>

        {/* FORMULARIO */}
        <div className="px-10 py-9">

          {/* Email */}
          <div className="mb-5" style={{ animation: 'fadeUp 0.6s 0.18s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <label className="block mb-2"
              style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700 }}>
              Usuario
            </label>
            <div className="relative">
              <IconUser />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico" required
                className="w-full pl-11 pr-3.5 py-3.5 rounded-md border-2 outline-none transition-all"
                style={inputStyle} onFocus={onInputFocus} onBlur={(e) => onInputBlur(e)} />
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-2" style={{ animation: 'fadeUp 0.6s 0.28s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <label className="block mb-2"
              style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700 }}>
              Contraseña
            </label>
            <div className="relative">
              <IconLock />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full pl-11 pr-3.5 py-3.5 rounded-md border-2 outline-none transition-all"
                style={inputStyle} onFocus={onInputFocus} onBlur={(e) => onInputBlur(e)} />
            </div>
          </div>

          {error && (
            <p className="text-center text-sm mb-2" style={{ color: '#C8102E', fontFamily: 'Barlow, sans-serif' }}>
              {error}
            </p>
          )}

          {/* ¿Olvidaste contraseña? */}
          <div className="text-right mb-7" style={{ animation: 'fadeUp 0.6s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <a href="#"
              style={{ fontSize: '11px', letterSpacing: '1px', color: '#AAAAAA', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C8102E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#AAAAAA')}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón ACCEDER */}
          <button onClick={handleLogin} disabled={loading}
            className="w-full py-4 rounded-md border-none cursor-pointer transition-all"
            style={{
              background: 'linear-gradient(135deg, #C8102E 0%, #E8193F 100%)',
              color: 'white', fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '5px',
              boxShadow: '0 6px 20px rgba(200,16,46,0.35)',
              animation: 'fadeUp 0.6s 0.38s cubic-bezier(0.16, 1, 0.3, 1) both',
              opacity: loading ? 0.75 : 1,
            }}
            onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(200,16,46,0.45)' } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,16,46,0.35)' }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}>
            {loading ? 'Accediendo...' : 'Acceder'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6" style={{ animation: 'fadeUp 0.6s 0.43s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <div className="flex-1 h-px" style={{ background: '#E8E8E8' }} />
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#BBBBBB', textTransform: 'uppercase', fontWeight: 600 }}>¿Nuevo socio?</span>
            <div className="flex-1 h-px" style={{ background: '#E8E8E8' }} />
          </div>

          {/* Link registro */}
          <div className="text-center" style={{ fontSize: '13px', color: '#999', animation: 'fadeUp 0.6s 0.48s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            ¿Aún no eres miembro?{' '}
            <Link href="/registro"
              style={{ color: '#C8102E', textDecoration: 'none', fontWeight: 700 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#8B0A1E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C8102E')}>
              Solicita tu alta aquí
            </Link>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="text-center py-2.5"
          style={{ background: '#8B0A1E', fontFamily: 'Bebas Neue, sans-serif', fontSize: '12px', letterSpacing: '4px', color: 'rgba(255,255,255,0.45)' }}>
          Temporada {getCurrentSeason()}
        </div>
      </div>
    </AuthLayout>
  )
}
