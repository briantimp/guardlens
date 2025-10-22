"use client";

import { FormEvent, useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Enter your work email.");
      return;
    }

    try {
      setStatus("pending");
      setMessage(null);
      const supabase = getBrowserSupabaseClient();

      const { error } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_APP_URL ??
            `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      setStatus("success");
      setMessage("Check your inbox for the magic link.");
    } catch (err) {
      console.error("login failed", err);
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Unable to request magic link."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg"
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-300">
          Work email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          placeholder="alex@remote-co.com"
          disabled={status === "pending" || status === "success"}
        />
      </div>

      <button
        type="submit"
        disabled={status === "pending" || status === "success"}
        className="w-full rounded-lg bg-indigo-500 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700"
      >
        {status === "pending" ? "Sending link..." : "Send me a magic link"}
      </button>

      {message ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
