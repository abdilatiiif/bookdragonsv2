import { getPayload } from 'payload'

import config from '@/payload.config'

// GET /api/getbookById?id=9788203190195
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const idParam = url.searchParams.get('id')
    const parsedId = Number(idParam)

    if (!parsedId) {
      return Response.json({ error: 'manglende bokId' }, { status: 400 })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const result = await payload.find({
      collection: 'books',
      where: {
        id: {
          equals: parsedId,
        },
      },
      limit: 1,
    })

    const book = result.docs[0]

    if (!book) {
      return Response.json({ error: 'Bok ikke funnet.' }, { status: 404 })
    }

    return Response.json({ data: book }, { status: 200 })
  } catch {
    return Response.json({ error: 'Kunne ikke hente bok fra databasen.' }, { status: 500 })
  }
}
