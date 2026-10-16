import React, { useState, useEffect } from "react";
import { X, Loader2, UserPlus } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function InvitePartnerDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (open) {
      setEmail("");
      setMsg(null);
      setErr(null);
    }
  }, [open]);

  if (!open) return null;

  const submit = async () => {
    setBusy(true);
    setErr(null);
    setMsg(null);
    const emailAddr = email.trim().toLowerCase();
    try {
      // If the person already has an account and no workspace link, attach
      // them to the partnership workspace. Never overwrite an existing link.
      try {
        const users = await base44.entities.User.list();
        const existing = users.find((x) => x.email?.toLowerCase() === emailAddr);
        if (existing && existing.role !== "admin" && !(existing.client_slug || existing.data?.client_slug)) {
          await base44.entities.User.update(existing.id, { client_slug: "partnership" });
        }
      } catch (e) {
        console.error("user lookup failed", e);
      }

      // Applies the workspace link automatically on first sign-in.
      try {
        await base44.entities.PendingInvite.create({
          email: emailAddr,
          client_slug: "partnership",
          role: "client",
        });
      } catch (e) {
        console.error("pending invite create failed", e);
      }

      let emailError = null;
      try {
        const res = await base44.functions.invoke("sendClientInviteEmail", {
          toEmail: emailAddr,
          clientName: "Partnership HQ",
          portalUrl: "https://plaitgrowth.com/partnership",
          kind: "partnership",
        });
        if (!res?.data?.ok) emailError = res?.data?.error || "unknown error";
      } catch (e) {
        emailError = e.message;
      }

      if (emailError) {
        setErr(`Invite saved, but the invite email failed: ${emailError}`);
      } else {
        setMsg(`Invitation sent to ${emailAddr}. They can now sign in to Partnership HQ.`);
        setEmail("");
      }
    } catch (e) {
      setErr(e.message || "Failed to send invite.");
    }
    setBusy(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e5e2dc] bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-[#2d2d2d]" />
            <h3 className="text-lg">Invite Max</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#2d2d2d]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-4 text-[14px] leading-relaxed text-[#6b6b6b]">
          He'll get an invite email and be able to sign in to Partnership HQ with
          this address.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="max@email.com"
          className="mb-3 w-full rounded-lg border border-[#dcd5c9] px-3 py-2 text-[15px] outline-none focus:border-[#2d2d2d]"
        />
        {err && <p className="mb-3 text-[14px] text-red-500">{err}</p>}
        {msg && <p className="mb-3 text-[14px] text-green-600">{msg}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-[15px] text-[#6b6b6b] hover:bg-[#f5f3ef]"
          >
            Close
          </button>
          <button
            onClick={submit}
            disabled={busy || !email.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-[#2d2d2d] px-4 py-2 text-[15px] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
            Send invite
          </button>
        </div>
      </div>
    </div>
  );
}