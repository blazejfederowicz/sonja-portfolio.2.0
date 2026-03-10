// middleware.ts
import { NextResponse, type NextRequest } from "next/server"
import supabaseAdmin from "./src/lib/supabaseAdmin"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const cookie = req.cookies.get("sb:token")?.value

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(cookie)

  if (!user || error) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}