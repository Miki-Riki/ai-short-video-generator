"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

function Header({ toggleSideNav, isSideNavVisible }) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { session } = useClerk();

  useEffect(() => {
    // Listen for changes in session state (logout)
    const unsubscribe = session?.addListener("sessionEnded", () => {
      router.push("/sign-in");
      router.refresh(); // Force reload
    });

    return () => {
      unsubscribe?.(); // Cleanup listener
    };
  }, [router, session]);

  return (
    <div className="p-1 px-5 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <Image src={"/logo.png"} alt="logo" width={120} height={120} />
      </div>
      <div className="flex gap-3 items-center">
        <UserButton afterSignOutUrl="/sign-in" />
        <button
          onClick={toggleSideNav}
          className="lg:hidden p-2 text-gray-700 hover:text-black"
        >
          {isSideNavVisible ? <X /> : <Menu />}
        </button>
      </div>
    </div>
  );
}

export default Header;
