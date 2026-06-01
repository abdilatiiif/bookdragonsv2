import { books } from '@/books'

function BooksPage() {
  console.log(books) // Skriv ut bøker i konsollen for å sjekke dataen

  return <div className="pt-20">Books</div>
}

export default BooksPage
