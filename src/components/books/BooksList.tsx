'use client'
import Book from './Book'
import type { BookItem } from '@/books'

function BooksList({ books }: { books: BookItem[] }) {
  return (
    <div className="mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl px-4 py-20">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BooksList
