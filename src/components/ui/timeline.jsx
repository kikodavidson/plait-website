import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Lock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(callback, options) {
  const deps = options && options.dependencies || [];
  const scope = options && options.scope;
  const ctxRef = useRef(null);
  const cleanupRef = useRef(undefined);

  useLayoutEffect(() => {
    const el =
    scope && typeof scope === "object" && "current" in scope ?
    scope.current :
    scope;
    ctxRef.current = gsap.context(() => {}, el || undefined);
    return () => {
      if (cleanupRef.current) cleanupRef.current();
      cleanupRef.current = undefined;
      if (ctxRef.current) ctxRef.current.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    if (cleanupRef.current) cleanupRef.current();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
}

function ItemContent({ item, activeColor, mutedTextStyle }) {
  return (
    <>
      {item.tag &&
      <span
        className="inline-block w-fit rounded-full px-[0.6vw] py-[0.15vw] text-[0.7vw] font-bold text-white max-[600px]:px-[2.5vw] max-[600px]:py-[0.8vw] max-[600px]:text-[3vw]"
        style={{ backgroundColor: activeColor }}>
        
          {item.tag}
        </span>
      }
      <h4
        className={`ti-name-${item.id} text-[1.25vw] leading-[1.1] max-[600px]:text-[5.4vw]`}>
        
        {item.name}
      </h4>
      {item.detail &&
      <p
        className={`ti-desc-${item.id} w-[90%] text-[0.85vw] leading-[1.25] max-[600px]:text-[3.4vw]`}
        style={mutedTextStyle}>
        
          {item.detail}
        </p>
      }
      <p className="text-[0.7vw] leading-[1.35] max-[600px]:text-[3vw]" style={mutedTextStyle}>
        {item.meta}
      </p>
      {item.waitOn &&
      <p
        className="flex items-center gap-[0.35vw] text-[0.7vw] leading-[1.35] max-[600px]:gap-[1.5vw] max-[600px]:text-[3vw]"
        style={mutedTextStyle}>
        
          <Lock className="size-[0.75vw] shrink-0 max-[600px]:size-[3vw]" strokeWidth={2.4} />
          <span>Waiting on: {item.waitOn}</span>
        </p>
      }
    </>);

}

/**
 * Pinned horizontal-scroll timeline. The section pins to the viewport while the
 * track slides sideways; each milestone draws its stem and reveals its copy as
 * it reaches the centre line. Items alternate above and below the line in
 * chronological order.
 */
export default function Timeline({
  title = "Timeline",
  periodLabel = "",
  textColor = "#1a1a1a",
  mutedTextColor = "#6b6b6b",
  activeColor = "#619e80",
  backgroundColor = "#ffffff",
  imageUrl,
  imageAlt = "",
  duration,
  scrollDuration = 1.2,
  items = []
}) {
  const sectionRef = useRef(null);
  const wholeSliderRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);
  const activeStyle = { backgroundColor: activeColor };
  const mutedTextStyle = { color: mutedTextColor };

  const topItems = [];
  const bottomItems = [];
  items.forEach((item, i) => {
    const entry = { ...item, index: i };
    if (i % 2 === 0) topItems.push(entry);else
    bottomItems.push(entry);
  });

  useGSAP(() => {
    const section = sectionRef.current;
    const track = wholeSliderRef.current;
    if (!section || !track) return;

    const isMobile = window.innerWidth < 600;
    const lineWidth = isMobile ? "65%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : "92% bottom";

    // Slide far enough that the last card ends at the right edge.
    const trackLeft = track.getBoundingClientRect().left;
    let maxRight = 0;
    track.querySelectorAll("[data-edge]").forEach((el) => {
      maxRight = Math.max(maxRight, el.getBoundingClientRect().right - trackLeft);
    });
    const overflow = Math.max(0, maxRight - window.innerWidth);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true
      },
      defaults: { ease: "none" }
    });
    tl.fromTo(track, { x: 0 }, { x: -overflow });

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, { dependencies: [reducedMotion, items.length], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.ti-name-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.ti-desc-${item.id}`, { opacity: 1, clearProps: "transform" });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, { scaleY: 0 });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.ti-name-${item.id}`, { opacity: 1 });
      gsap.set(`.ti-desc-${item.id}`, { opacity: 1 });
    });

    const nameSplits = {};
    const descSplits = {};
    items.forEach((item) => {
      nameSplits[item.id] = new SplitText(`.ti-name-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines"
      });
      if (document.querySelector(`.ti-desc-${item.id}`)) {
        descSplits[item.id] = new SplitText(`.ti-desc-${item.id}`, {
          type: "chars, words, lines",
          mask: "lines"
        });
      }
    });

    const createItemTimeline = (item, startPos, endPos) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true
        }
      });

      timeline.
      to(`.jl-${item.id}`, {
        scaleY: 1,
        duration: normalizedDuration * 0.4
      }).
      to(
        `.jd-${item.id}`,
        {
          scale: 1,
          duration: normalizedDuration * 0.4
        },
        "<"
      );

      const nameLines = nameSplits[item.id] && nameSplits[item.id].lines || [];
      if (nameLines.length) {
        timeline.fromTo(
          nameLines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8 * normalizedDuration,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out"
          }
        );
      }
      const descLines = descSplits[item.id] && descSplits[item.id].lines || [];
      if (descLines.length) {
        timeline.fromTo(
          descLines,
          { y: 100 },
          {
            y: 0,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out"
          },
          "<"
        );
      }

      return timeline;
    };

    const isMobile = window.innerWidth < 600;
    const span = isMobile ? 22 : 18;
    const startMin = isMobile ? 14 : 4;
    const startMax = (isMobile ? 76 : 96) - span;
    const n = items.length;
    items.forEach((item, i) => {
      const s = n <= 1 ? startMin : startMin + i * (startMax - startMin) / (n - 1);
      createItemTimeline(item, s, s + span);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh();

    return () => {
      Object.values(nameSplits).forEach((split) => split && split.revert && split.revert());
      Object.values(descSplits).forEach((split) => split && split.revert && split.revert());
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, { dependencies: [normalizedDuration, reducedMotion, items.length], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vw] w-full max-[600px]:h-[400vh]"
      style={{ color: textColor, backgroundColor }}>
      
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-[8vh] max-[600px]:pt-[6vh]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[30vw] w-[340vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[3000vw] max-[600px]:px-[7vw]">
          
          








          

          <div className="relative h-full w-full">
            <div className="absolute left-0 top-[49%] flex h-fit w-full -translate-y-1/2 items-center">
              <div className="size-[0.8vw] rounded-full max-[600px]:size-[2vw]" style={activeStyle} />
              <div className="journey-line h-px w-[0%] rounded-full" style={activeStyle} />
              <div className="size-[0.8vw] rounded-full max-[600px]:size-[2vw]" style={activeStyle} />
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[6vw] max-[600px]:gap-[30vw]">
              <div className="h-full w-[14%] shrink-0 pt-[2vw] max-[600px]:w-[20%]">
                <h2 className="w-[65%] text-[2.6vw] leading-[0.95] max-[600px]:text-[8.5vw]">
                  {title}
                </h2>
              </div>

              {topItems.map((item) =>
              <div
                key={item.id}
                data-edge
                className="relative h-full w-[17vw] px-[2vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw]">
                
                  <div className="absolute bottom-0 left-0 top-0 h-full w-full">
                    <div
                    className={`relative aspect-square size-[0.9vw] -translate-x-1/2 rounded-full jd-${item.id} max-[600px]:size-[2.5vw]`}
                    style={activeStyle} />
                  
                    <div
                    className={`origin-bottom h-[94%] w-px rounded-full jl-${item.id} max-[600px]:h-full`}
                    style={activeStyle} />
                  
                  </div>

                  <div className="mt-[-1vw] space-y-[0.5vw] max-[600px]:mt-[-2vw]">
                    <ItemContent item={item} activeColor={activeColor} mutedTextStyle={mutedTextStyle} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex h-1/2 w-full items-center justify-start">
              <div className="h-full w-[16%] shrink-0 pt-[2vw] max-[600px]:w-[30%]">
                <p
                  className="text-[1.65vw] leading-none max-[600px]:text-[4.2vw]"
                  style={mutedTextStyle}>
                  
                  {periodLabel}
                </p>
              </div>

              <div className="ml-[7vw] flex h-full w-full gap-[7vw] max-[600px]:ml-[7vw] max-[600px]:gap-[30vw]">
                {bottomItems.map((item) =>
                <div
                  key={item.id}
                  data-edge
                  className="relative h-full w-[17vw] px-[2vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]">
                  
                    <div className="absolute bottom-[-1%] left-0 h-full w-full">
                      <div
                      className={`origin-top h-[94%] w-px rounded-full jl-${item.id} max-[600px]:h-full`}
                      style={activeStyle} />
                    
                      <div
                      className={`relative aspect-square size-[0.9vw] -translate-x-1/2 rounded-full jd-${item.id} max-[600px]:size-[2.5vw]`}
                      style={activeStyle} />
                    
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[0.5vw]">
                      <ItemContent item={item} activeColor={activeColor} mutedTextStyle={mutedTextStyle} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}