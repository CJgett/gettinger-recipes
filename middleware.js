import { auth } from "./auth"
import { NextResponse } from 'next/server'

export default auth((req) => {
  if (req.auth?.user?.role !== "admin") {
    const signInUrl = new URL("/admin", req.url)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "connect-src 'self' https://blob.vercel-storage.com",
      "img-src 'self' https://*.public.blob.vercel-storage.com"
    ].join('; ')
  )

  return response
})

export const config = {
  matcher: ["/admin/add-recipe"]
}
