import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const PARTNERS = ["Luke", "Max"];
const custom = (record) =>
  record?.partnership_avatar || record?.data?.partnership_avatar || null;

/** Signed photo URLs for Luke and Max (empty map until resolved; initials fallback). */
export default function usePartnerPhotos(user, userName) {
  const [photos, setPhotos] = useState({});

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
  }, [user, userName]);

  return [photos, setPhotos];
}