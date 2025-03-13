"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/server-actions/register";
import { signIn } from "next-auth/react";

import "@/app/register/page.css";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  };

  return (
    <section id="register">
      <form ref={ref} action={handleSubmit}>
        {error && <div className="">{error}</div>}
        <h1>Register</h1>

        <label>Full Name</label>
        <input type="text" placeholder="Full Name" name="name" />

        <label>Email</label>
        <input type="email" placeholder="Email" name="email" />

        <label>Password</label>

        <input type="password" placeholder="Password" name="password" />

        <button>Sign up</button>

        <button onClick={() => signIn("google", { callbackUrl: "/" })}>
          Sign Up with Google
        </button>

        <Link className="link-button" href="/login">
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
