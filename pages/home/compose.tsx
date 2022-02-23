import type { NextPage } from "next";

import Layout from "@/components/Layout";

// FIXME: only logged users allowed
const PostCompose: NextPage = () => {
  return (
    <>
      <Layout>
        <h1>PostCompose</h1>
      </Layout>
    </>
  );
};

export default PostCompose;
