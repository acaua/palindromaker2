import React, { useState } from "react";
import type { NextPage } from "next";

import Layout from "@/components/Layout";

const PostCompose: NextPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const post = {
      title: event.target.title.value,
      content: event.target.content.value,
    };

    const response = await fetch("/api/post", {
      body: JSON.stringify(post),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log(result);
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
          <button type="submit">Post</button>
        </form>
      </Layout>
    </>
  );
};

PostCompose.auth = true;

export default PostCompose;
