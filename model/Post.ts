import { get, mget, set, lpush, lrange } from "@upstash/redis";
import { v4 as uuid } from "uuid";

const POST_PREFIX = "post:";
const POST_AUTHOR_PREFIX = "post:author:";

export interface PostType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
}

export async function getPostById(postId: string) {
  const response = await get(POST_PREFIX + postId);
  if (!response.data) return null;

  let post = JSON.parse(response.data);

  return post as PostType;
}

export async function getPostsFromUser(
  userId: string,
  start: number = 0,
  stop: number = 10
) {
  const postIdsResponse = await lrange(
    POST_AUTHOR_PREFIX + userId,
    start,
    stop
  );
  if (!postIdsResponse.data) return null;

  const postIdsPrefixed = postIdsResponse.data.map(
    (postId) => POST_PREFIX + postId
  );

  let postsResponse = await mget(...postIdsPrefixed);
  if (!postsResponse.data) return null;

  const posts = postsResponse.data.map((post) => JSON.parse(post));

  return posts;
}

export async function createPost(
  authorId: string,
  post: { title: string | undefined; content: string }
) {
  const postId = uuid();
  const createdAt = Date.now();
  const postFull = { ...post, id: postId, createdAt, authorId };

  const postRes = await set(POST_PREFIX + postId, JSON.stringify(postFull));
  if (postRes.error) {
    return false;
  }

  const authorRes = await lpush(POST_AUTHOR_PREFIX + authorId, postId);
  if (authorRes.error) {
    return false;
  }

  return postFull;
}

// export async function updatePost(postId: string, updates: {}) {
//   const post = await getPostById(postId);
//   await set(POST_PREFIX + postId, JSON.stringify({ ...post, ...updates }));
// }
