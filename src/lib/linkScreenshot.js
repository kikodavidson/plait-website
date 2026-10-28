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
  const res = await base44.functions.invoke("resolveSitePreview", { url: link });
  return res.data?.image_url || null;
}