import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { object, string, optional, size, validate } from "superstruct";

import { createPost } from "@/model/Post";

const PostSchema = object({
  title: optional(size(string(), 0, 100)),
  content: size(string(), 0, 10000),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const [errBodyValidation, post] = validate(req.body, PostSchema);
  if (errBodyValidation) {
    return res.status(400).json({ error: errBodyValidation });
  }

  // @ts-ignore
  const postCreated = await createPost(session.user.id, post);
  if (!postCreated) {
    return res.status(500).end();
  }

  res.status(200).json({ result: "ok", data: postCreated });
}
