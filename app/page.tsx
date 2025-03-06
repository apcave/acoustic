"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import type { Metadata } from "next";


// export const metadata: Metadata = {
//   title: "Acoustic",
//   description: "Home page for the multi-layer acoustic application and Dr Alexander Paul Cave's homepage.",
// };


export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();

  console.log(status, data);

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <>
          <button
            className="border border-solid border-black rounded"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            Sign Out
          </button>
          Hello, {data?.user?.email}, {data?.user?.name}, {data?.user?.id}
        </>
      );
    } else if (status === "loading") {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      return (
        <>
          <Link
            href="/login"
            className="border border-solid border-black rounded"
          >
            Sign In
          </Link>
          <button
            className="border border-solid border-black rounded ml-2"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign In with Google
          </button>
        </>
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">Home</h1>
      {showSession()}
    </main>
  );
}