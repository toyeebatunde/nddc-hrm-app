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
    const userToken = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.rewrite(new URL('/', request.url))
    }
    if (!userToken) {
      return NextResponse.rewrite(new URL('/', request.url))
    }

    if (token && (JSON.parse(request.cookies.get("user").value)).role) {
      // const acceptUser = (JSON.parse(request.cookies.get("user").value))
      // if(acceptUser.role)
      return NextResponse.next()   }

    return NextResponse.rewrite(new URL('/', request.url))
  }

}


// export const config = {
//   matcher: ['/dashboard', '/login']
// }