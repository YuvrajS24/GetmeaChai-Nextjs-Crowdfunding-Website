import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectDb';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // Additional providers can be added here if needed
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        await connectDB();
        const currentUser = await User.findOne({ email: email });
        
        // If user doesn't exist, create a new user
        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        
        return true;
      }
      return false;
    },
    async session({ session, user, token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      
      // Assign username from database to the session object
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    }
  },
  pages: {
    signOut: '/',  // Redirect to the homepage after signing out
  }
});

export { authoptions as GET, authoptions as POST };
