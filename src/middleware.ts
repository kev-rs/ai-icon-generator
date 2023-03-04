// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/hello')) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
    // return NextResponse.rewrite(new URL('/about-2', req.url))
  }
  // return NextResponse.redirect(new URL('/about-2', req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/hello']
}