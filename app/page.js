/* "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
} */

  "use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn === undefined) return; // Wait until isSignedIn is determined
    setLoading(false);
    router.push(isSignedIn ? "/dashboard" : "/sign-in");
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>}
    </div>
  );
}
