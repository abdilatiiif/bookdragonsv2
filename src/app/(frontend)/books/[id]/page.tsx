'use client'

import { useEffect, useState } from 'react'
import type { BookItem } from '@/books'
import Link from 'next/link'

type BookPageProps = {
  params: Promise<{
    id: string
  }>
}

function BookPage({ params }: BookPageProps) {
  const [book, setBook] = useState<BookItem | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let henterData = true

    const loadBook = async () => {
      const { id } = await params

      try {
        const response = await fetch(`/api/books/${id}`) // id fra URL-en
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Kunne ikke laste bok')
        }

        if (henterData) {
          setBook(result.data)
        }
      } catch (err) {
        if (henterData) {
          setError(err instanceof Error ? err.message : 'Ukjent feil')
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
              <button className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-emerald-700">
                Kjøp nå
              </button>
              <Link
                href="/books"
                className="rounded-lg border border-black/20 px-4 py-2 font-semibold transition-colors hover:bg-black/5"
              >
                Tilbake til bøker
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage
