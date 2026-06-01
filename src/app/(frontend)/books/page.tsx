import { books } from '@/books'
import BooksList from '@/components/books/BooksList'

function BooksPage() {
  return (
    <div className="pt-20">
      <BooksList books={books} />
    </div>
  )
}

export default BooksPage
