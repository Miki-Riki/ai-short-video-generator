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

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard"); // Ensures navigation happens immediately
    } else {
      router.replace("/sign-in");
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <UserButton
        afterSignOutUrl="/sign-in"
        onSignOut={() => {
          setTimeout(() => {
            window.location.href = "/sign-in"; // Forces a hard refresh after sign-out
          }, 100); // Small delay ensures session is fully cleared
        }}
      />
    </div>
  );
}
