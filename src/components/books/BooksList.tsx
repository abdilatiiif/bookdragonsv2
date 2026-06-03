'use client'
import { useEffect, useState } from 'react'
import Book from './Book'
import type { BookItem } from '@/books'

function BooksList({ books }: { books: BookItem[] }) {
  const [payloadBooks, setPayloadBooks] = useState<BookItem[]>([])

  useEffect(() => {
    async function booksFromPayloadDb() {
      try {
        const response = await fetch('/api/getBooks')
        const result = (await response.json()) as { data?: BookItem[] }

        if (!response.ok) {
          throw new Error('Kunne ikke hente bøker fra databasen')
        }

        setPayloadBooks(result.data ?? [])
      } catch {
        setPayloadBooks([])
      }
    }

    void booksFromPayloadDb()
  }, [])

  const payloaddb = [...payloadBooks]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4">
      <section className="rounded-2xl border border-emerald-400 bg-emerald-50/40 p-4 sm:p-6">
        <h3 className="mb-5 text-2xl font-bold text-green-700">Bøker fra Payload DB</h3>

        {!payloaddb.length ? (
          <p className="rounded-lg bg-white px-4 py-3 text-sm text-green-900/80">
            Ingen bøker funnet i Payload DB enda.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {payloaddb.map((book) => (
              <Book key={`payload-${book.id}`} book={book} />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <h3 className="mb-5 text-2xl font-bold text-slate-900">Bøker fra lokal liste</h3>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Book key={`local-${book.id}`} book={book} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default BooksList
