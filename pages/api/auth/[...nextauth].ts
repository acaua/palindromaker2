import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import upstashRedisClient from "@upstash/redis";

import { updateUsername } from "@/model/User";

const redis = upstashRedisClient();

export default NextAuth({
  adapter: UpstashRedisAdapter(redis),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
      profile(profile) {
        return { ...profile?.data };
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, profile }) {
    //   if (profile?.data) token.profile = profile.data;

    //   return token;
    // },
    async session({ session, token, user }) {
      if (user) {
        session.user = user;
      }

      // if (token?.profile) {
      //   session.user = { ...session.user, ...token.profile };
      // }

      return session;
    },
  },
  events: {
    async signIn({ user, profile }) {
      // @ts-ignore
      updateUsername(user.id, profile.username);
    },
  },
});
