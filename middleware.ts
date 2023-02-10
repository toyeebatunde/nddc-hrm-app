import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const token = request.cookies.get("token")
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if(url.pathname === "/dashboard"){
    url.pathname = "/dashboard/analytics/agent-metrics"
    return NextResponse.redirect(url)
  }

  if (url.pathname.includes("/dashboard") && token) {
    url.pathname = "/dashboard/analytics/agent-metrics"
    const status = ""
    axios.get('https://3695-41-138-165-100.eu.ngrok.io/v1/user/all', {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
      .then(response => {
        return NextResponse.redirect(url)
      })
      .catch(error => {
        url.pathname = "/"
        console.log(error)
        return NextResponse.redirect(url)
      })
  }

  // if (request.nextUrl.pathname === '/dashboard' && token) {
  //   url.pathname = "/dashboard/analytics/agent-metrics"
  //   const status = ""
  //   axios.get('https://3695-41-138-165-100.eu.ngrok.io/v1/user/all', {
  //     headers: {
  //       Authorization: `bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       return NextResponse.redirect(url)
  //     })
  //     .catch(error => {
  //       url.pathname = "/"
  //       console.log(error)
  //       return NextResponse.redirect(url)
  //     })    
  // }

 

  

}