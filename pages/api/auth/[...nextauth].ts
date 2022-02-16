import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
    }),
  ],
  callbacks: {
    // async jwt({ token, user, account, profile, isNewUser }) {
    async jwt({ token, profile }) {
      if (profile?.data) token.profile = profile.data;

      return token;
    },
    // async session({ session, token, user }) {
    async session({ session, token }) {
      if (token?.profile) {
        session.profile = token.profile;
      }

      return session;
    },
  },
});
