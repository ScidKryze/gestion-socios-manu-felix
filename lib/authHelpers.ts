export function getCurrentSeason(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 0-11, temporada empieza en agosto (7)
  if (month >= 7) {
    return `${year} · ${String(year + 1).slice(-2)}`
  } else {
    return `${year - 1} · ${String(year).slice(-2)}`
  }
}

// Estilos inline reutilizables para inputs
export const inputStyle: React.CSSProperties = {
  background: '#F8F2F3',
  borderColor: '#EBEBEB',
  color: '#1A0005',
  fontFamily: 'Barlow, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
}

export function onInputFocus(e: React.FocusEvent<HTMLInputElement>) {
  e.target.style.borderColor = '#C8102E'
  e.target.style.background = '#fff'
  e.target.style.boxShadow = '0 0 0 4px rgba(200,16,46,0.1)'
  const svg = e.target.previousElementSibling as HTMLElement | null
  if (svg) svg.style.color = '#C8102E'
}

export function onInputBlur(e: React.FocusEvent<HTMLInputElement>, hasError = false) {
  e.target.style.borderColor = hasError ? '#C8102E' : '#EBEBEB'
  e.target.style.background = '#F8F2F3'
  e.target.style.boxShadow = 'none'
  const svg = e.target.previousElementSibling as HTMLElement | null
  if (svg) svg.style.color = '#CBCBCB'
}
