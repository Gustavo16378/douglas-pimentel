import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { waLink } from '../lib/whatsapp'
import { Eyebrow, Section, TYPE } from './ui'

const COMO_SAIU = [
  'Demitido sem justa causa',
  'Demitido por justa causa',
  'Pedi demissão',
  'Acordo',
  'Ainda estou trabalhando',
]

/** Format raw input into a BRL string, e.g. "R$ 1.234,56". */
function maskBRL(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (!digits) return ''
  const cents = parseInt(digits, 10)
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const labelClass = 'font-sans font-semibold uppercase text-cream/50'
const labelStyle = { fontSize: TYPE.label, letterSpacing: '0.08em' } as const
const fieldClass =
  'h-14 w-full rounded-[6px] border border-cream/20 bg-cream/[0.05] px-4 font-sans text-cream outline-none transition-colors focus:border-gold'
const fieldStyle = { fontSize: '17px' } as const

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col" style={{ gap: '7px' }}>
      <span className={labelClass} style={labelStyle}>
        {label}
      </span>
      {children}
    </div>
  )
}

function Select({
  value,
  onChange,
  placeholder,
  children,
  ariaLabel,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  children: ReactNode
  ariaLabel: string
}) {
  return (
    <div className="relative w-full">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} appearance-none pr-9 ${value === '' ? 'text-cream/40' : ''}`}
        style={fieldStyle}
      >
        <option value="" disabled style={{ color: '#111' }}>
          {placeholder}
        </option>
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/40">▾</span>
    </div>
  )
}

export default function Calculadora() {
  const [salario, setSalario] = useState('')
  const [anos, setAnos] = useState('')
  const [meses, setMeses] = useState('')
  const [comoSaiu, setComoSaiu] = useState('')

  const valid = salario !== '' && anos !== '' && comoSaiu !== ''

  const href = useMemo(() => {
    const salarioNum = salario.replace(/[R$ \s]/g, '')
    const mesesVal = meses === '' ? '0' : meses
    const msg = `Olá, Dr. Douglas! Saí do emprego e quero entender o que tenho a receber. Meu último salário era R$ ${salarioNum}, trabalhei ${anos} anos e ${mesesVal} meses, e a saída foi: ${comoSaiu}. Pode avaliar meu caso?`
    return waLink(msg)
  }, [salario, anos, meses, comoSaiu])

  const handleSubmit = () => {
    if (!valid) return
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section
      bg="ink"
      containerClassName="flex flex-col lg:flex-row lg:items-center"
      containerStyle={{ gap: '56px' }}
    >
      <div className="flex flex-col lg:flex-[1_1_46%]" style={{ gap: '18px' }}>
        <Eyebrow tone="gold">QUANTO VOCÊ DEVERIA TER RECEBIDO?</Eyebrow>
        <h2
          className="font-serif font-medium text-cream"
          style={{ fontSize: TYPE.title, lineHeight: 1.08 }}
        >
          Saiu do emprego? Faça as contas.
        </h2>
        <p
          className="font-sans text-cream/[0.72]"
          style={{ fontSize: TYPE.body, lineHeight: 1.65, maxWidth: '30ch' }}
        >
          Preencha os três campos e leve seus dados direto pro WhatsApp — o Douglas avalia o seu
          caso e te diz o que a lei garante.
        </p>
      </div>

      <div
        className="flex w-full flex-col lg:flex-[0_0_520px]"
        style={{
          background: '#1c1a17',
          border: '1px solid rgba(201,168,106,0.25)',
          borderRadius: '12px',
          padding: '32px 30px',
          gap: '20px',
          maxWidth: '520px',
        }}
      >
        <Field label="Último salário">
          <input
            type="text"
            inputMode="numeric"
            aria-label="Último salário"
            placeholder="R$ 0,00"
            value={salario}
            onChange={(e) => setSalario(maskBRL(e.target.value))}
            className={`${fieldClass} placeholder:text-cream/40`}
            style={fieldStyle}
          />
        </Field>

        <Field label="Tempo de casa">
          <div className="flex" style={{ gap: '12px' }}>
            <Select value={anos} onChange={setAnos} placeholder="Anos" ariaLabel="Anos de casa">
              {Array.from({ length: 41 }, (_, i) => (
                <option key={i} value={String(i)} style={{ color: '#111' }}>
                  {i} {i === 1 ? 'ano' : 'anos'}
                </option>
              ))}
            </Select>
            <Select value={meses} onChange={setMeses} placeholder="Meses" ariaLabel="Meses de casa">
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={String(i)} style={{ color: '#111' }}>
                  {i} {i === 1 ? 'mês' : 'meses'}
                </option>
              ))}
            </Select>
          </div>
        </Field>

        <Field label="Como saiu">
          <Select value={comoSaiu} onChange={setComoSaiu} placeholder="Selecione" ariaLabel="Como saiu do emprego">
            {COMO_SAIU.map((opt) => (
              <option key={opt} value={opt} style={{ color: '#111' }}>
                {opt}
              </option>
            ))}
          </Select>
        </Field>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!valid}
          className="mt-1.5 flex h-14 w-full items-center justify-center gap-2 rounded-[6px] bg-gold font-sans font-bold text-ink transition-[background-color,opacity] hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40"
          style={{ fontSize: '16px' }}
        >
          Descobrir no WhatsApp →
        </button>
        <p className="text-center font-sans text-cream/40" style={{ fontSize: '12px', lineHeight: 1.5 }}>
          Sem cálculo automático — quem avalia os valores é o advogado.
        </p>
      </div>
    </Section>
  )
}
