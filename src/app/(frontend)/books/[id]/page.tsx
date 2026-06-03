'use client'

import { useEffect, useState } from 'react'
import type { BookItem } from '@/books'
import Link from 'next/link'

type BookPageProps = {
  params: Promise<{
    id: string
  }>
}

const CART_KEY = 'cart' // nøkkel for å lagre handlekurven i localStorage

function BookPage({ params }: BookPageProps) {
  const [book, setBook] = useState<BookItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  // reserver bok i handlekurven
  const [isReserved, setIsReserved] = useState(false)

  useEffect(() => {
    let henterData = true

    // API kall for å hente bokdata basert på ID fra URL-en
    const loadBook = async () => {
      const { id } = await params
      const encodedId = encodeURIComponent(id) // payload id brukes som url

      console.log('url id fra payload:', encodedId)

      try {
        // 1) Prøv lokal kilde først
        const bookFraLokalfil = await fetch(`/api/store-books/${encodedId}`)
        if (bookFraLokalfil.ok) {
          const Lokalbook = await bookFraLokalfil.json()
          if (henterData) {
            setBook(Lokalbook.data)
            setError(null)
          }
          return // hvis boka finnes lokalt, trenger vi ikke å sjekke Payload DB
        }

        // 2) Fallback til Payload DB hvis boka ikke finnes lokalt
        const payloadBookSjekk = await fetch(`/api/getbookById?id=${encodedId}`)
        const payloadResult = await payloadBookSjekk.json()

        if (!payloadBookSjekk.ok) {
          throw new Error(payloadResult.error || 'Kunne ikke laste bok')
        }

        if (henterData) {
          setBook(payloadResult.data)
          setError(null)
        }
      } catch (err) {
        if (henterData) {
          setError(err instanceof Error ? err.message : 'callbackfunksjon feil db')
        }
      }
    }

    loadBook()

    return () => {
      henterData = false
    }
  }, [params])

  if (error) {
    return (
      <div className="px-4 py-24">
        Feil: {error}
        <Link
          href="/books"
          className="ml-4 rounded-lg border border-black/20 px-4 py-2 font-semibold transition-colors hover:bg-black/5"
        >
          Tilbake til bøker
        </Link>
      </div>
    )
  }

  if (!book) {
    return <div className="px-4 py-24">Laster bok...</div>
  }

  function reserverBok() {
    if (!book) {
      return
    }

    try {
      const lagretKurv = localStorage.getItem(CART_KEY)
      const dataFraKurv = lagretKurv ? JSON.parse(lagretKurv) : []
      const varerIKurv = Array.isArray(dataFraKurv) ? dataFraKurv : []

      console.log('Nåværende varer i kurven:', varerIKurv)

      const bokFinnesIKurv = varerIKurv.find((vare) => vare?.id === book.id)

      // Hvis boka allerede er i kurven, øk antallet, ellers legg den til som ny vare
      const oppdatertKurv = bokFinnesIKurv
        ? varerIKurv.map((vare) =>
            vare.id === book.id
              ? { ...vare, ...book, quantity: (Number(vare.quantity) || 1) + 1 }
              : vare,
          )
        : [...varerIKurv, { ...book, quantity: 1 }]

      localStorage.setItem(CART_KEY, JSON.stringify(oppdatertKurv))
      setIsReserved(true) // gir tilbakemelding at boka er reservert

      setTimeout(() => {
        window.location.reload()
      }, 1000) // oppdaterer kurven etter 1 sekund for å vise endringen
    } catch {
      setError('Kunne ikke lagre boka i handlekurven')
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-auto w-full rounded-lg object-cover"
          />

          <div>
            <h1 className="mb-2 text-3xl font-bold">{book.title}</h1>
            <p className="mb-4 text-lg">Av {book.author}</p>

            <p className="mb-5 inline-flex rounded-full bg-amber-500 px-4 py-1 text-lg font-bold text-black">
              {book.price} kr
            </p>

            <p className="mb-6 leading-relaxed">{book.description}</p>

            <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <p>
                <strong>ID:</strong> {book.id}
              </p>
              <p>
                <strong>Sjanger:</strong> {book.genre}
              </p>
              <p>
                <strong>Sprak:</strong> {book.language}
              </p>
              <p>
                <strong>Utgivelsesar:</strong> {book.publishedYear}
              </p>
              <p>
                <strong>Binding:</strong> {book.binding}
              </p>
              <p>
                <strong>Signert:</strong> {book.signed}
              </p>
              <p>
                <strong>Tilstand:</strong> {book.condition}
              </p>
              <p>
                <strong>Aldersgruppe:</strong> {book.ageGroup}
              </p>
              <p>
                <strong>Pa lager:</strong> {book.stock}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-black/10 pt-4">
              <button
                type="button"
                onClick={reserverBok}
                className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Reserver nå
              </button>
              <Link
                href="/books"
                className="rounded-lg border border-black/20 px-4 py-2 font-semibold transition-colors hover:bg-black/5"
              >
                Tilbake til bøker
              </Link>
            </div>

            {isReserved && (
              <p className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Boka er lagt i handlekurven.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage
