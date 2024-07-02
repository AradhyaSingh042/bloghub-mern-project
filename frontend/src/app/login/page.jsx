"use client";

import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values, actions) => {
      login(values);
      actions.resetForm();
    },

    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
  });

  async function login(formData) {
    const res = await fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setUserInfo(data.data);
      router.push("/");
    } else {
      alert("Wrong credentials");
    }
    console.log(data);
  }

  return (
    <>
      <form
        className="login flex flex-col items-center pt-10 gap-4"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="font-bold text-[28px] tracking-wider uppercase text-zinc-700 text-center">
          Login
        </h2>
        <input
          className="border-2 bg-slate-100 placeholder:text-slate-500 block  border-zinc-400 rounded-md py-1.5 px-3 w-1/2"
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
          className="py-2 font-semibold px-5 bg-green-600 rounded-md text-white w-1/2 shadow-md disabled:opacity-70 opacity-100"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
