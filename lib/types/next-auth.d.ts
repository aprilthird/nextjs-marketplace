import NextAuth, { DefaultSession } from "next-auth";
import UserModel from "../models/user";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User;
    jwtToken: string;
    accessToken: string;
    refreshToken: string;
    issuedAt: number;
    expiresAt: number;
    expiresIn: number;
    error: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends UserModel {}

  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
    token: string;
    issuedAt: number;
    expiresAt: number;
    expiresIn: number;
    error: string;
  }
}
