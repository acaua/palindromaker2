import type { NextPage } from "next";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";

import { getUserById } from "@/model/User";
import { getPostById } from "@/model/Post";
import Layout from "@/components/Layout";

interface PostProps {
  user: {};
  post: {};
}

const Post: NextPage<PostProps> = ({ user, post }) => {
  return (
    <>
      <Layout>
        <Link href={`/${user.username}`}>
          <a>
            <h1>{user.username}</h1>
          </a>
        </Link>
        <a>{JSON.stringify(user, null, 2)}</a>
        <h1>{post.title}</h1>
        <p>{JSON.stringify(post, null, 2)}</p>
      </Layout>
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username;
  const postId = params?.postId;

  if (!username || !postId) {
    return { notFound: true };
  }

  const post = await getPostById(postId);
  if (!post) {
    return { notFound: true };
  }

  const user = await getUserById(post.authorId);
  if (!user || user.username !== username) {
    return { notFound: true };
  }

  return {
    props: { user, post },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
