import { Fragment } from 'react'
import { Container } from './ui'

const ITEMS = ['+300 avaliações 5.0', 'Desde 2019', 'Equipe especializada', 'Palmas, TO']

export default function CredibilityBar() {
  return (
    <div
      style={{
        background: '#14120f',
        borderTop: '1px solid rgba(201,168,106,0.2)',
        borderBottom: '1px solid rgba(201,168,106,0.2)',
      }}
    >
      <Container
        className="flex flex-wrap items-center justify-center"
        style={{ paddingTop: '16px', paddingBottom: '16px', gap: '8px 22px' }}
      >
        {ITEMS.map((item, i) => (
        <Fragment key={item}>
          <span className="font-sans font-semibold text-cream/[0.78]" style={{ fontSize: '11.5px' }}>
            {item}
          </span>
          {i < ITEMS.length - 1 && (
            <span className="text-gold" style={{ fontSize: '11px' }} aria-hidden="true">
              ·
            </span>
          )}
        </Fragment>
        ))}
      </Container>
    </div>
  )
}
