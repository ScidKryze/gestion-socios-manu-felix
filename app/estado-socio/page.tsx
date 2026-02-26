'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import PageHeader from '@/app/components/PageHeader'
import { getCurrentSeason } from '@/lib/authHelpers'

// Datos de ejemplo — conectar a Supabase cuando esté listo
const socioData = {
  numeroSocio: '00347',
  nombre: 'Juan',
  apellidos: 'García Fernández',
  tipo: 'Adulto',
  cuota: '45.00',
  fechaInscripcion: '15/09/2025',
  pagado: true,
}

function Label({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '2px', color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>
      {text}
    </p>
  )
}

export default function EstadoSocioPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setReady(true)
    })
  }, [router])

  if (!ready) return null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      <PageHeader title="Estado del Socio" subtitle="Información de tu cuenta" />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-2xl">

          {/* Tarjeta principal */}
          <div className="rounded-2xl border-2 p-6 sm:p-8" style={{
            borderColor: '#C8102E',
            boxShadow: '0 10px 40px rgba(200,16,46,0.15)',
            animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}>

            {/* Nº socio + Tipo */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <Label text="Número de Socio" />
                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(32px, 5vw, 42px)', letterSpacing: '6px', color: '#C8102E', lineHeight: 1, fontWeight: 700 }}>
                  #{socioData.numeroSocio}
                </p>
              </div>
              <div className="text-right">
                <Label text="Tipo" />
                <div className="inline-block px-4 py-2 rounded-lg" style={{
                  background: socioData.tipo === 'Adulto' ? '#C8102E' : '#FFB800',
                  fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px',
                  letterSpacing: '3px', color: 'white', fontWeight: 700,
                }}>
                  {socioData.tipo}
                </div>
              </div>
            </div>

            {/* Nombre */}
            <div className="mb-6">
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '18px', color: '#1a1a1a', fontWeight: 600, letterSpacing: '0.5px' }}>
                {socioData.nombre} {socioData.apellidos}
              </p>
            </div>

            {/* Separador */}
            <div className="mb-6" style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #C8102E 20%, #C8102E 80%, transparent)', opacity: 0.3 }} />

            {/* Cuota + Fecha */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <Label text="Cuota Mensual" />
                <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 4vw, 36px)', letterSpacing: '2px', color: '#1a1a1a', lineHeight: 1, fontWeight: 700 }}>
                  {socioData.cuota}€
                </p>
              </div>
              <div className="text-right">
                <Label text="Fecha de Inscripción" />
                <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '16px', color: '#1a1a1a', fontWeight: 700, letterSpacing: '1px' }}>
                  {socioData.fechaInscripcion}
                </p>
              </div>
            </div>

            {/* Estado de pago */}
            <div>
              <Label text="Estado" />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg" style={{
                background: socioData.pagado ? '#10B981' : '#EF4444',
                fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px',
                letterSpacing: '3px', color: 'white', fontWeight: 700,
              }}>
                {socioData.pagado ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Pagado
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    No Pagado
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Botón volver */}
          <div className="mt-8 text-center">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all"
              style={{ borderColor: '#C8102E', background: 'transparent', fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '3px', color: '#C8102E', fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#C8102E'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8102E' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              Volver al inicio
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em', fontSize: '1rem', color: '#C8102E', opacity: 0.7 }}>
              Sevillista seré hasta la muerte • Sevilla FC
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-3" style={{ background: '#0a0a0a', fontFamily: 'Bebas Neue, sans-serif', fontSize: '12px', letterSpacing: '4px', color: 'rgba(200,16,46,0.6)' }}>
        Temporada {getCurrentSeason()}
      </div>
    </div>
  )
}
