import type { NextPage } from "next";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";

import { getUserById, getUserIdByUsername } from "@/model/User";
import { getPostsFromUser } from "@/model/Post";
import Layout from "@/components/Layout";

interface UserProps {
  user: {};
  latestPosts: [];
}

const User: NextPage<UserProps> = ({ user, latestPosts }) => {
  return (
    <>
      <Layout>
        <h1>/{user?.username}</h1>
        <p>{JSON.stringify(user, null, 2)}</p>
        <ul>
          {latestPosts?.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/${user.username}/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
                <p>{JSON.stringify(post, null, 2)}</p>
              </li>
            );
          })}
        </ul>
      </Layout>
    </>
  );
};

export default User;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username;
  if (!username) {
    return { notFound: true };
  }

  const userId = await getUserIdByUsername(username);
  if (!userId) {
    return { notFound: true };
  }

  const [user, latestPosts] = await Promise.all([
    getUserById(userId),
    getPostsFromUser(userId),
  ]);

  return {
    props: { user, latestPosts },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
