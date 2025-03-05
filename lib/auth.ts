import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

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
    }
  };