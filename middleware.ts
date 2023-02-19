import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const token = request.cookies.get("token")

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")

    if (!token) {
      return NextResponse.rewrite(new URL('/', request.url))
    }

    if (token) {
      return NextResponse.next()
    }



  }





}