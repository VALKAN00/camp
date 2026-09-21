import { useEffect, useRef } from "react";

export default function Pointer() {
  const pointerRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const pointer = pointerRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!pointer || !ring || !label) return undefined;

    let targetX = -100;
    let targetY = -100;
    let ringX = targetX;
    let ringY = targetY;
    let animationFrame;

    const movePointer = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      pointer.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      label.style.transform = `translate3d(${targetX + 18}px, ${targetY + 16}px, 0)`;
      document.body.classList.add("has-pointer");
    };

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animationFrame = requestAnimationFrame(animateRing);
    };

    const hidePointer = () => document.body.classList.remove("has-pointer");

    window.addEventListener("pointermove", movePointer, { passive: true });
    window.addEventListener("pointerleave", hidePointer);
    animationFrame = requestAnimationFrame(animateRing);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerleave", hidePointer);
      document.body.classList.remove("has-pointer");
    };
  }, []);

  return (
    <>
      <span ref={ringRef} className="camp-pointer-ring" aria-hidden="true" />
      <span ref={pointerRef} className="camp-pointer" aria-hidden="true">
        <span className="camp-pointer-mark" />
      </span>
      <span ref={labelRef} className="camp-pointer-label" aria-hidden="true">
        CAMP
      </span>
    </>
  );
}
