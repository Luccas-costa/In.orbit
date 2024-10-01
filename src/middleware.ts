import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(req: NextRequest) {
  const response = NextResponse.next()

  // Adiciona os cabeçalhos CORS
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )

  return response
}

export const config = {
  // Aplica o middleware para todas as rotas, ou você pode especificar padrões de rota
  matcher: '/api/:path*',
}
