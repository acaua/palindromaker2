import Link from "next/link";

import { PostType } from "@/model/Post";

type PostProps = {
  post: PostType;
  authorUsername: string;
};

export default function Post({ post, authorUsername }: PostProps) {
  const postUrl = authorUsername ? `/${authorUsername}/${post.id}` : "#";

  return (
    <div>
      <Link href={postUrl}>
        <a>
          <h2>{post.title}</h2>
        </a>
      </Link>
      <p>{JSON.stringify(post, null, 2)}</p>
    </div>
  );
}
