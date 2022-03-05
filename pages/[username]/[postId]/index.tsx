import type { NextPage } from "next";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";

import { getUserById, UserType } from "@/model/User";
import { getPostById, PostType } from "@/model/Post";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import User from "@/components/User";

interface PostProps {
  user: UserType;
  post: PostType;
}

const PostPage: NextPage<PostProps> = ({ user, post }) => {
  return (
    <>
      <Layout>
        <User user={user} />
        <Post authorUsername={user?.username} post={post} />
      </Layout>
    </>
  );
};

export default PostPage;

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
