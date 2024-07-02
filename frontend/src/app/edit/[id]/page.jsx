"use client";

import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

import { modules, formats } from "@/utils/quill";

const EditPostPage = ({ params }) => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const { id } = params;
  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      file: null,
    },

    onSubmit: (values, actions) => {
      editPost(values);
      actions.resetForm();
      router.push(`/post/${id}`);
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
      summary: Yup.string().required(),
    }),
  });

  useEffect(() => {
    fetchEditPostData();
  }, []);

  async function fetchEditPostData() {
    const res = await fetch(`http://localhost:4000/api/v1/post/${id}`);
    const data = await res.json();
    formik.setFieldValue("title", data.data.title);
    formik.setFieldValue("summary", data.data.summary);
    formik.setFieldValue("file", data.data.file);
    setContent(data.data.content);
  }

  async function editPost(postData) {
    const data = new FormData();
    data.set("title", postData.title);
    data.set("summary", postData.summary);
    data.set("file", postData.file);
    data.set("content", content);

    const res = await fetch(`http://localhost:4000/api/v1/editPost/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    const finalData = await res.json();
  }

  return (
    <>
      <form
        className="flex flex-col pt-10 gap-4 pb-20"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-bold text-[28px] tracking-wider text-zinc-700">
          Edit your Post
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
          onChange={(e) => formik.setFieldValue("file", e.target.files?.[0])}
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
          className="py-2 font-semibold px-5 mt-2 bg-slate-600 rounded-md text-white shadow-md disabled:opacity-70 opacity-100"
          type="submit"
        >
          Update Post
        </button>
      </form>
    </>
  );
};

export default EditPostPage;
