"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AccountClient() {
  const { data: session, isPending } = authClient.useSession();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "signup") {
      const { error: err } = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      if (err) setError(err.message ?? "Sign up failed");
    } else {
      const { error: err } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });
      if (err) setError(err.message ?? "Sign in failed");
    }
    setLoading(false);
  }

  async function handleSignOut() {
    await authClient.signOut();
  }

  const inputClass =
    "w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-900";

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-stone-500">
        Loading...
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <h1 className="font-serif text-3xl text-stone-900 mb-2 text-center">
          My Account
        </h1>
        <p className="text-stone-500 text-sm text-center mb-8">
          Welcome back, {session.user.name}
        </p>
        <div className="bg-stone-50 p-6 border border-stone-200 space-y-3 text-sm">
          <p>
            <span className="text-stone-500">Name:</span> {session.user.name}
          </p>
          <p>
            <span className="text-stone-500">Email:</span> {session.user.email}
          </p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full mt-6 border border-stone-300 text-stone-700 py-3 text-xs tracking-[0.15em] uppercase hover:border-stone-900 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="font-serif text-3xl text-stone-900 mb-2 text-center">
        {mode === "signin" ? "Sign In" : "Create Account"}
      </h1>
      <p className="text-stone-500 text-sm text-center mb-8">
        {mode === "signin"
          ? "Sign in to track your orders"
          : "Join LUX for exclusive offers"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Password"
          required
          minLength={8}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={inputClass}
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-900 text-white py-3 text-xs tracking-[0.15em] uppercase hover:bg-amber-800 transition-colors disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "signin"
              ? "Sign In"
              : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-stone-500 mt-6">
        {mode === "signin" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-amber-700 hover:underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-amber-700 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
