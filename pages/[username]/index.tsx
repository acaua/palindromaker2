import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";

import Layout from "@/components/Layout";

interface UserProps {
  user: {};
  latestPosts: [];
}

const User: NextPage<UserProps> = ({ user, latestPosts }) => {
  return (
    <>
      <Layout>
        <h1>/[username]</h1>
        <h1>/{user?.username}</h1>
        {latestPosts?.map((post) => {
          return <li key={post.id}>{JSON.stringify(post)}</li>;
        })}
      </Layout>
    </>
  );
};

export default User;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username;
  const user = { username };
  const latestPosts: {}[] = [];

  return {
    props: { user, latestPosts },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
