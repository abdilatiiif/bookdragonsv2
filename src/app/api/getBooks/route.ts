import { getPayload } from 'payload'

import config from '@/payload.config'

// henter alle bøker fra Payload CMS db
export async function GET() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const books = await payload.find({
      collection: 'books',
      limit: 200,
      sort: '-createdAt',
    })

    return Response.json({ data: books.docs }, { status: 200 })
  } catch {
    return Response.json({ error: 'kunne ikke hente bøker fra databasen' }, { status: 500 })
  }
}
