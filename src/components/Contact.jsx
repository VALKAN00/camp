import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  { label: "Email", value: "abdelrhmangaballah001@gmail.com", href: "mailto:abdelrhmangaballah001@gmail.com" },
  { label: "Phone", value: "+20 123 456 7890", href: "tel:+201234567890" },
  { label: "Location", value: "Alexandria, Egypt" },
];

const socialLinks = ["Instagram", "TikTok", "Facebook"];

export default function Contact() {
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
        .from(".contact-label, .contact-heading", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        })
        .from(
          ".contact-description, .contact-cta",
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        )
        .from(
          ".contact-info, .contact-socials, .contact-footer",
          {
            autoAlpha: 0,
            y: 14,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.25",
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#0b1719] text-white"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_42%,rgba(54,78,63,0.35),transparent_45%),radial-gradient(circle_at_14%_78%,rgba(19,57,62,0.28),transparent_40%),linear-gradient(125deg,#0b1719_0%,#102326_55%,#0b1719_100%)]" />
      <div className="pointer-events-none absolute -right-[7vw] top-[8%] -z-10 select-none text-[20vw] font-bold leading-none text-white/[0.02]">
        CAMP
      </div>

      <div className="mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-between px-6 pb-8 pt-28 sm:px-10 sm:pb-10 lg:px-16 lg:pb-10 lg:pt-36">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="max-w-3xl">
            <div className="contact-label flex items-center gap-3">
              <span className="h-px w-8 bg-orange-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 sm:text-sm">
                03 / Get in touch
              </p>
            </div>

            <h2
              id="contact-heading"
              className="contact-heading mt-6 max-w-2xl text-5xl font-bold leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Let&apos;s make
              <span className="block text-white/40">memories.</span>
            </h2>

            <p className="contact-description mt-7 max-w-[450px] text-base leading-relaxed text-white/55 sm:text-lg">
              Have a question, planning your next trip, or just want to say hello?
              We&apos;d love to hear from you.
            </p>

            <a
              className="contact-cta group mt-8 inline-flex items-center gap-3 rounded-full bg-orange-400 px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-orange-300"
              href="mailto:info@camp.com"
            >
              <span>Get in touch</span>
              <span className="text-base transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                -&gt;
              </span>
            </a>
          </div>

          <div className="contact-info max-w-sm lg:pt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
              Camp information
            </p>
            <dl className="mt-8 space-y-7">
              {contactDetails.map((detail) => (
                <div key={detail.label}>
                  <dt className="text-xs uppercase tracking-wider text-white/35">{detail.label}</dt>
                  <dd className="mt-2 text-base text-white/80 sm:text-lg">
                    {detail.href ? (
                      <a className="transition-colors hover:text-orange-400" href={detail.href}>
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20">
          <nav className="contact-socials flex flex-wrap gap-x-8 gap-y-4 border-b border-white/10 pb-6" aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social}
                href="#contact"
                className="text-sm text-white/50 transition-colors hover:text-orange-400"
              >
                {social}
              </a>
            ))}
          </nav>

          <footer className="contact-footer flex flex-col gap-3 pt-5 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 CAMP</span>
            <span>Made for outdoor adventures.</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
