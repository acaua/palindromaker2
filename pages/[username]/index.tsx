import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";

import { getUserById, getUserIdByUsername, UserType } from "@/model/User";
import { getPostsFromUser, PostType } from "@/model/Post";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import User from "@/components/User";

interface UserProps {
  user: UserType;
  latestPosts: [PostType];
}

const UserPage: NextPage<UserProps> = ({ user, latestPosts }) => {
  return (
    <>
      <Layout>
        <User user={user} />
        <h1>Latest posts</h1>
        {latestPosts?.map((post) => {
          return (
            <div key={post.id}>
              <Post authorUsername={user.username} post={post} />
            </div>
          );
        })}
      </Layout>
    </>
  );
};

export default UserPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = params?.username as string;
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
