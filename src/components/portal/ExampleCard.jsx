import React, { useRef, useState } from "react";
import { Volume2, VolumeX, Maximize2 } from "lucide-react";

export default function ExampleCard({ ex }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    v.play?.();
    setMuted(v.muted);
  };

  const goFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#2d2d2d] shadow-sm">
      <div className="relative bg-black aspect-[9/16]">
        {ex.file_url ? (
          <video
            ref={videoRef}
            src={ex.file_url}
            poster={ex.thumbnail_url}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-contain"
          />
        ) : ex.thumbnail_url ? (
          <img src={ex.thumbnail_url} alt={ex.label || ""} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">No media</div>
        )}
        {ex.file_url && (
          <>
            <button
              onClick={toggleMute}
              className="absolute bottom-2 left-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70"
              aria-label="Toggle mute"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={goFullscreen}
              className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
      {ex.note && <p className="text-xs text-white/70 px-3 py-2 leading-relaxed">{ex.note}</p>}
    </div>
  );
}