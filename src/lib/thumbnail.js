const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function validateMediaFile(file) {
  if (!file.type.startsWith("video/") && !file.type.startsWith("image/")) {
    return "Only video and image files are allowed.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File exceeds the 50MB limit.";
  }
  return null;
}

// Returns a Blob (jpg) for videos, or the original File for images.
export async function generateThumbnail(file) {
  if (file.type.startsWith("image/")) return file;
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    const url = URL.createObjectURL(file);
    video.src = url;
    video.onloadedmetadata = () => {
      video.currentTime = Math.min(0.1, (video.duration || 1) / 2);
    };
    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 180;
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            blob ? resolve(blob) : reject(new Error("Thumbnail generation failed"));
          },
          "image/jpeg",
          0.8
        );
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this video file"));
    };
  });
}

export const isImageUrl = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url || "");