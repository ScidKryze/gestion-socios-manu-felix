'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { getCurrentSeason } from '@/lib/authHelpers'

type Socio = {
  id: string
  nombre: string
  apellido: string
  fecha_nacimiento: string | null
  numero_socio: number | null
  fecha_alta: string | null
  pagado: boolean
  rol: string | null
  aprobado: boolean
  cuota: number | null
  tipo: string | null
}

function Label({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '2px', color: '#666', textTransform: 'uppercase' as const, fontWeight: 600, margin: '0 0 4px' }}>
      {text}
    </p>
  )
}

function formatFecha(fecha: string | null): string {
  if (!fecha) return '—'
  const [year, month, day] = fecha.split('-')
  return `${day}/${month}/${year}`
}

function formatNumeroSocio(num: number | null): string {
  if (num === null) return '—'
  return String(num).padStart(5, '0')
}

export default function EstadoSocioPage() {
  const router = useRouter()
  const [socio, setSocio] = useState<Socio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarSocio = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data, error: dbError } = await supabase
        .from('socios')
        .select('*')
        .eq('id', user.id)
        .single()

      if (dbError || !data) {
        setError('No se encontraron tus datos de socio. Contacta con la peña.')
        setLoading(false)
        return
      }

      setSocio(data as Socio)
      setLoading(false)
    }
    cargarSocio()
  }, [router])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '4px', color: '#C8102E' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');`}</style>
      Cargando...
    </div>
  )

  // ── ERROR → vuelve a /dashboard ──
  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', gap: '16px', padding: '20px', textAlign: 'center' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');`}</style>
      <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '3px', color: '#C8102E' }}>{error}</p>
      <Link href="/dashboard" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', letterSpacing: '3px', color: '#C8102E', border: '2px solid #C8102E', padding: '10px 24px', borderRadius: '10px', textDecoration: 'none' }}>
        ← Volver al inicio
      </Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(170deg, #0a0a0a 0%, #1a1a1a 100%)', padding: '36px 20px 40px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(45deg, rgba(200,16,46,0.06) 0px, rgba(200,16,46,0.06) 1px, transparent 1px, transparent 18px), repeating-linear-gradient(-45deg, rgba(200,16,46,0.06) 0px, rgba(200,16,46,0.06) 1px, transparent 1px, transparent 18px)` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #C8102E, transparent)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/penialogo.jpg" alt="Logo Peña" style={{ width: '70px', height: '70px', objectFit: 'contain', display: 'block', margin: '0 auto 14px', mixBlendMode: 'screen', filter: 'brightness(1.1)' }} />
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 5vw, 42px)', color: 'white', letterSpacing: '5px', margin: '0 0 6px' }}>Estado del Socio</h1>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', margin: 0, fontWeight: 600 }}>Información de tu cuenta</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <div style={{ borderRadius: '16px', border: '2px solid #C8102E', padding: '32px', boxShadow: '0 10px 40px rgba(200,16,46,0.15)', animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' }}>

            {/* FILA 1 — Nº socio + Tipo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <Label text="Número de Socio" />
                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 5vw, 42px)', letterSpacing: '6px', color: '#C8102E', lineHeight: 1, fontWeight: 700, margin: 0 }}>
                  #{formatNumeroSocio(socio!.numero_socio)}
                </p>
              </div>
              {socio!.tipo && (
                <div style={{ textAlign: 'right' }}>
                  <Label text="Tipo" />
                  <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '8px', background: socio!.tipo === 'Adulto' ? '#C8102E' : '#FFB800', fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '3px', color: 'white', fontWeight: 700, textTransform: 'uppercase' }}>
                    {socio!.tipo}
                  </div>
                </div>
              )}
            </div>

            {/* FILA 2 — Nombre completo */}
            <div style={{ marginBottom: '16px' }}>
              <Label text="Nombre Completo" />
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '20px', color: '#1a1a1a', fontWeight: 700, letterSpacing: '0.5px', margin: 0 }}>
                {socio!.nombre} {socio!.apellido}
              </p>
            </div>

            {/* FILA 3 — Rol + Aprobado */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {socio!.rol && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', background: '#1a1a1a', fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', letterSpacing: '2px', color: 'white', textTransform: 'uppercase' }}>
                  👤 {socio!.rol}
                </div>
              )}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', background: socio!.aprobado ? '#059669' : '#D97706', fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', letterSpacing: '2px', color: 'white' }}>
                {socio!.aprobado ? '✓ Aprobado' : '⏳ Pendiente aprobación'}
              </div>
            </div>

            {/* Separador */}
            <div style={{ height: '2px', marginBottom: '24px', background: 'linear-gradient(90deg, transparent, #C8102E 20%, #C8102E 80%, transparent)', opacity: 0.3 }} />

            {/* FILA 4 — Cuota + Fecha alta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <Label text="Cuota" />
                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(26px, 4vw, 34px)', letterSpacing: '2px', color: '#1a1a1a', lineHeight: 1, fontWeight: 700, margin: 0 }}>
                  {socio!.cuota !== null ? `${socio!.cuota}€` : '—'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Label text="Fecha de Alta" />
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#1a1a1a', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>
                  {formatFecha(socio!.fecha_alta)}
                </p>
              </div>
            </div>

            {/* FILA 5 — Fecha nacimiento */}
            {socio!.fecha_nacimiento && (
              <div style={{ marginBottom: '24px' }}>
                <Label text="Fecha de Nacimiento" />
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#1a1a1a', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>
                  {formatFecha(socio!.fecha_nacimiento)}
                </p>
              </div>
            )}

            {/* FILA 6 — Estado de pago */}
            <div>
              <Label text="Estado de pago" />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', background: socio!.pagado ? '#10B981' : '#EF4444', fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', letterSpacing: '3px', color: 'white', fontWeight: 700 }}>
                {socio!.pagado ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Pagado
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    No Pagado
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Botón volver → /dashboard ── */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '12px', border: '2px solid #C8102E', background: 'transparent', fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '3px', color: '#C8102E', fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#C8102E'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8102E' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              Volver al inicio
            </Link>
          </div>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em', fontSize: '1rem', color: '#C8102E', opacity: 0.7, margin: 0 }}>
              Sevillista seré hasta la muerte • Sevilla FC
            </p>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div style={{ textAlign: 'center', padding: '12px', background: '#0a0a0a', fontFamily: 'Bebas Neue, sans-serif', fontSize: '12px', letterSpacing: '4px', color: 'rgba(200,16,46,0.6)' }}>
        Temporada {getCurrentSeason()}
      </div>
    </div>
  )
}