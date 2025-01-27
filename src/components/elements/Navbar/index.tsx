"use client";

import { useAuthContext } from "@/components/context";
import { deleteCookie } from "cookies-next";
import { LogInIcon, LogOutIcon, UserPenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation"; // Import usePathname
import React, { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const [isScrolledToScreen, setIsScrolledToScreen] = useState(false);
  const pathname = usePathname(); // Get current route path
  const router = useRouter();

  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const logout = () => {
    deleteCookie("AT");
    setIsAuthenticated(false);
    router.push("/");
  };

  const login = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/code_grant_auth`
    );
    const responseJson = await response.json();
    window.location.href = responseJson.url;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsScrolledToScreen(true);
      } else {
        setIsScrolledToScreen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname === "/login" || pathname === "/register") {
    return (
      <nav className="w-screen absolute h-16 p-2 flex justify-center bg-white drop-shadow-md">
        <Link href={"/"}>
          <div className="relative h-full aspect-square">
            <Image
              src={"/logo-no-background.png"}
              fill
              className="object-contain"
              alt="Logo"
            />
          </div>
        </Link>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed z-50 w-full py-4 transition-colors duration-300 overflow-hidden  ${
        // isScrolledToScreen && pathname=="/" ? 'bg-[#0F172A] shadow-md' : 'bg-transparent'
        pathname == "/"
          ? isScrolledToScreen
            ? "bg-[#0F172A] shadow-md"
            : "bg-transparent"
          : "bg-[#0F172A] shadow-md"
      }`}
    >
      {isScrolledToScreen && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2  w-[400px] h-[400px] rounded-full bg-radial-gradient from-purple-700/50 via-violet-800/10 to-transparent blur-3xl" />
      )}
      <div className="container px-4 mx-auto flex justify-between relative">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="relative w-10 aspect-square">
            <Image
              src={"/logo-no-background.png"}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="bg-gradient-to-r hidden lg:block from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent font-bold text-3xl">
            DocuForge
          </span>
        </div>
        <div className="hidden sm:flex justify-between gap-10 self-center text-white mr-28">
          {/* <Link href={'/'}>Home</Link> */}
          {isAuthenticated && (
            <>
              <Link href={"/generate"}>Generate Document</Link>
              <Link href={"/dashboard"}>Dashboard</Link>
              <Link href={"/chatbot"}>Chatbot</Link>
            </>
          )}
        </div>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="text-red-500 gap-2 sm:flex items-center"
          >
            <span>Logout</span>
            <LogOutIcon />
          </button>
        ) : (
          <div className="flex items-center gap-10">
            {/* <Link href={'/register'} className="hidden sm:block">
              <button className="text-[#e0e3f9]  gap-2 sm:flex items-center">
                <span>Register</span>
                <UserPenIcon />
              </button>
            </Link> */}
            {/* <Link href={'/login'}>
              <button className="text-[#e0e3f9] gap-2 flex items-center">
                <span>Login</span>
                <LogInIcon />
              </button>
            </Link> */}
            <button
              onClick={login}
              className="text-[#e0e3f9] gap-2 flex items-center"
            >
              <span>Login</span>
              <LogInIcon />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
