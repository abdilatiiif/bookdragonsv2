'use client'

import { useEffect, useState } from 'react'

type ReservertVare = {
  id: number
  title: string
  price: number
  quantity?: number
}

type Reservasjon = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  items: ReservertVare[]
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
      } finally {
        setLoading(false)
      }
    }

    void hentReservasjoner() // unngå "promise not handled"
  }, [])

  if (loading) {
    return <div>Laster reservasjoner...</div>
  }

  if (feil) {
    return <div className="text-red-700">{feil}</div>
  }

  return (
    <div className="p-4 w-full bg-gray-200 rounded-2xl text-green-900">
      <h2 className=" text-xl font-semibold">Reservasjoner</h2>

      {!reservasjoner.length ? (
        <p>Ingen reservasjoner funnet.</p>
      ) : (
        <ul className="space-y-3">
          {reservasjoner.map((reservasjon) => (
            <li key={reservasjon.id} className="rounded-lg border border-black/10 p-3">
              <p className="font-semibold">
                {reservasjon.firstName} {reservasjon.lastName}
              </p>
              Epost: <p className="text-sm">{reservasjon.email}</p>
              Telefon: <p className="text-sm">{reservasjon.phone}</p>
              <p className="text-sm">Total Pris: {reservasjon.totalPrice} kr</p>
              <p className="text-sm">Status: {reservasjon.status}</p>
              <div className="mt-2 rounded-md bg-white/60 p-2">
                <p className="text-sm font-semibold">Reserverte varer:</p>
                {reservasjon.items?.length && (
                  <ul className="mt-1 space-y-1 text-sm">
                    {reservasjon.items.map((item, index) => {
                      const antall = Number(item.quantity ?? 1)
                      const pris = Number(item.price ?? 0)
                      return (
                        <li key={`${reservasjon.id}-${item.id}-${index}`}>
                          {item.title} - {antall} stk - {pris * antall} kr
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
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
