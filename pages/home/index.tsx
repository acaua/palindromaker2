import type { NextPage } from "next";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";

import { getPostsFromUser, PostType } from "@/model/Post";
import Layout from "@/components/Layout";
import Post from "@/components/Post";

interface HomeProps {
  posts: [PostType];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { data: session } = useSession();
  return (
    <>
      <Layout>
        <h1>Home</h1>
        <Link href={"/home/compose"}>
          <a>
            <h2>Compose</h2>
          </a>
        </Link>
        <h2>Latest posts</h2>
        {posts?.map((post) => {
          return (
            <div key={post.id}>
              <Post
                authorUsername={
                  // @ts-ignore
                  session.user.username
                }
                post={post}
              />
            </div>
          );
        })}
      </Layout>
    </>
  );
};

// @ts-ignore
Home.auth = true;

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return { props: { session: null } };
  }

  // @ts-ignore
  const posts = (await getPostsFromUser(session.user.id)) ?? [];

  return {
    props: { session, posts },
  };
};
