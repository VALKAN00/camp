import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const safetyRules = [
  {
    title: "Stay aware",
    description: "Be aware of your surroundings and potential hazards.",
  },
  {
    title: "Supervise children and pets",
    description: "Keep children and pets within sight.",
  },
  {
    title: "Keep emergency supplies nearby",
    description: "Know where the first aid kit is located.",
  },
  {
    title: "Follow camp instructions",
    description: "Follow signs and instructions from camp staff.",
  },
  {
    title: "Know emergency locations",
    description: "Know where to find emergency services.",
  },
];

export default function Safety() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        })
        .from(".safety-copy > *", {
          autoAlpha: 0,
          y: 20,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
        })
        .from(
          ".safety-rule",
          {
            autoAlpha: 0,
            x: -16,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.25",
        )
        .from(
          ".safety-main-image",
          {
            autoAlpha: 0,
            y: 24,
            scale: 1.03,
            duration: 1,
            ease: "power3.out",
          },
          0,
        )
        .from(
          ".safety-secondary-image",
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.75,
            ease: "power2.out",
          },
          0.35,
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="safety"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#0b1719] text-white"
      aria-labelledby="safety-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_77%_34%,rgba(46,91,78,0.34),transparent_31%),radial-gradient(circle_at_22%_78%,rgba(20,59,63,0.3),transparent_42%),linear-gradient(120deg,#0b1719_0%,#102528_54%,#0b1719_100%)]" />

      <div className="relative mx-auto min-h-[100dvh] max-w-[1600px] px-6 pb-10 pt-28 sm:px-10 lg:px-16 lg:pb-8 lg:pt-32">
        <div className="safety-copy relative z-10 w-full lg:w-[52%]">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-orange-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 sm:text-sm">
              02 / Camp Safety
            </p>
          </div>

          <h2
            id="safety-heading"
            className="mt-5 max-w-xl text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Stay safe.
            <span className="block text-white/40">Explore freely.</span>
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
            Adventure is better when everyone knows how to stay safe. Keep these
            simple guidelines in mind while exploring the camp.
          </p>

          <div className="mt-8 max-w-2xl border-t border-white/10">
            {safetyRules.map((rule, index) => (
              <article
                key={rule.title}
                className="safety-rule grid grid-cols-[2rem_1fr] gap-3 border-b border-white/10 py-3 sm:grid-cols-[2.5rem_1fr] sm:gap-4 sm:py-3.5"
              >
                <span className="pt-0.5 text-xs font-semibold tracking-[0.12em] text-orange-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    {rule.title}
                  </h3>
                  <p className="mt-1 max-w-lg text-xs leading-relaxed text-white/45 sm:text-sm">
                    {rule.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
            <span>Next / Contact</span>
            <span className="text-orange-400" aria-hidden="true">-&gt;</span>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[5%] top-[7%] hidden h-[70vh] w-[43vw] max-w-[660px] lg:block">
          <img
            className="safety-main-image absolute inset-0 h-full w-full object-contain object-center"
            src="/images/safty%201.png"
            alt="Young camper prepared for a safe adventure"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b1719_0%,transparent_25%,transparent_78%,#0b1719_100%),linear-gradient(0deg,#0b1719_0%,transparent_18%,transparent_84%,#0b1719_100%)]" />
        </div>

        <div className="pointer-events-none absolute bottom-[4%] right-[2%] hidden h-[31vh] w-[20vw] max-w-[300px] lg:block">
          <img
            className="safety-secondary-image absolute inset-0 h-full w-full object-contain object-center"
            src="/images/safty%202.png"
            alt="Camper ready to follow camp safety guidance"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0b1719_96%)]" />
        </div>

        <div className="mt-12 space-y-8 lg:hidden">
          <div className="relative h-[58vh] min-h-[360px] overflow-hidden">
            <img
              className="safety-main-image h-full w-full object-contain object-center"
              src="/images/safty%201.png"
              alt="Young camper prepared for a safe adventure"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#0b1719_0%,transparent_18%,transparent_82%,#0b1719_100%)]" />
          </div>
          <div className="relative ml-auto h-[35vh] w-[72%] min-h-[240px] overflow-hidden">
            <img
              className="safety-secondary-image h-full w-full object-contain object-center"
              src="/images/safty%202.png"
              alt="Camper ready to follow camp safety guidance"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0b1719_96%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
