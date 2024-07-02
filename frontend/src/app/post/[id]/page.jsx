"use client";

import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

const PostPage = ({ params }) => {
  const { id } = params;
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetchSinglePostData();
  }, [postInfo]);

  async function fetchSinglePostData() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/post/${id}`
    );
    const data = await res.json();
    setPostInfo(data.data);
  }

  if (!postInfo) {
    return <></>;
  }

  return (
    <>
      <div className="postpage-container w-full flex flex-col">
        <h1 className="title font-bold text-4xl my-3 self-center">
          {postInfo.title}
        </h1>

        <time className="self-center font-semibold text-zinc-500 text-sm">
          {format(new Date(postInfo.createdAt), "MMMM d, yyyy HH:mm")}
        </time>

        <a
          href="#"
          className="author text-zinc-800 self-center mb-5 font-bold text-lg"
        >
          by @{postInfo.author.username}
        </a>

        {userInfo._id === postInfo.author._id && (
          <div className="self-center mb-7 inline-block">
            <Link
              href={`/edit/${id}`}
              className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
            >
              Edit this post
            </Link>
          </div>
        )}

        <div className="img-container">
          <img
            src={`http://localhost:4000/${postInfo.cover}`}
            className="w-full h-[28rem] object-cover object-center"
            alt="coverImage"
          />
        </div>

        <div
          className="content-box mt-6 pb-4"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        ></div>

        <Link
          href="/"
          className="my-5 bg-teal-600 text-white font-semibold py-2 px-4 rounded-md self-start"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default PostPage;
