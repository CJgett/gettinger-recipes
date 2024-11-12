import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const response = NextResponse.next()
    
    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    )
    
    return response
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin"
    }
  }
)

export const config = {
  matcher: ["/admin/add-recipe"]
} 