'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import PageHeader from '@/app/components/PageHeader'
import { getCurrentSeason } from '@/lib/authHelpers'

const noticias = [
  { id: 1, titulo: 'Próximo partido: Sevilla FC vs Real Betis', fecha: '10/03/2026', informacion: 'Entradas disponibles para los socios. El derbi sevillano se disputará en el Estadio Ramón Sánchez-Pizjuán. Los socios pueden recoger sus entradas desde el lunes en las taquillas oficiales.', categoria: 'Partido' },
  { id: 2, titulo: 'Asamblea General de Socios', fecha: '28/02/2026', informacion: 'Se convoca asamblea general ordinaria para el próximo viernes a las 19:00 horas en la sede de la peña. Todos los socios están invitados a participar y votar sobre las propuestas presentadas.', categoria: 'Asamblea' },
  { id: 3, titulo: 'Viaje organizado a Valencia', fecha: '25/02/2026', informacion: 'La peña organiza un viaje en autobús para el partido del Sevilla FC en Valencia. Plazas limitadas. Inscripciones abiertas hasta el día 5 de marzo. Precio especial para socios: 35€ (incluye transporte).', categoria: 'Viaje' },
  { id: 4, titulo: 'Nueva camiseta conmemorativa', fecha: '20/02/2026', informacion: 'Ya está disponible la nueva camiseta conmemorativa del 25 aniversario de la peña. Edición limitada exclusiva para socios. Recógela en la sede presentando tu carnet de socio.', categoria: 'Merchandising' },
  { id: 5, titulo: 'Cena de Hermandad 2026', fecha: '15/02/2026', informacion: 'Reserva tu plaza para la tradicional cena de hermandad que se celebrará el próximo sábado 20 de marzo. Precio para socios: 25€. Menú completo con bebidas incluidas. ¡No te lo pierdas!', categoria: 'Evento' },
  { id: 6, titulo: 'Descuentos en la tienda oficial', fecha: '12/02/2026', informacion: 'Los socios de la peña disfrutarán de un 15% de descuento en la tienda oficial del Sevilla FC durante todo el mes de marzo. Presenta tu carnet de socio en caja para aplicar el descuento.', categoria: 'Descuento' },
]

const categoryColors: Record<string, string> = {
  Partido: '#C8102E', Asamblea: '#1a1a1a', Viaje: '#0066CC',
  Merchandising: '#8B0A1E', Evento: '#FFB800', Descuento: '#10B981',
}

export default function NoticiasPage() {
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
      <PageHeader title="Noticias de la Peña" subtitle="Últimas novedades y comunicados" />

      <div className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">

          {/* Grid de noticias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia, index) => (
              <div
                key={noticia.id}
                className="rounded-2xl overflow-hidden border-2 transition-all"
                style={{
                  borderColor: '#E5E5E5',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  animation: `fadeUp 0.6s ${0.1 + index * 0.05}s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(200,16,46,0.2)'
                  e.currentTarget.style.borderColor = '#C8102E'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'
                  e.currentTarget.style.borderColor = '#E5E5E5'
                }}
              >
                {/* Header tarjeta */}
                <div className="px-6 py-4 flex justify-between items-center" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%)', borderBottom: '2px solid #F0F0F0' }}>
                  <div className="px-3 py-1 rounded-full" style={{ background: categoryColors[noticia.categoria] || '#666', fontFamily: 'Bebas Neue, sans-serif', fontSize: '13px', letterSpacing: '2px', color: 'white', fontWeight: 700 }}>
                    {noticia.categoria}
                  </div>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: '#999', fontWeight: 600, letterSpacing: '0.5px' }}>
                    {noticia.fecha}
                  </p>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(18px, 3vw, 22px)', letterSpacing: '2px', color: '#C8102E', lineHeight: 1.2, fontWeight: 700, textTransform: 'uppercase' }}>
                    {noticia.titulo}
                  </h3>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#555', lineHeight: '1.6', letterSpacing: '0.3px' }}>
                    {noticia.informacion}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 flex items-center gap-2" style={{ background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                    Publicado el {noticia.fecha}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón volver */}
          <div className="mt-12 text-center">
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

          <div className="mt-8 text-center" style={{ animation: 'fadeUp 0.6s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
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
