import type { NextPage } from "next";

import Layout from "@/components/Layout";

// FIXME: only logged users allowed
const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  );
};

export default Home;
