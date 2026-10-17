import React, { useRef, useState } from "react";
import { Camera, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import usePartnerPhotos from "@/hooks/usePartnerPhotos";
import { ACCENT, ACCENT_TEXT } from "./accent";

const PARTNERS = ["Luke", "Max"];

/** Round partner photos with a green check once approved; your own chip uploads a photo. */
export default function PartnerAvatars({ section, userName, user }) {
  const [photos, setPhotos] = usePartnerPhotos(user, userName);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

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
                  className={`h-9 w-9 rounded-full object-cover ring-1 ring-[#e5e2dc] ${mine ? "cursor-pointer hover:ring-[#2d6a4f]" : ""}`}
                />
              ) : (
                <span
                  onClick={mine && !uploading ? () => fileRef.current?.click() : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f0eb] text-[14px] font-bold text-[#2d6a4f] ${
                    mine ? "cursor-pointer hover:ring-1 hover:ring-[#2d6a4f]" : ""
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
                <span className="pointer-events-none absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#e5e2dc] bg-white text-[#6b6b6b] shadow-sm">
                  <Camera className="h-2.5 w-2.5" />
                </span>
              )}
            </span>
            <span className="text-[12px] text-[#6b6b6b]">{name}</span>
          </div>
        );
      })}
      {uploading && <span className="text-[12px] text-[#9a9a9a]">Uploading…</span>}
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