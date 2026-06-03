import Link from 'next/link'

function Kurv() {
  return (
    <div>
      <div className="py-10 text-center">
        <p className="mb-4 text-lg">Handlekurven er tom.</p>
        <Link
          href="/books"
          className="rounded-lg bg-black px-4 py-2 font-semibold text-white transition-colors hover:bg-black/80"
        >
          Gå til bøker
        </Link>
      </div>
    </div>
  )
}

export default Kurv
