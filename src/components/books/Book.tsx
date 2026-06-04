'use client'

import Link from 'next/link'
import type { BookItem } from '@/books'

function Book({ book }: { book: BookItem }) {
  const randomImgsrc = `https://picsum.photos/seed/${book.id}/400/500`

  return (
    <div className="mb-6">
      <Link
        href={`/books/${book.id}`}
        className="block rounded-xl border border-black/10 bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <img
            src={book.imageUrl ?? randomImgsrc}
            alt={book.title}
            className="h-56 w-full rounded-lg object-cover md:w-40"
          />

          <div className="grid w-full gap-1 text-sm md:grid-cols-2">
            <h3 className="col-span-full text-xl font-semibold">{book.title}</h3>

            <p>Forfatter: {book.author}</p>

            <p className="flex items-center gap-2 bg-amber-400 font-bold rounded-4xl px-4 py-1">
              Pris: {book.price} kr
            </p>

            <p>
              <strong>Lager:</strong> {book.stock}
            </p>

            <div className="col-span-full mt-3 flex items-center justify-between gap-3 border-t border-black/10 pt-3">
              <span className="text-md text-red-500 ">{book.stock} på lager</span>
            </div>
          </div>
        </div>

        <button className="mt-3 w-full rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700">
          Reserver nå
        </button>
      </Link>
    </div>
  )
}

export default Book
