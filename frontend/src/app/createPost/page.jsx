"use client";

import React, { useState } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { modules, formats } from "@/utils/quill";

const CreatePost = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      file: null,
    },

    onSubmit: (values, actions) => {
      createPost(values);
      actions.resetForm();
      router.push("/");
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
      summary: Yup.string().required(),
    }),
  });

  async function createPost(postData) {
    try {
      const data = new FormData();
      data.set("title", postData.title);
      data.set("summary", postData.summary);
      data.set("file", postData.file);
      data.set("content", content);

      const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/createPost`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
    } catch (e) {
      console.log(e);
      console.error(e.message);
    }
  }

  return (
    <>
      <form
        className="flex flex-col pt-10 gap-4 pb-20"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-bold text-[28px] tracking-wider text-zinc-700">
          Create a New Post
        </h2>
        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block border-zinc-400 rounded-md py-1.5 px-3"
          type="text"
          placeholder="Title"
          name="title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
        />

        {formik.touched.title && formik.errors.title && (
          <p className="font-semibold text-red-500 capitalize self-center -my-1.5">
            {formik.errors.title}
          </p>
        )}

        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block border-zinc-400 rounded-md py-1.5 px-3"
          type="text"
          placeholder="Summary"
          name="summary"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.summary}
        />

        {formik.touched.summary && formik.errors.summary && (
          <p className="font-semibold text-red-500 capitalize self-center -my-1.5">
            {formik.errors.summary}
          </p>
        )}

        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block border-zinc-400 rounded-md py-1.5 px-3"
          type="file"
          name="file"
          onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
        />

        <ReactQuill
          className="border"
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
          value={content}
        />
        <button
          disabled={formik.isSubmitting}
          className="py-2 font-semibold px-5 mt-2 bg-slate-500 rounded-md text-white shadow-md disabled:opacity-70 opacity-100"
          type="submit"
        >
          Create Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
