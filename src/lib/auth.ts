import { unstable_noStore } from "next/cache";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { AuthenticationError } from "@/utils/error";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        const dbUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!dbUser) {
          throw new Error("no user with email found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials?.password,
          dbUser.password
        );

        if (!isPasswordValid) {
          throw new Error("incorrect password");
        }

        return dbUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user?.email as string,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;

export async function getUserSession() {
  unstable_noStore();
  const session = await getServerSession(authConfig);
  return session;
}

export async function checkPermission() {
  const session = await getUserSession();
  if (!session) throw new AuthenticationError();
  return session;
}
