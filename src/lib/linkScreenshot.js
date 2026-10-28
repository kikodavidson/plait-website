import { base44 } from "@/api/base44Client";

/** Hostname of a link, e.g. https://www.nytimes.com/... -> nytimes.com */
export const domainFor = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch (e) {
    return "";
  }
};

/** True when a URL points directly at an image file (not a website). */
export const isImageLink = (url) =>
  /\.(png|jpe?g|gif|webp|avif|svg)([?#].*)?$/i.test(url);

/**
 * Resolve a website link to an image URL.
 * 1. Screenshot via microlink (1440x900, top of page), saved to our file storage.
 * 2. Fallback: the site's Open Graph preview image.
 * Returns null when both fail.
 */
export async function resolveLinkImage(link) {
  const encoded = encodeURIComponent(link);
  const shotUrl = `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url&screenshot.width=1440&screenshot.height=900`;
  try {
    const res = await fetch(shotUrl);
    if (!res.ok) throw new Error("screenshot failed");
    const blob = await res.blob();
    const { file_url } = await base44.integrations.Core.UploadPublicFile({
      file: new File([blob], "site.png", { type: blob.type || "image/png" }),
    });
    return file_url;
  } catch (e) {
    try {
      const res = await fetch(`https://api.microlink.io/?url=${encoded}`);
      const json = await res.json();
      const og = json?.data?.image?.url;
      if (og) return og;
    } catch (e2) {
      // fall through
    }
    return null;
  }
}