import {
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "@aws-amplify/auth/server";
import type { NextAuthOptions, User } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";
import UserService from "../services/user";
import { cookies } from "next/headers";
import { JWT } from "next-auth/jwt";
import { runWithAmplifyServerContext } from "../utils/amplify-utils";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }): Promise<JWT> {
      if (trigger === "update") {
        token.user.categoryId = session.user.categoryId;
        token.user.subCategoryId = session.user.subCategoryId;
        token.user.description = session.user.description;
      }
      if (account) {
        const authSession = await runWithAmplifyServerContext({
          nextServerContext: { cookies },
          operation: (contextSpec) => {
            return fetchAuthSession(contextSpec);
          },
        });
        return {
          ...token,
          user: user,
          jwtToken: authSession?.tokens?.idToken?.toString(),
          // accessToken: cognitoUser.signInUserSession.accessToken.jwtToken,
          accessToken: "",
          refreshToken: "",
          issuedAt: authSession.tokens?.idToken?.payload.iat,
          expiresAt: authSession.tokens?.idToken?.payload.exp,
          expiresIn:
            (authSession.tokens?.idToken?.payload.exp ?? 0) -
            (authSession.tokens?.idToken?.payload.iat ?? 0),
          error: "",
        } as JWT;
      } else if (Date.now() < (token.expiresAt - 300) * 1000) {
        return token;
      } else {
        try {
          const authSession = await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: (contextSpec) => {
              return fetchAuthSession(contextSpec, { forceRefresh: true });
            },
          });
          console.log(authSession.tokens?.idToken?.toString());
          token.user.issuedAt = authSession.tokens?.idToken?.payload.iat ?? 0;
          token.user.expiresAt = authSession.tokens?.idToken?.payload.iat ?? 0;
          token.user.expiresIn =
            (authSession.tokens?.idToken?.payload.exp ?? 0) -
            (authSession.tokens?.idToken?.payload.iat ?? 0);
          return {
            ...token,
            jwtToken: authSession?.tokens?.idToken?.toString(),
            accessToken: "",
            refreshToken: "",
            issuedAt: authSession.tokens?.idToken?.payload.iat ?? 0,
            expiresAt: authSession.tokens?.idToken?.payload.exp ?? 0,
            expiresIn:
              (authSession.tokens?.idToken?.payload.exp ?? 0) -
              (authSession.tokens?.idToken?.payload.iat ?? 0),
            error: "",
          } as JWT;
        } catch (error) {
          console.error("Error refreshing access token: ", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token, user }) {
      if (session && token) {
        session.token = token.jwtToken;
        session.issuedAt = token.issuedAt;
        session.expiresAt = token.expiresAt;
        session.expiresIn = token.expiresIn;
        session.user = token.user;
        session.error = token.error;
      }
      console.log(session);
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url);
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          // Amplify.configure(
          //   {
          //     Auth: {
          //       Cognito: {
          //         userPoolId: "us-east-1_ZPe1B2fvp",
          //         userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
          //         identityPoolId:
          //           "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
          //       },
          //     },
          //   },
          //   {
          //     ssr: true,
          //   }
          // );

          // await runWithAmplifyServerContext({
          //   nextServerContext: { cookies },
          //   operation: async (contextSpec) => {
          //     console.log(contextSpec);

          //   },
          // });

          // const { isSignedIn, nextStep } = await signIn({
          //   username: email,
          //   password: password,
          //   options: {
          //     serviceOptions: {
          //       clientMetadata: metadata,
          //       // authFlowType: "USER_SRP_AUTH",
          //     },
          //   },
          // });

          const attributes = await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: (contextSpec) => {
              return fetchUserAttributes(contextSpec);
            },
          });

          const userInfo = await UserService.getByUserLogin(
            attributes.email ?? ""
          );

          return {
            ...userInfo!,
            name: `${attributes.name} ${attributes.family_name}}`,
            email: `${attributes.email}`,
          };
        } catch (e) {
          console.error(e);
          throw e;
        }
      },
    }),
    // CognitoProvider({
    //   clientId: "AKIA57HVXUCFUID47FPO",
    //   clientSecret: "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",
    //   issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ZPe1B2fvp",
    // }),
  ],
};
