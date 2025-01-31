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
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setRedirecting(false);
      if (isSignedIn) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }
  }, [isSignedIn, isLoading, router]);

  if (redirecting || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <UserButton />
    </div>
  );
}
