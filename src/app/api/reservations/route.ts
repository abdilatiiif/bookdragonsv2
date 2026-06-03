import { getPayload } from 'payload'

import config from '@/payload.config'

// GET /api/reservations - henter alle reservasjoner
export async function GET() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const reservations = await payload.find({
      collection: 'reservations',
      limit: 200,
      sort: '-createdAt',
    })

    return Response.json({ data: reservations.docs }, { status: 200 })
  } catch {
    return Response.json({ error: 'Kunne ikke hente reservasjoner' }, { status: 500 })
  }
}

// POST /api/reservations - oppretter en ny reservasjon i Payload CMS med data fra bestillingsskjemaet
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // forventet body data fra form

    const reservation = await payload.create({
      collection: 'reservations',
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        items: body.items,
        totalItems: body.totalItems,
        totalPrice: body.totalPrice,
        status: 'underbehandling',
        dato: new Date().toISOString(),
      },
    })

    return Response.json({ data: reservation }, { status: 201 })
  } catch {
    return Response.json(
      { error: 'Kunne ikke opprette reservasjonen av boka - serverfeil' },
      { status: 500 },
    )
  }
}
