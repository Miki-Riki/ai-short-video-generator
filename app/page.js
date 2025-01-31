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
}

 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    // If user is signed out, replace the current URL with the same one to force a page reload
    if (!isSignedIn) {
      router.replace(window.location.href);
    } else {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}


