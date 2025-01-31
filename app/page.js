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
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
    setLoading(false); // Once navigation is decided, stop loading
  }, [isSignedIn, router]);

  if (loading) {
    return (
      <div className="loading-screen">
        {/* Loading GIF from public folder */}
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return null; // Return null after loading is complete
}
