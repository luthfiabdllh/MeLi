import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/", // Redirect ke halaman utama jika belum login
  },
})

export const config = {
    matcher: [
    "/app",
    "/dashboard",
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|logo.svg|images|icon).*)",
    ],
  }