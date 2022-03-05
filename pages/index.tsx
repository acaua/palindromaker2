import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
  }

  return (
    <>
      <Layout>
        <h1>Palindromaker</h1>
        <button onClick={() => signIn("twitter")}>Sign up with Twitter</button>
      </Layout>
    </>
  );
};

export default Home;
