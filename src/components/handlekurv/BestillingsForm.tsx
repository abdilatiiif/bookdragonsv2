'use client'

import { useState } from 'react'
import Link from 'next/link'

type OrderForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type CartItem = {
  id: number
  title: string
  price: number
  imageUrl: string
  quantity: number
}

type BestillingsFormProps = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  tømkurv: () => void
}

function BestillingsForm({ items, totalItems, totalPrice, tømkurv }: BestillingsFormProps) {
  const [form, setForm] = useState<OrderForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [reservert, setReservert] = useState(false)
  const [feilMelding, setFeilMelding] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tømkurvHandler = () => {
    tømkurv()
  }

  // innsending av bestilling med validering og API kall til Payload CMS
  async function onSubmitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!items.length) return

    const epostOk = form.email.includes('@')
    const antallSiffer = form.phone.replace(/\D/g, '').length
    const tlfOk = antallSiffer >= 8

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setFeilMelding('Fornavn og etternavn må fylles ut.')
      return
    }

    if (!epostOk) {
      setFeilMelding('Epost må inneholde @.')
      return
    }

    if (!tlfOk) {
      setFeilMelding('Telefonnummer må ha minst 8 tall.')
      return
    }

    setFeilMelding('')

    // API kall for å opprette reservasjon i Payload CMS
    setIsSubmitting(true)

    const dato = new Date().toISOString()

    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        items,
        totalItems,
        totalPrice,
        dato,
      }),
    })

    // feil innsending av bestilling
    setIsSubmitting(false)
    if (!response.ok) {
      setFeilMelding('Kunne ikke sende bestillingen. Prøv igjen.')
      return
    }

    setReservert(true) // vis bekreftelse

    setForm({ firstName: '', lastName: '', email: '', phone: '' }) // nullstill form
    tømkurvHandler() // tøm handlekurven

    console.log('Bestilling sendt:', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      items,
      totalItems,
      totalPrice,
      dato,
    }) // logg bestillingsdata for debugging
  }

  return (
    <aside className="h-fit rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      {reservert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-2xl text-emerald-800 shadow-lg">
            Takk for bestillingen. Vi kontakter deg snart.
            <Link href="/books" className="ml-2 font-semibold text-blue-400 hover:underline">
              Fortsett å utforske bøker
            </Link>
          </p>
        </div>
      )}

      <h2 className="mb-3 text-xl font-semibold">Oppsummering</h2>
      <div className="mb-4 space-y-2 text-sm">
        <p className="flex items-center justify-between">
          <span>Antall varer</span>
          <span className="font-semibold">{totalItems}</span>
        </p>
        <p className="flex items-center justify-between text-base">
          <span>Total sum</span>
          <span className="font-bold">{totalPrice} kr</span>
        </p>
      </div>

      <form className="space-y-3" onSubmit={onSubmitOrder}>
        {feilMelding && (
          <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {feilMelding}
          </p>
        )}

        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
            Fornavn
          </label>
          <input
            id="firstName"
            required
            value={form.firstName}
            onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
            className="w-full rounded-lg border border-black/20 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
            Etternavn
          </label>
          <input
            id="lastName"
            required
            value={form.lastName}
            onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
            className="w-full rounded-lg border border-black/20 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Epost
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-lg border border-black/20 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Tlf nummer
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full rounded-lg border border-black/20 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={!items.length || isSubmitting}
          className="mt-2 w-full rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Sender...' : 'Send bestilling'}
        </button>
      </form>

      <button
        type="button"
        onClick={tømkurvHandler}
        disabled={!items.length}
        className="mt-3 w-full rounded-lg border border-black/20 px-4 py-2 font-medium transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Tøm handlekurv
      </button>
    </aside>
  )
}

export default BestillingsForm
