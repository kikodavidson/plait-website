import React, { useState, useEffect } from "react";
import { X, Loader2, UserPlus } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function InviteClientDialog({ open, client, onClose }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (open) { setEmail(""); setMsg(null); setErr(null); }
  }, [open]);

  if (!open || !client) return null;

  const submit = async () => {
    setBusy(true); setErr(null); setMsg(null);
    const emailAddr = email.trim();
    const role = "client";
    try {
      let existing = null;
      try {
        const users = await base44.entities.User.list();
        existing = users.find((x) => x.email?.toLowerCase() === emailAddr.toLowerCase());
      } catch (e) { console.error("user lookup failed", e); }

      if (!existing) {
        try {
          await base44.users.inviteUser(emailAddr, role);
        } catch (e) { console.error("inviteUser failed", e); }
        try {
          const users = await base44.entities.User.list();
          existing = users.find((x) => x.email?.toLowerCase() === emailAddr.toLowerCase());
        } catch (e) { console.error("re-lookup failed", e); }
      }

      if (existing) {
        try {
          await base44.entities.User.update(existing.id, { client_slug: client.slug, role });
        } catch (e) { console.error("link failed", e); }
      }

      try {
        await base44.entities.PendingInvite.create({ email: emailAddr, client_slug: client.slug, role });
      } catch (e) { console.error("pending invite create failed", e); }

      let emailError = null;
      try {
        const res = await base44.functions.invoke("sendClientInviteEmail", {
          toEmail: emailAddr,
          clientName: client.name,
          portalUrl: `${window.location.origin}/creativelogin`
        });
        if (!res?.data?.ok) emailError = res?.data?.error || "unknown error";
      } catch (e) { emailError = e.message; }

      if (emailError) {
        setErr(`Account ${existing ? "updated" : "invited"}, but the Gmail invite email failed: ${emailError}`);
      } else {
        setMsg(`Invitation sent to ${emailAddr} and linked to ${client.name}.`);
        setEmail("");
      }
    } catch (e) {
      setErr(e.message || "Failed to invite user.");
    }
    setBusy(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#2d2d2d]" />
            <h3 className="text-lg font-bold text-[#2d2d2d]">Invite client user</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#2d2d2d]"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          They'll get an invite email and be linked to <span className="font-semibold text-[#2d2d2d]">{client.name}</span>.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="client@email.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d2d2d] mb-3"
        />
        {err && <p className="text-sm text-red-500 mb-3">{err}</p>}
        {msg && <p className="text-sm text-green-600 mb-3">{msg}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-full text-gray-500 hover:bg-gray-100">Close</button>
          <button
            onClick={submit}
            disabled={busy || !email.trim()}
            className="inline-flex items-center gap-2 text-sm btn-gradient px-4 py-2 rounded-full disabled:opacity-50"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />} Send invite
          </button>
        </div>
      </div>
    </div>
  );
}