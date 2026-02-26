'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import PageHeader from '@/app/components/PageHeader'
import { getCurrentSeason } from '@/lib/authHelpers'

const tarjetas = [
  {
    href: '/estado-socio',
    title: 'Ver estado',
    desc: 'Consulta tu estado de socio, cuotas y datos personales',
    delay: '0.2s',
    icon: (
      <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/noticias',
    title: 'Ver noticias',
    desc: 'Lee las últimas noticias y novedades de la peña',
    delay: '0.3s',
    icon: (
      <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
  },
]

function Tarjeta({ href, title, desc, delay, icon }: typeof tarjetas[0]) {
  return (
    <Link
      href={href}
      style={{
        display: 'block', textDecoration: 'none',
        background: 'linear-gradient(135deg, #ffffff 0%, #FFF5F6 100%)',
        border: '2px solid #C8102E', borderRadius: '12px',
        padding: '32px 24px', textAlign: 'center',
        boxShadow: '0 4px 20px rgba(200,16,46,0.15)',
        transition: 'all 0.3s',
        animation: `fadeUp 0.6s ${delay} cubic-bezier(0.16, 1, 0.3, 1) both`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 12px 35px rgba(200,16,46,0.25)'
        el.style.background = 'linear-gradient(135deg, #C8102E 0%, #E8193F 100%)'
        ;(el.querySelector('.t') as HTMLElement).style.color = '#fff'
        ;(el.querySelector('.d') as HTMLElement).style.color = 'rgba(255,255,255,0.85)'
        ;(el.querySelector('.i') as HTMLElement).style.color = '#fff'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 4px 20px rgba(200,16,46,0.15)'
        el.style.background = 'linear-gradient(135deg, #ffffff 0%, #FFF5F6 100%)'
        ;(el.querySelector('.t') as HTMLElement).style.color = '#C8102E'
        ;(el.querySelector('.d') as HTMLElement).style.color = '#666'
        ;(el.querySelector('.i') as HTMLElement).style.color = '#C8102E'
      }}
    >
      <div className="i flex justify-center mb-4" style={{ color: '#C8102E', transition: 'color 0.3s' }}>
        {icon}
      </div>
      <h3 className="t" style={{
        fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px',
        letterSpacing: '4px', color: '#C8102E', textTransform: 'uppercase',
        marginBottom: '0.5rem', transition: 'color 0.3s',
      }}>
        {title}
      </h3>
      <p className="d" style={{
        fontFamily: 'Barlow, sans-serif', fontSize: '13px',
        color: '#666', lineHeight: '1.5', transition: 'color 0.3s',
      }}>
        {desc}
      </p>
    </Link>
  )
}

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
      <PageHeader title="Portal del socio" subtitle="Bienvenido a tu área personal" />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-4xl">

          <div className="text-center mb-8 sm:mb-12" style={{ animation: 'fadeUp 0.6s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(22px, 4vw, 28px)', letterSpacing: '4px', color: '#C8102E', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ¿Qué deseas hacer?
            </h2>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#666', letterSpacing: '1px' }}>
              Selecciona una opción para continuar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {tarjetas.map((t) => <Tarjeta key={t.href} {...t} />)}
          </div>

          {/* Cerrar sesión */}
          <div className="mt-10 text-center" style={{ animation: 'fadeUp 0.6s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <button onClick={handleLogout} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Barlow, sans-serif', fontSize: '12px',
              letterSpacing: '2px', color: '#AAA', textTransform: 'uppercase', fontWeight: 600,
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C8102E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#AAA')}
            >
              Cerrar sesión
            </button>
          </div>

          <div className="mt-8 text-center" style={{ animation: 'fadeUp 0.6s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
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
