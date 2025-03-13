"use client";
import { FormEvent, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "@/app/login/page.css";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
  }

  return (
    <section id="login">
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <h1>Sign In</h1>
        <label>Email</label>
        <input type="email" placeholder="Email" name="email" />
        <label>Password</label>

        <input type="password" placeholder="Password" name="password" />

        <button>Sign In</button>

        <button onClick={() => signIn("google", { callbackUrl: "/" })}>
          Sign In with Google
        </button>

        <Link className="link-button" href="/register">
          Don&apos;t have an account?
        </Link>
      </form>
    </section>
  );
}
