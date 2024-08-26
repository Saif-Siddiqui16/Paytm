import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prismaSingleton";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email:credentials.email
            },
          });
          if (!user) {
            throw new Error("User doesnot exists");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
          }
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log("token" + JSON.stringify(token));
      console.log("session" + JSON.stringify(session));
      //@ts-ignore
      session.user.id = token?.sub;
      console.log("user" + user);
      return session;
    },
  },
};
