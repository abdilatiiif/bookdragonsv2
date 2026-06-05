import { books } from '@/books'
import BooksList from '@/components/books/BooksList'
import Link from 'next/link'

type BookPageProps = {
  searchParams?: Promise<{
    page?: string
  }>
}

//  pagination - viser 9 bøker per side
const maksperside = 9

async function BooksPage({ searchParams }: BookPageProps) {
  const urlsearch = await searchParams
  const URL = Number(urlsearch?.page ?? 1)
  console.log('Viser side:', URL)

  const nåværendeSide = URL > 0 ? URL : 1

  const totaltSider = Math.max(1, Math.ceil(books.length / maksperside))
  console.log('Totalt sider:', totaltSider)

  const visendeSide = Math.min(nåværendeSide, totaltSider)
  console.log('Visende side:', visendeSide)

  const startside = (visendeSide - 1) * maksperside
  const kontrollerteBøker = books.slice(startside, startside + maksperside)

  console.log('Bøker som vises på denne siden:', kontrollerteBøker)

  // pagination = kontrollerbøker
  return (
    <div className="pt-20">
      <BooksList books={kontrollerteBøker} />
      <div className="mx-auto py-20 flex w-full max-w-7xl items-center justify-between px-2 pb-12">
        <Link
          href={`/books?page=${visendeSide - 1}`}
          aria-disabled={visendeSide <= 1}
          className={`rounded-lg border px-4 py-2 font-medium ${
            visendeSide <= 1 ? 'pointer-events-none opacity-40' : 'hover:bg-orange-400'
          }`}
        >
          Forrige
        </Link>

        <p className="text-sm">
          Side {visendeSide} av {totaltSider}
        </p>

        <Link
          href={`/books?page=${visendeSide + 1}`}
          aria-disabled={visendeSide >= totaltSider}
          className={`rounded-lg border px-4 py-2 font-medium ${
            visendeSide >= totaltSider ? 'pointer-events-none opacity-40' : 'hover:bg-green-400'
          }`}
        >
          Neste
        </Link>
      </div>
    </div>
  )
}

export default BooksPage
