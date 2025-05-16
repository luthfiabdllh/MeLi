import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name: string;
      email: string;
      role: string;
      id: string;
    };
  }

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}
