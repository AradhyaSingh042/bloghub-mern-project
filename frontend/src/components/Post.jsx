import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

import { motion } from "framer-motion";

const Post = ({ postData }) => {
  return (
    <>
      <motion.div
        className="post -space-x-1 mb-[36px]"
        initial={{
          x: -1100,
        }}
        animate={{
          x: 0,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          type: "spring",
        }}
      >
        <div className="image-container">
          <Link href={`/post/${postData._id}`}>
            <Image
              src={"https://bloghub-backend-itag.onrender.com/" + postData.cover}
              width={400}
              height={400}
              alt="blogThumbnail"
            />
          </Link>
        </div>
        <div className="text-content flex flex-col gap-4">
          <Link href={`/post/${postData._id}`}>
            <h2 className="title font-bold text-3xl">{postData.title}</h2>
          </Link>
          <p className="info flex gap-2.5 -mt-2 text-zinc-700 font-bold">
            <a href="#" className="author text-zinc-800">
              @{postData.author.username}
            </a>

            <time>
              {format(new Date(postData.createdAt), "MMMM d, yyyy HH:mm")}
            </time>
          </p>
          <p className="summary text-zinc-600 font-medium">
            {postData.summary}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Post;
