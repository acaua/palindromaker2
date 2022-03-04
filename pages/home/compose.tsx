import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

const PostCompose: NextPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const post = {
      title: event.target.title.value,
      content: event.target.content.value,
    };

    try {
      const response = await fetch("/api/post", {
        body: JSON.stringify(post),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error();
      }

      router.push("/home");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Layout>
        <h1>Compose</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              maxLength={100}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              placeholder="Content"
              required
              maxLength={10000}
            />
          </div>
          {status === "error" && <div>Error</div>}
          <button type="submit" disabled={status === "submitting"}>
            Post
          </button>
        </form>
      </Layout>
    </>
  );
};

PostCompose.auth = true;

export default PostCompose;
