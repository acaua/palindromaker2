import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

import Layout from "@/components/Layout";

interface PostEditProps {
  user: {};
  post: {};
}

const PostEdit: NextPage<PostEditProps> = ({ user, post }) => {
  return (
    <>
      <Layout>
        <h1>/[username]/[postId]/edit</h1>
      </Layout>
    </>
  );
};

export default PostEdit;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const session = await getSession({ req });

  const username = params?.username;
  const postId = params?.postId;
  const user = { username };
  const post = { postId };

  return {
    props: { user, post },
  };
};
