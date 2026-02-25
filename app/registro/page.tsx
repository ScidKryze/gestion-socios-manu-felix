'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import AuthLayout from '@/app/components/AuthLayout'
import { getCurrentSeason, inputStyle, onInputFocus, onInputBlur } from '@/lib/authHelpers'

function IconUser() {
  return (
    <svg className="absolute left-3.5 top-1/2 w-4 h-4 pointer-events-none" style={{ transform: 'translateY(-50%)', color: '#CBCBCB' }}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg className="absolute left-3.5 top-1/2 w-4 h-4 pointer-events-none" style={{ transform: 'translateY(-50%)', color: '#CBCBCB' }}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg className="absolute left-3.5 top-1/2 w-4 h-4 pointer-events-none" style={{ transform: 'translateY(-50%)', color: '#CBCBCB' }}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg className="absolute left-3.5 top-1/2 w-4 h-4 pointer-events-none" style={{ transform: 'translateY(-50%)', color: '#CBCBCB' }}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const headerPattern = {
  backgroundImage: `
    repeating-linear-gradient(45deg, rgba(200,16,46,0.08) 0px, rgba(200,16,46,0.08) 1px, transparent 1px, transparent 18px),
    repeating-linear-gradient(-45deg, rgba(200,16,46,0.08) 0px, rgba(200,16,46,0.08) 1px, transparent 1px, transparent 18px)
  `
}

type FormData = {
  nombre: string
  apellidos: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

type Errors = Partial<Record<keyof FormData, string>>

export default function RegistroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    nombre: '', apellidos: '', email: '', username: '', password: '', confirmPassword: ''
  })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Errors = {}

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios'
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido'
    if (!formData.username.trim()) newErrors.username = 'El usuario es obligatorio'
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          username: formData.username,
        }
      }
    })

    if (error) {
      setErrors({ email: error.message })
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    }
  }

  const Field = ({
    id, label, type = 'text', placeholder, icon, delay, errorKey
  }: {
    id: keyof FormData, label: string, type?: string, placeholder: string,
    icon: React.ReactNode, delay: string, errorKey?: keyof Errors
  }) => (
    <div style={{ animation: `fadeUp 0.6s ${delay} cubic-bezier(0.16, 1, 0.3, 1) both` }}>
      <label className="block mb-2"
        style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#C8102E', fontWeight: 700 }}>
        {label}
      </label>
      <div className="relative">
        {icon}
        <input
          type={type} id={id} name={id} value={formData[id]} onChange={handleChange}
          placeholder={placeholder} required
          className="w-full pl-11 pr-3.5 py-3.5 rounded-md border-2 outline-none transition-all"
          style={{ ...inputStyle, borderColor: errors[errorKey ?? id] ? '#C8102E' : '#EBEBEB' }}
          onFocus={onInputFocus}
          onBlur={(e) => onInputBlur(e, !!(errors[errorKey ?? id]))}
        />
      </div>
      {errors[errorKey ?? id] && (
        <p className="mt-1.5 text-xs" style={{ color: '#C8102E', fontFamily: 'Barlow, sans-serif' }}>
          {errors[errorKey ?? id]}
        </p>
      )}
    </div>
  )

  if (success) {
    return (
      <AuthLayout>
        <div className="w-full bg-white rounded-xl overflow-hidden text-center p-12"
          style={{ maxWidth: '430px', boxShadow: '0 40px 100px rgba(80,0,10,0.55)', animation: 'entrada 0.85s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
          <div className="text-6xl mb-4">✅</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '4px', color: '#C8102E' }}>
            ¡Solicitud enviada!
          </h2>
          <p className="mt-3 text-sm" style={{ color: '#666', fontFamily: 'Barlow, sans-serif' }}>
            Revisa tu correo para confirmar tu cuenta. Serás redirigido al login en unos segundos...
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="w-full bg-white rounded-xl overflow-hidden"
        style={{
          maxWidth: '480px',
          boxShadow: '0 40px 100px rgba(80,0,10,0.55), 0 0 0 2px rgba(255,255,255,0.25)',
          animation: 'entrada 0.85s cubic-bezier(0.16, 1, 0.3, 1) both'
        }}>

        {/* HEADER NEGRO */}
        <div className="px-10 py-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(170deg, #0a0a0a 0%, #1a1a1a 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={headerPattern} />
          <div className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, transparent, #C8102E, transparent)' }} />

          {/* LOGO REAL DE LA PEÑA */}
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

          <h1 className="relative z-10"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', letterSpacing: '5px', color: 'white', textTransform: 'uppercase', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Nueva solicitud
          </h1>
          <p className="relative z-10 mt-1.5"
            style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 600 }}>
            Hazte socio de la peña
          </p>
        </div>

        {/* FORMULARIO */}
        <div className="px-10 py-9">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field id="nombre" label="Nombre" placeholder="Tu nombre" icon={<IconUser />} delay="0.18s" />
            <Field id="apellidos" label="Apellidos" placeholder="Tus apellidos" icon={<IconUsers />} delay="0.22s" />
            <Field id="email" label="Correo electrónico" type="email" placeholder="correo@ejemplo.com" icon={<IconMail />} delay="0.26s" />
            <Field id="username" label="Usuario" placeholder="Nombre de usuario" icon={<IconUser />} delay="0.30s" />
            <Field id="password" label="Contraseña" type="password" placeholder="••••••••" icon={<IconLock />} delay="0.34s" />
            <Field id="confirmPassword" label="Confirmar contraseña" type="password" placeholder="••••••••" icon={<IconLock />} delay="0.38s" />

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-md border-none cursor-pointer transition-all mt-6"
              style={{
                background: 'linear-gradient(135deg, #C8102E 0%, #E8193F 100%)',
                color: 'white', fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', letterSpacing: '5px',
                boxShadow: '0 6px 20px rgba(200,16,46,0.35)',
                animation: 'fadeUp 0.6s 0.42s cubic-bezier(0.16, 1, 0.3, 1) both',
                opacity: loading ? 0.75 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(200,16,46,0.45)' } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,16,46,0.35)' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}>
              {loading ? 'Enviando solicitud...' : 'Solicitar alta'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6" style={{ animation: 'fadeUp 0.6s 0.47s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            <div className="flex-1 h-px" style={{ background: '#E8E8E8' }} />
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#BBBBBB', textTransform: 'uppercase', fontWeight: 600 }}>¿Ya eres socio?</span>
            <div className="flex-1 h-px" style={{ background: '#E8E8E8' }} />
          </div>

          <div className="text-center" style={{ fontSize: '13px', color: '#999', animation: 'fadeUp 0.6s 0.52s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login"
              style={{ color: '#C8102E', textDecoration: 'none', fontWeight: 700 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#8B0A1E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#C8102E')}>
              Inicia sesión aquí
            </Link>
          </div>
        </div>

        <div className="text-center py-2.5"
          style={{ background: '#0a0a0a', fontFamily: 'Bebas Neue, sans-serif', fontSize: '12px', letterSpacing: '4px', color: 'rgba(200,16,46,0.6)' }}>
          Temporada {getCurrentSeason()}
        </div>
      </div>
    </AuthLayout>
  )
}
