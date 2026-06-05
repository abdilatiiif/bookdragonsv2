'use client'

import { useState } from 'react'

// type variabler for formen
type FormState = {
  id: string
  title: string
  author: string
  price: string
  description: string
  signed: 'unsigned' | 'signed'
  binding: 'pocket' | 'hardcover'
  language: string
  genre: string
  publishedYear: string
  condition: 'som ny' | 'veldig bra' | 'ok'
  stock: string
  imageUrl: string
  ageGroup: 'barn' | 'voksen' | 'ungdom'
}

// initial state = startverdi for formen
const initialForm: FormState = {
  id: '',
  title: '',
  author: '',
  price: '',
  description: '',
  signed: 'unsigned',
  binding: 'pocket',
  language: 'bare gud vet',
  genre: 'fiction',
  publishedYear: String(new Date().getFullYear()),
  condition: 'ok',
  stock: '1',
  imageUrl: 'https://picsum.photos/400/500',
  ageGroup: 'voksen',
}

// komponent for å legge til ny bok i databasen via FORMEN
function LeggTilBok() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [opprettBok, setOpprettBok] = useState(false)
  const [sendFeedback, setSendFeedback] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // form submitt handler trigges ved innsending
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpprettBok(true) // starter opprettels fasen
    setError(null)
    setSendFeedback(null)

    // forventet data som skal sendes inn fra formen
    const payload = {
      id: Number(form.id),
      title: form.title.trim(),
      author: form.author.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      signed: form.signed,
      binding: form.binding,
      language: form.language.trim(),
      genre: form.genre.trim(),
      publishedYear: Number(form.publishedYear),
      condition: form.condition,
      stock: Number(form.stock),
      imageUrl: form.imageUrl.trim(),
      ageGroup: form.ageGroup,
    }

    try {
      const response = await fetch('/api/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json() // lagre response fra API-kallet

      if (!response.ok) {
        throw new Error(result.error || 'Kunne ikke opprette bok, sjekk inputs')
      }

      setSendFeedback('Boka ble lagt til i databasen!🎉')
      setForm(initialForm) // nullstiller form etter ny bok er lagt til
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'feil ved lagring av bok eller feil i innputs, sjekk types',
      )
    }
    setOpprettBok(false) // bekreftelse Ferdig med opprettelse
  }

  return (
    <div className="w-full rounded-2xl bg-green-200 p-4">
      <h2 className="mb-4 text-xl font-semibold">Legg til ny bok 📚</h2>

      <form className="grid gap-3" onSubmit={onSubmit}>
        <input
          required
          type="number"
          placeholder="ID"
          value={form.id}
          onChange={(e) => setForm((prev) => ({ ...prev, id: e.target.value }))}
          className="rounded-lg border border-black/20 bg-white px-3 py-2"
        />

        <input
          required
          placeholder="Tittel"
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          className="rounded-lg border border-black/20 bg-white px-3 py-2"
        />

        <input
          required
          placeholder="Forfatter"
          value={form.author}
          onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
          className="rounded-lg border border-black/20 bg-white px-3 py-2"
        />

        <input
          required
          type="number"
          min="0"
          placeholder="Pris"
          value={form.price}
          onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          className="rounded-lg border border-black/20 bg-white px-3 py-2"
        />

        <textarea
          required
          placeholder="Beskrivelse"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          className="rounded-lg border border-black/20 bg-white px-3 py-2"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <select
            value={form.signed}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, signed: e.target.value as FormState['signed'] }))
            }
            className="rounded-lg border border-black/20 bg-white px-3 py-2"
          >
            <option value="unsigned">Usignert</option>
            <option value="signed">Signert</option>
          </select>

          <select
            value={form.binding}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, binding: e.target.value as FormState['binding'] }))
            }
            className="rounded-lg border border-black/20 bg-white px-3 py-2"
          >
            <option value="pocket">Pocket</option>
            <option value="hardcover">Innbundet</option>
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Språk"
            value={form.language}
            onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
            className="rounded-lg border border-black/20 bg-white px-3 py-2"
          />
          <input
            required
            placeholder="Sjanger"
            value={form.genre}
            onChange={(e) => setForm((prev) => ({ ...prev, genre: e.target.value }))}
            className="rounded-lg border border-black/20 bg-white px-3 py-2"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <input
            required
            type="number"
            placeholder="Utgitt år"
            value={form.publishedYear}
            onChange={(e) => setForm((prev) => ({ ...prev, publishedYear: e.target.value }))}
            className="rounded-lg border border-black/20 bg-white px-3 py-2"
          />

          <select
            value={form.condition}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condition: e.target.value as FormState['condition'] }))
            }
            className="rounded-lg border border-black/20 bg-white px-3 py-2"
          >
            <option value="som ny">Som ny</option>
            <option value="veldig bra">Veldig bra</option>
            <option value="ok">Ok</option>
          </select>

          <input
            required
            type="number"
            min="0"
            placeholder="Lager"
            value={form.stock}
            onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
            className="rounded-lg border border-black/20 bg-white px-3 py-2"
          />
        </div>

        <input
          required
          type="url"
          placeholder="Bilde-URL"
          value={form.imageUrl}
          onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
          className="rounded-lg border border-black/20 bg-white px-3 py-2"
        />

        <select
          value={form.ageGroup}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, ageGroup: e.target.value as FormState['ageGroup'] }))
          }
          className="rounded-lg border border-black/20 bg-white px-3 py-2"
        >
          <option value="barn">Barn</option>
          <option value="ungdom">Ungdom</option>
          <option value="voksen">Voksen</option>
        </select>

        <button
          type="submit"
          disabled={opprettBok}
          className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
        >
          {opprettBok ? 'Lagrer...' : 'Opprett Bok'}
        </button>
      </form>

      {sendFeedback && (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-4xl text-emerald-800">
          {sendFeedback} 🎉
        </p>
      )}
      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-red-700">{error} ❌</p>}
    </div>
  )
}

export default LeggTilBok
