"use client";

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
      <UserButton
        afterSignOutUrl="/sign-in"
        onSignOut={() => {
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 100);
        }}
      />
    </div>
  );
}
