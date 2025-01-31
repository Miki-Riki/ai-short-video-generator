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

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoading } = useUser();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Check if the user session has changed and we're not loading
    if (!isLoading) {
      if (initialLoad) {
        setInitialLoad(false); // Mark initial load as complete
      } else if (isSignedIn) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }
  }, [isSignedIn, isLoading, router, initialLoad]);

  return (
    <div>
      <UserButton />
    </div>
  );
}

