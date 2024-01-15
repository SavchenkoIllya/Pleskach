// // import NextAuth from "next-auth";
// import NextAuth from "next-auth";
// // import NextAuthConfig from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { sql } from "@vercel/postgres";
// import bcrypt from "bcrypt";
// import { AuthOptions } from "next-auth";

// export const authConfig = {
//   pages: {
//     signIn: "/dashboard/auth",
//   },
//   callbacks: {
//     authorized() {
//       return true;
//     },
//     // async authorized({ auth, request: { nextUrl } }: any) {
//     //   const isLoggedIn = !!auth?.user;
//     //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
//     //   if (isOnDashboard) {
//     //     if (isLoggedIn) return true;
//     //     return false; // Redirect unauthenticated users to login page
//     //   } else if (isLoggedIn) {
//     //     return Response.redirect(new URL("/dashboard", nextUrl));
//     //   }
//     //   return true;
//     // },
//   },
//   providers: [],
// } satisfies AuthOptions;
// // export const { auth, signIn, signOut } = NextAuth({

// async function getUser(email: string): Promise<any | undefined> {
//   try {
//     const user = await sql`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

// export const { signIn, signOut, auth } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       // `credentials` is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@mail.de",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Add logic here to look up the user from the credentials supplied
//         if (credentials) {
//           const { email, password } = credentials;
//           const user = await getUser(email);

//           if (!user) {
//             console.log("No user found");
//             return null;
//           }
//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (passwordsMatch) {
//             console.log("Here is user", user);
//             return user;
//           }
//         }
//       },
//     }),
//   ],
// });

// // export { handler as GET, handler as POST };
