'use client'

import { useEffect, useState } from 'react'

type Reservasjon = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  totalItems: number
  totalPrice: number
  status: 'underbehandling' | 'utlevert'
  dato: string
}

function Reservasjoner() {
  const [reservasjoner, setReservasjoner] = useState<Reservasjon[]>([])
  const [loading, setLoading] = useState(true)
  const [feil, setFeil] = useState('')

  useEffect(() => {
    // api kall for å hente alle reservasjoner fra Payload CMS
    async function hentReservasjoner() {
      try {
        const response = await fetch('/api/reservations')
        if (!response.ok) throw new Error('Kunne ikke hente reservasjoner')

        const result = (await response.json()) as { data?: Reservasjon[] }
        setReservasjoner(result.data ?? [])
        
      } catch {
        setFeil('Kunne ikke hente reservasjoner akkurat nå.')
        setReservasjoner([])
      }
    }

    hentReservasjoner()
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Laster reservasjoner...</div>
  }

  if (feil) {
    return <div className="text-red-700">{feil}</div>
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold">Reservasjoner</h2>

      {!reservasjoner.length ? (
        <p>Ingen reservasjoner funnet.</p>
      ) : (
        <ul className="space-y-3">
          {reservasjoner.map((reservasjon) => (
            <li key={reservasjon.id} className="rounded-lg border border-black/10 p-3">
              <p className="font-semibold">
                {reservasjon.firstName} {reservasjon.lastName}
              </p>
              <p className="text-sm">{reservasjon.email}</p>
              <p className="text-sm">{reservasjon.phone}</p>
              <p className="text-sm">Antall varer: {reservasjon.totalItems}</p>
              <p className="text-sm">Total: {reservasjon.totalPrice} kr</p>
              <p className="text-sm">Status: {reservasjon.status}</p>
              <p className="text-sm text-gray-600">
                Dato: {new Date(reservasjon.dato).toLocaleString('nb-NO')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Reservasjoner
