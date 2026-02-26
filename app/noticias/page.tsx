'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import PageHeader from '@/app/components/PageHeader'
import { getCurrentSeason } from '@/lib/authHelpers'

type Noticia = {
  identificacion: string
  titulo: string
  contenido: string
  fecha: string
  imagen: string | null
}

function formatFecha(fecha: string): string {
  if (!fecha) return '—'
  const date = new Date(fecha)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

function Modal({ noticia, onClose }: { noticia: Noticia; onClose: () => void }) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Bloquear scroll del fondo
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease both',
        }}
      />

      {/* Modal centrado */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 51,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          pointerEvents: 'all',
          animation: 'modalUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
          border: '2px solid #C8102E',
        }}>

          {/* Imagen completa */}
          {noticia.imagen ? (
            <div style={{ width: '100%', maxHeight: '280px', overflow: 'hidden', borderRadius: '18px 18px 0 0', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                style={{ width: '100%', height: '280px', objectFit: 'contain', background: '#0a0a0a', display: 'block' }}
              />
            </div>
          ) : (
            <div style={{
              width: '100%', height: '120px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a0a0f 50%, #C8102E22 100%)',
              borderRadius: '18px 18px 0 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}

          {/* Contenido */}
          <div style={{ padding: '28px 28px 24px' }}>

            {/* Fecha */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                {formatFecha(noticia.fecha)}
              </span>
            </div>

            {/* Título */}
            <h2 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(22px, 4vw, 30px)',
              letterSpacing: '3px', color: '#C8102E',
              lineHeight: 1.2, fontWeight: 700,
              textTransform: 'uppercase',
              margin: '0 0 16px',
            }}>
              {noticia.titulo}
            </h2>

            {/* Separador */}
            <div style={{ height: '2px', marginBottom: '16px', background: 'linear-gradient(90deg, #C8102E 0%, transparent 100%)', opacity: 0.3 }} />

            {/* Contenido */}
            <p style={{
              fontFamily: 'Barlow, sans-serif', fontSize: '15px',
              color: '#444', lineHeight: '1.7', letterSpacing: '0.3px',
              margin: 0,
            }}>
              {noticia.contenido}
            </p>
          </div>

          {/* Botón cerrar — flecha → */}
          <div style={{ padding: '0 28px 28px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 24px', borderRadius: '10px',
                border: '2px solid #C8102E', background: 'transparent',
                fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px',
                letterSpacing: '3px', color: '#C8102E', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#C8102E'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8102E' }}
            >
              Cerrar
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default function NoticiasPage() {
  const router = useRouter()
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null)

  useEffect(() => {
    const cargarNoticias = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data, error: dbError } = await supabase
        .from('noticias')
        .select('*')
        .order('fecha', { ascending: false })

      if (dbError) {
        setError('No se pudieron cargar las noticias. Inténtalo más tarde.')
        setLoading(false)
        return
      }

      setNoticias((data as Noticia[]) || [])
      setLoading(false)
    }

    cargarNoticias()
  }, [router])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '4px', color: '#C8102E' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');`}</style>
      Cargando noticias...
    </div>
  )

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
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap');
        @keyframes fadeUp   { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalUp  { from { opacity: 0; transform: translateY(40px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <PageHeader title="Noticias de la Peña" subtitle="Últimas novedades y comunicados" />

      <div className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">

          {noticias.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', letterSpacing: '3px', color: '#ccc' }}>
                No hay noticias publicadas todavía
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia, index) => (
              <div
                key={noticia.identificacion ?? index}
                onClick={() => setNoticiaSeleccionada(noticia)}
                className="rounded-2xl overflow-hidden border-2 flex flex-col"
                style={{
                  borderColor: '#E5E5E5',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  animation: `fadeUp 0.6s ${0.1 + index * 0.05}s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
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
                {/* Imagen recortada en tarjeta */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', flexShrink: 0 }}>
                  {noticia.imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a1a 0%, #2a0a0f 50%, #C8102E22 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #C8102E, #E8193F)' }} />
                </div>

                {/* Badge fecha flotante */}
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-16px', right: '16px', background: '#0a0a0a', color: 'white', fontFamily: 'Barlow, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', padding: '4px 12px', borderRadius: '999px', border: '2px solid #C8102E' }}>
                    {formatFecha(noticia.fecha)}
                  </div>
                </div>

                {/* Texto tarjeta */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(18px, 3vw, 22px)', letterSpacing: '2px', color: '#C8102E', lineHeight: 1.2, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 10px' }}>
                    {noticia.titulo}
                  </h3>
                  {/* Texto recortado con ellipsis a 3 líneas */}
                  <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#555', lineHeight: '1.6', margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {noticia.contenido}
                  </p>
                </div>

                {/* Footer con "Ver más" */}
                <div className="px-6 py-3 flex items-center justify-between" style={{ background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: 0 }}>
                      {formatFecha(noticia.fecha)}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '13px', letterSpacing: '2px', color: '#C8102E', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Ver más
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Botón volver */}
          <div className="mt-12 text-center">
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all"
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

      {/* Modal */}
      {noticiaSeleccionada && (
        <Modal
          noticia={noticiaSeleccionada}
          onClose={() => setNoticiaSeleccionada(null)}
        />
      )}
    </div>
  )
}