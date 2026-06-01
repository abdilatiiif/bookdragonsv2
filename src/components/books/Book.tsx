'use client'

import Link from 'next/link'
import type { BookItem } from '@/books'

function Book({ book }: { book: BookItem }) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="rounded-lg border border-black/20 px-4 py-2 font-semibold transition-colors hover:bg-black/5"
    >
      <div className="mb-6 rounded-xl border border-black/10 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-56 w-full rounded-lg object-cover md:w-40"
          />

          <div className="grid w-full gap-1 text-sm md:grid-cols-2">
            <h3 className="col-span-full text-xl font-semibold">{book.title}</h3>

            <p>Forfatter: {book.author}</p>

            <p className="flex items-center gap-2">Pris:{book.price} kr</p>

            <p>
              <strong>Lager:</strong> {book.stock}
            </p>

            <div className="col-span-full mt-3 flex items-center justify-between gap-3 border-t border-black/10 pt-3">
              <span className="text-xs text-muted-foreground">{book.stock} pa lager</span>

              <button className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-700">
                Kjøp nå
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Book
