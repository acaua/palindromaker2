import type { NextPage } from "next";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { getPostsFromUser } from "@/model/Post";
import Layout from "@/components/Layout";

interface HomeProps {
  posts: [];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
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
        <ul>
          {posts?.map((post) => {
            return (
              <li key={post.id}>
                <p>{JSON.stringify(post, null, 2)}</p>
              </li>
            );
          })}
        </ul>
      </Layout>
    </>
  );
};

Home.auth = true;

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return { props: { session: null } };
  }

  const posts = (await getPostsFromUser(session.user.id)) || [];

  return {
    props: { session, posts },
  };
};
