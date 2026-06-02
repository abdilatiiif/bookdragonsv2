'use client'

import { useState } from 'react'

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
  const [submitted, setSubmitted] = useState(false)
  const [feilMelding, setFeilMelding] = useState('')

  const tømkurvHandler = () => {
    tømkurv()
  }

  // innsending av bestilling
  function onSubmitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
    setSubmitted(true)
    setForm({ firstName: '', lastName: '', email: '', phone: '' })
    tømkurvHandler()

    console.log('Bestilling sendt:', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      items,
      totalItems,
      totalPrice,
    })

    setTimeout(() => {
      window.location.reload()
    }, 2000) // oppdaterer kurven etter 2 sekunder for å vise endringen
  }

  return (
    <aside className="h-fit rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-2xl text-emerald-800 shadow-lg">
            Takk for bestillingen. Vi kontakter deg snart.
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
            onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
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
            onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
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
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
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
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="w-full rounded-lg border border-black/20 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={!items.length}
          className="mt-2 w-full rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send bestilling
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
