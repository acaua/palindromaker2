import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>Palindromaker</title>
        <meta name="description" content="Palindromaker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Palindromaker</h1>

        {session ? (
          <>
            Signed in as {JSON.stringify(session, null, 2)} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn("twitter")}>Sign in</button>
          </>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
};

export default Home;
