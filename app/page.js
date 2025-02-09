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

  // Function to handle logout and force refresh
  const handleSignOut = async () => {
    await signOut();  // Clerk sign out
    router.push("/sign-in");  // Redirect to sign-in page
    router.refresh();  // Force Next.js to reload the page
  };

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

