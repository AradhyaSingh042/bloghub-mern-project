"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      age: "",
      email: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      register(values);
      actions.resetForm();
      router.push("/login");
    },
    validationSchema: Yup.object({
      username: Yup.string().required().min(3),
      age: Yup.number().required().positive().integer().min(16),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
  });

  async function register(formData) {
    const res = await fetch("http://localhost:4000/api/v1/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      <form
        className="register flex flex-col items-center pt-10 gap-4"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-bold text-[28px] tracking-wider uppercase text-zinc-700">
          SignUp
        </h2>
        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block border-zinc-400 rounded-md py-1.5 px-3 w-1/2"
          type="text"
          placeholder="username"
          name="username"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        {formik.touched.username && formik.errors.username && (
          <p className="font-semibold text-red-500 capitalize -my-1.5">
            {formik.errors.username}
          </p>
        )}

        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block border-zinc-400 rounded-md py-1.5 px-3 w-1/2"
          type="number"
          placeholder="age"
          name="age"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.age}
        />

        {formik.touched.age && formik.errors.age && (
          <p className="font-semibold text-red-500 capitalize -my-1.5">
            {formik.errors.age}
          </p>
        )}

        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block border-zinc-400 rounded-md py-1.5 px-3 w-1/2"
          type="email"
          placeholder="email"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {formik.touched.email && formik.errors.email && (
          <p className="font-semibold text-red-500 capitalize -my-1.5">
            {formik.errors.email}
          </p>
        )}

        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block border-zinc-400 rounded-md py-1.5 px-3 w-1/2"
          type="password"
          placeholder="password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        {formik.touched.password && formik.errors.password && (
          <p className="font-semibold text-red-500 capitalize -my-1.5">
            {formik.errors.password}
          </p>
        )}

        <button
          disabled={formik.isSubmitting}
          className="py-2 font-semibold px-5 bg-blue-600 rounded-md text-white w-1/2 shadow-md disabled:opacity-70 opacity-100"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
