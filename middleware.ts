import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import { verifyAuth } from './lib/auth'
import jwt from 'jsonwebtoken'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const token = request.cookies.get("token")?.value

  // const verifiedToken =
  //   token &&
  //   (await verifyAuth(token).catch((error) => {
  //     console.log("an error occured")
  //   }))

  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   // const token = request.cookies.get("token")

  //   if (!verifiedToken) {
  //     return NextResponse.rewrite(new URL('/', request.url))
  //   }

  //   if (verifiedToken) {
  //     console.log(verifiedToken)
  //     // return NextResponse.next()
  //     return NextResponse.redirect(new URL("/dashboard/agency/agent=management", request.url))
  //   }
  // }


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


// export const config = {
//   matcher: ['/dashboard', '/login']
// }