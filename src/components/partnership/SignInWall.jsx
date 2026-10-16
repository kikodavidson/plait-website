import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import GoogleIcon from "@/components/GoogleIcon";

const inputClass =
  "w-full rounded-lg border border-[#dcd5c9] bg-white px-3.5 py-2.5 text-[15px] text-[#1a1a1a] outline-none focus:border-[#2d2d2d]";

export default function SignInWall() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email.trim(), password);
      window.location.href = "/partnership";
    } catch (err) {
      setError(err.message || "Invalid email or password");
      setLoading(false);
    }
  };

  const google = () => base44.auth.loginWithProvider("google", "/partnership");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#e5e2dc] p-8">
        <Lock className="mb-4 h-6 w-6 text-[#2d2d2d]" />
        <h1 className="mb-2 text-2xl">Partnership HQ</h1>
        <p className="mb-6 text-[15px] leading-relaxed text-[#6b6b6b]">
          This workspace is private to Luke and Max. Sign in to continue.
        </p>

        <button
          onClick={google}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#dcd5c9] px-5 py-2.5 text-[15px] font-semibold text-[#1a1a1a] transition-colors hover:bg-[#f5f3ef]"
        >
          <GoogleIcon className="h-4 w-4" />
          Continue with Google
        </button>

        <div className="mb-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#e5e2dc]" />
          <span className="text-[13px] text-[#6b6b6b]">or</span>
          <span className="h-px flex-1 bg-[#e5e2dc]" />
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            required
          />
          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="w-full rounded-full bg-[#2d2d2d] px-5 py-2.5 text-[15px] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-[13px] text-[#6b6b6b]">
          <Link to="/register?returnTo=%2Fpartnership" className="underline">
            Create an account
          </Link>
          <Link to="/forgot-password" className="underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}