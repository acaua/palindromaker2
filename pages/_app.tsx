import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useSession, signIn } from "next-auth/react";

import "@/styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;

/*
Based on this:
https://github.com/nextauthjs/next-auth/issues/1210

FIXME: fix typescript types
*/
function Auth({ children }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn("twitter");
    },
  });

  if (session) {
    return children;
  }

  return <div>Loading...</div>;
}
