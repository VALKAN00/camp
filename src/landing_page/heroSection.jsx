import { useEffect, useRef } from "react";
import { gsap } from "gsap";
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);


const text = {
  title: "Welcome to Our the Camp",
  description: "Experience the best of camping with us.",
};

//text writing animation using gsap
const animateText = (textElement) => {
  const text = textElement.textContent;
  textElement.textContent = "";
  const tl = gsap.timeline({ repeat: 0, yoyo: false });
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const span = document.createElement("span");
    span.textContent = char;
    textElement.appendChild(span);
    tl.fromTo(
      span,
      { opacity: 0, y: "1em" },
      { opacity: 1, y: "0em", duration: 0.05 },
      i * 0.05,
    );
  }

  return tl;
};

export default function HeroSection() {
  const videoRef = useRef(null);
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return undefined;

    const titleAnimation = animateText(titleRef.current);
    const subtitleAnimation = animateText(subtitleRef.current);
    subtitleAnimation.pause(0);

    titleAnimation.eventCallback("onComplete", () => {
      subtitleAnimation.restart();
    });

    return () => {
      titleAnimation.eventCallback("onComplete", null);
      titleAnimation.kill();
      subtitleAnimation.kill();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const footer = footerRef.current;

    if (!video || !footer) return;

    const LEFT_START = 0;
    const CENTER = 5;
    const RIGHT_END = 10;
    const SPEED = 1.8;
    let targetZone = null;
    let direction = 0;
    let animationFrame = null;
    let lastFrameTime = null;

    const getBounds = () => {
      const duration = video.duration;

      if (!Number.isFinite(duration) || duration <= 0) return null;

      const rightEnd = Math.min(RIGHT_END, duration);

      return {
        leftStart: LEFT_START,
        center: Math.min(CENTER, rightEnd),
        rightEnd,
      };
    };

    const setVideoTime = (time, bounds) => {
      video.currentTime = clamp(time, bounds.leftStart, bounds.rightEnd);
    };

    const moveToward = (time, destination, amount) => {
      if (time < destination) return Math.min(time + amount, destination);
      return Math.max(time - amount, destination);
    };

    const animate = (frameTime) => {
      animationFrame = null;
      // The media clock must never compete with the manually controlled clock.
      if (!video.paused) video.pause();

      const bounds = getBounds();
      if (!bounds) {
        // Keep one loop alive only while an interaction is waiting for metadata.
        if (targetZone) animationFrame = requestAnimationFrame(animate);
        return;
      }

      // Do not continuously replace an in-flight seek: doing so can prevent the
      // browser from decoding and displaying any of the requested frames.
      if (video.seeking) {
        lastFrameTime = frameTime;
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const currentTime = clamp(
        Number.isFinite(video.currentTime) ? video.currentTime : bounds.center,
        bounds.leftStart,
        bounds.rightEnd,
      );
      const elapsed =
        lastFrameTime === null
          ? 0
          : Math.min((frameTime - lastFrameTime) / 1000, 0.05);
      const amount = SPEED * elapsed;
      lastFrameTime = frameTime;

      if (!targetZone) {
        const nextTime = moveToward(currentTime, bounds.center, amount);
        setVideoTime(nextTime, bounds);

        if (nextTime !== bounds.center) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          lastFrameTime = null;
        }
        return;
      }

      const minimum = targetZone === "left" ? bounds.leftStart : bounds.center;
      const maximum = targetZone === "left" ? bounds.center : bounds.rightEnd;
      let nextTime = currentTime;

      // First travel back to the neutral frame if the cursor changed sides.
      if (targetZone === "left" && currentTime > bounds.center) {
        direction = -1;
        nextTime = moveToward(currentTime, bounds.center, amount);
      } else if (targetZone === "right" && currentTime < bounds.center) {
        direction = 1;
        nextTime = moveToward(currentTime, bounds.center, amount);
      } else if (maximum > minimum) {
        if (direction === 0) {
          direction = targetZone === "left" ? -1 : 1;
        }

        nextTime = currentTime + direction * amount;

        if (nextTime >= maximum) {
          nextTime = maximum;
          direction = -1;
        } else if (nextTime <= minimum) {
          nextTime = minimum;
          direction = 1;
        }
      }

      setVideoTime(nextTime, bounds);
      animationFrame = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrame === null) {
        lastFrameTime = null;
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const updateZone = (clientX) => {
      const rect = footer.getBoundingClientRect();
      if (!rect.width) return;

      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      targetZone = ratio < 0.5 ? "left" : "right";
      startAnimation();
    };

    const handlePointerMove = (event) => updateZone(event.clientX);
    const handlePointerEnter = (event) => updateZone(event.clientX);

    const handlePointerLeave = () => {
      targetZone = null;
      startAnimation();
    };

    const handleLoadedMetadata = () => {
      const bounds = getBounds();
      if (!bounds) return;

      video.pause();
      setVideoTime(bounds.center, bounds);

      if (targetZone) startAnimation();
    };

    video.pause();
    footer.addEventListener("pointerenter", handlePointerEnter, {
      passive: true,
    });
    footer.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    footer.addEventListener("pointerleave", handlePointerLeave);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleLoadedMetadata();
    }

    return () => {
      footer.removeEventListener("pointerenter", handlePointerEnter);
      footer.removeEventListener("pointermove", handlePointerMove);
      footer.removeEventListener("pointerleave", handlePointerLeave);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="home"
      className="hero-footer relative min-h-screen w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Video */}
      <div className="hero-video absolute inset-0 -z-10">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 -z-[5] bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

      {/* Hero Content */}
      <div className="hero-content relative z-10 flex min-h-screen items-center">
        <div className="w-full max-w-7xl px-6 pt-24 sm:px-10 lg:px-16">
          <div className="hero-copy max-w-xl">
            {/* Eyebrow */}
            <span className="mb-5 inline-block text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              Welcome to the Camp
            </span>

            {/* Main title */}
            <h1
              ref={titleRef}
              className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {text.title}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/70 sm:text-xl"
            >
              {text.description}
            </p>

            {/* Divider */}
            <div className="my-8 h-px w-24 bg-orange-400/70" />

            {/* Camp information */}
            <div className="max-w-lg">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                Camp rules
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Enjoy the outdoors, respect the environment, and help us keep
                the camp safe and welcoming for everyone.
              </p>

              <ul className="mt-4 grid gap-2 text-sm text-white/65 sm:grid-cols-2">
                <li>01 — Respect the environment</li>
                <li>02 — Respect other campers</li>
                <li>03 — Follow fire safety rules</li>
                <li>04 — Keep noise levels low</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-5">
              <button
                type="button"
                className="rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-300"
              >
                Explore the Camp
              </button>

              <span className="text-sm text-white/45">Scroll to discover</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
