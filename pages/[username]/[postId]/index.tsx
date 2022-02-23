import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";

import Layout from "@/components/Layout";

interface PostProps {
  user: {};
  post: {};
}

const Post: NextPage<PostProps> = ({ user, post }) => {
  return (
    <>
      <Layout>
        <h1>/[username]/[postId]</h1>
        <h1>{`/${user?.username}/${post?.postId}`}</h1>
      </Layout>
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  // Pass post data to the page via props
  console.log(params);

  const username = params?.username;
  const postId = params?.postId;
  const user = { username };
  const post = { postId };

  return {
    props: { user, post },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
