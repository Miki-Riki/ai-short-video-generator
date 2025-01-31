"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

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
        onSignOut={async () => {
          await signOut(); // Ensure Clerk fully signs out the user
          window.location.replace("/sign-in"); // Force a hard refresh
        }}
      />
    </div>
  );
}
