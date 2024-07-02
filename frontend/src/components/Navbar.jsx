"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetchProfileData();
  }, []);

  async function fetchProfileData() {
    const res = await fetch("http://localhost:4000/api/v1/profile", {
      credentials: "include",
    });

    const data = await res.json();
    if (data) {
      setUserInfo(data);
    }
  }

  async function logout() {
    const res = await fetch("http://localhost:4000/api/v1/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
    router.push("/login");
  }

  const username = userInfo?.username;

  return (
    <>
      <header className="flex flex-row mt-2 justify-between items-center mb-[50px]">
        <Link
          className={`logo font-bold tracking-[0.07em] text-3xl ${bebas.className}`}
          href="/"
        >
          BlogHub
        </Link>
        <nav>
          {username && (
            <div className="flex flex-row gap-4">
              <Link className="link font-medium capitalize" href="/createPost">
                New Post
              </Link>
              <button className="link font-medium" onClick={logout}>
                Logout
              </button>
            </div>
          )}

          {!username && (
            <div className="flex flex-row gap-4">
              <Link className="link font-medium" href="/login">
                Login
              </Link>
              <Link className="link font-medium" href="/register">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
