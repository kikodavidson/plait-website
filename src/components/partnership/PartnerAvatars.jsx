import React, { useEffect, useRef, useState } from "react";
import { Camera, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { ACCENT, ACCENT_TEXT } from "./accent";

const PARTNERS = ["Luke", "Max"];

const custom = (record) => record?.partnership_avatar || record?.data?.partnership_avatar || null;

/** Round partner photos with a green check once approved; your own chip uploads a photo. */
export default function PartnerAvatars({ section, userName, user }) {
  const [photos, setPhotos] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const found = {};
      try {
        const users = await base44.entities.User.list();
        PARTNERS.forEach((name) => {
          const rec = (users || []).find((u) =>
            (u.full_name || "").toLowerCase().startsWith(name.toLowerCase())
          );
          if (rec) found[name] = custom(rec);
        });
      } catch (e) {
        // Non-admin viewers fall back to initials for the other partner.
      }
      if (!found[userName]) found[userName] = custom(user) || null;
      const signed = {};
      await Promise.all(
        PARTNERS.map(async (n) => {
          if (!found[n]) return;
          if (/^https?:\/\//.test(found[n])) {
            signed[n] = found[n]; // Public image URL — use it directly.
            return;
          }
          try {
            const res = await base44.integrations.Core.CreateFileSignedUrl({
              file_uri: found[n],
              expires_in: 3600,
            });
            signed[n] = res.signed_url;
          } catch (e) {
            // Ignore unreadable photos and show initials.
          }
        })
      );
      if (alive) setPhotos(signed);
    })();
    return () => {
      alive = false;
    };
  }, [userName, user]);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const up = await base44.integrations.Core.UploadPrivateFile({ file });
      await base44.auth.updateMe({ partnership_avatar: up.file_uri });
      const res = await base44.integrations.Core.CreateFileSignedUrl({
        file_uri: up.file_uri,
        expires_in: 3600,
      });
      setPhotos((p) => ({ ...p, [userName]: res.signed_url }));
    } catch (err) {
      // Leave the old photo in place on failure.
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {PARTNERS.map((name) => {
        const approved = name === "Luke" ? section.approved_luke : section.approved_max;
        const mine = name === userName;
        return (
          <div key={name} className="flex items-center gap-2">
            <span className="relative inline-flex" title={mine ? "Click to change your photo" : name}>
              {photos[name] ? (
                <img
                  src={photos[name]}
                  alt={name}
                  onClick={mine && !uploading ? () => fileRef.current?.click() : undefined}
                  className={`h-9 w-9 rounded-full object-cover ${mine ? "cursor-pointer ring-1 ring-white/20 hover:ring-white/50" : ""}`}
                />
              ) : (
                <span
                  onClick={mine && !uploading ? () => fileRef.current?.click() : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[14px] font-bold text-white ${
                    mine ? "cursor-pointer hover:bg-white/20" : ""
                  }`}
                >
                  {name[0]}
                </span>
              )}
              {approved && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full"
                  style={{ backgroundColor: ACCENT, color: ACCENT_TEXT }}
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
              )}
              {mine && (
                <span className="pointer-events-none absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/15 text-white/80">
                  <Camera className="h-2.5 w-2.5" />
                </span>
              )}
            </span>
            <span className="text-[12px] text-white/50">{name}</span>
          </div>
        );
      })}
      {uploading && <span className="text-[12px] text-white/40">Uploading…</span>}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={upload}
      />
    </div>
  );
}