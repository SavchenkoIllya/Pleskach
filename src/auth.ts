import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/dashboard/auth",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAuth = nextUrl.pathname.indexOf("/auth") == 0;
      const empty = nextUrl.pathname === "/dashboard";

      if (isLoggedIn) {
        if (empty || isOnAuth) {
          return NextResponse.redirect(new URL("/dashboard/profile", nextUrl));
        }
        if (isOnDashboard) {
          return true;
        }
      } else {
        if (isOnAuth) {
          return true;
        }
        return NextResponse.redirect(new URL("/", nextUrl));
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;

async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: any) {
        if (credentials) {
          const { email, password } = credentials;
          const user = await getUser(email);

          if (!user) {
            throw new Error("No user found");
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }
      },
    }),
  ],
});