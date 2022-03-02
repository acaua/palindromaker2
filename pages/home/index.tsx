import type { NextPage } from "next";

import Layout from "@/components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  );
};

Home.auth = true;

export default Home;
