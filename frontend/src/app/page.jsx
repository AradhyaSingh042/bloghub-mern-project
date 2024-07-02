"use client";

import React, { useContext, useEffect, useState } from "react";
// import Post from "@/components/Post";
import dynamic from "next/dynamic";
const Post = dynamic(() => import("@/components/Post"));
import { UserContext } from "@/context/UserContext";

export default function Home() {
  const { posts, setPosts } = useContext(UserContext);

  useEffect(() => {
    fetchPostData();
  }, [posts]);

  async function fetchPostData() {
    const res = await fetch("http://localhost:4000/api/v1/getPosts");
    const data = await res.json();
    setPosts(data.data);
  }

  return (
    <>
      {posts.length > 0 &&
        posts.reverse().map((post) => {
          return <Post key={post._id} postData={post} />;
        })}
    </>
  );
}
