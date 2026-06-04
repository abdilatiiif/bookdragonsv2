import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // sjekke om admin har logget seg inn!
  const payloadToken = request.cookies.get('payload-token')?.value

  //send bruker til admin, må være ansatt
  if (!payloadToken) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin'

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// hivlken route skal middleware kjøre på
export const config = {
  matcher: ['/ansatte'],
}
