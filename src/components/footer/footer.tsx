import Link from 'next/link'

function Footer() {
  const idag = new Date().toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <footer className="allPages z-55 border-t border-black/10 px-4 py-2">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-xs md:flex-row md:text-sm">
        <Link href="/" className="text-sm font-semibold hover:underline md:text-base">
          BookDragons
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <Link href="/books" className="hover:underline">
            Boker
          </Link>
          <Link href="/books" className="hover:underline">
            Forfatter
          </Link>
          <Link href="/books" className="hover:underline">
            Hjelp
          </Link>
        </nav>

        <div className="text-center md:text-right">
          <p>© 2026 BookDragonsv2 -Eksamen. All rights reserved. Latif Hassan </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
