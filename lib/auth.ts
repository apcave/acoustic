import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";


declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
    accessToken?: string;
  }
}

console.log(process.env.AUTH_GOOGLE_ID);
console.log(process.env.AUTH_GOOGLE_SECRET);

export const authOptions: NextAuthOptions  = {
    providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID || "",
        clientSecret: process.env.AUTH_GOOGLE_SECRET || ""
      }),
      credentials({
        name: "Credentials",
        id: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            await connectDB();
            const user = await User.findOne({
              email: credentials?.email,
            }).select("+password");
            if (!user) throw new Error("Wrong Email");
            const passwordMatch = await bcrypt.compare(
              credentials!.password,
              user.password
            );
            if (!passwordMatch) throw new Error("Wrong Password");
            return user;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ account, profile }) {

        if (account?.provider === "google" && profile) {
          /* 
            If the auth provider is google, check if the user exists in the database.
            If the user is not in the database make a new entry.
            A user identifier is needed to associate other documents with the users.
          */

          await connectDB();
          try {
            const user = await User.findOne({ email: profile?.email });
            if (!user) {

              const newUser = new User({
                email: profile?.email,
                name: profile?.name,
              });
  
              await newUser.save();
            }
  
            return true;
          } catch (error) {
            console.log("Error saving user", error);
            return false;
          }
        }
        return true;
      },

    async jwt({ token }) {
      /*
        This callback is called whenever a new JWT is created.
        User properties are added to the JWT and later the session.
      */
      await connectDB();
      const user = await User.findOne({ email: token.email });
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      /*
        This callback is called whenever a new session is created.
        User properties are added to the session.
        These properties are available using the useSession hook.
      */
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.id = token.id as string;
      }
      return session;
    },
    }
  };
