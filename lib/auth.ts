import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from 'next-auth/next';
import { connectDB } from './mongodb';
import { User } from './models/User';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          const user = await User.findOne({
            email: (credentials.email as string).toLowerCase(),
          });

          if (!user) return null;

          const isPasswordValid = await user.comparePassword(
            credentials.password as string
          );

          if (!isPasswordValid) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image ?? null,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Server-side helper used by API routes — wraps getServerSession for v4 compatibility
export async function auth() {
  return getServerSession(authOptions);
}

export default NextAuth(authOptions);
