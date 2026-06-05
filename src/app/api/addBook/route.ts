import { getPayload } from 'payload'

import config from '@/payload.config'

type CreateBookBody = {
  id: number
  title: string
  author: string
  price: number
  description: string
  signed: 'unsigned' | 'signed'
  binding: 'pocket' | 'hardcover'
  language: string
  genre: string
  publishedYear: number
  condition: 'som ny' | 'veldig bra' | 'ok'
  stock: number
  imageUrl: string
  ageGroup: 'barn' | 'voksen' | 'ungdom'
}

export async function POST(request: Request) {
  try {
    const Bookbody = (await request.json()) as Partial<CreateBookBody> // alle feletene må ikke være med i body, så Partial

    // mest nødvendig info for bok opprettelsen
    if (!Bookbody.id || !Bookbody.title || !Bookbody.author || !Bookbody.description) {
      return Response.json({ error: 'viktig informasjon mangler' }, { status: 400 })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const book = await payload.create({
      collection: 'books',
      data: {
        id: Bookbody.id,
        title: Bookbody.title,
        author: Bookbody.author,
        price: Bookbody.price ?? 1,
        description: Bookbody.description,
        signed: Bookbody.signed ?? 'unsigned',
        binding: Bookbody.binding ?? 'pocket',
        language: Bookbody.language ?? 'bare gud vet',
        genre: Bookbody.genre ?? 'fiction',
        publishedYear: Bookbody.publishedYear ?? new Date().getFullYear(),
        condition: Bookbody.condition ?? 'ok',
        stock: Bookbody.stock ?? 1,
        imageUrl: Bookbody.imageUrl ?? 'https://picsum.photos/400/500',
        ageGroup: Bookbody.ageGroup ?? 'voksen',
      },
    })

    return Response.json({ data: book }, { status: 201 })
  } catch {
    return Response.json({ error: 'kunne ikke opprætte boka, server feil' }, { status: 500 })
  }
}
