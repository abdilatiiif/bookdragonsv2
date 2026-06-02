import { books } from '@/books'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const parsedId = Number(id)

  if (!parsedId) {
    return Response.json({ error: 'Ugyldig bok-id' }, { status: 400 })
  }

  const book = books.find((item) => item.id === parsedId)

  if (!book) {
    return Response.json({ error: 'Bok ikke funnet' }, { status: 404 })
  }

  return Response.json({ data: book }, { status: 200 })
}
