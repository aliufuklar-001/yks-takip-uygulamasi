import { createServerClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = {
      supabase: createServerClient(),
      response: NextResponse.next({
          request: {
              headers: request.headers,
          },
      }),
  };

  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
