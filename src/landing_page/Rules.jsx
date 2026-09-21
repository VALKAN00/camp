import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const rules = [
	{
		title: "Respect the environment",
		description:
			"Leave nature exactly as you found it. Keep the camp clean and protect the surroundings.",
	},
	{
		title: "Respect other campers",
		description:
			"Give everyone the space and privacy they need to enjoy their time outdoors.",
	},
	{
		title: "Follow fire safety rules",
		description:
			"Use designated fire areas and follow all camp safety instructions.",
	},
	{
		title: "Keep noise levels low",
		description:
			"Help preserve the peaceful atmosphere, especially during the evening and night.",
	},
	{
		title: "Keep pets under control",
		description:
			"Pets must remain leashed and the surrounding area should always be kept clean.",
	},
	{
		title: "Follow camp instructions",
		description:
			"Pay attention to signs and instructions from camp staff throughout your stay.",
	},
];

export default function Rules() {
	const sectionRef = useRef(null);

	useLayoutEffect(() => {
		const section = sectionRef.current;

		if (!section) return undefined;

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const context = gsap.context(() => {
			if (reduceMotion) return;

			const intro = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top 72%",
					once: true,
				},
			});

			intro
				.from(".rules-visual", {
					autoAlpha: 0,
					scale: 1.08,
					x: 35,
					duration: 1.2,
					ease: "power3.out",
				}, 0)
				.from(".rules-label", {
					autoAlpha: 0,
					y: 18,
					duration: 0.5,
					ease: "power2.out",
				}, 0.15)
				.from(".rules-heading", {
					autoAlpha: 0,
					y: 30,
					duration: 0.7,
					ease: "power3.out",
				}, 0.25)
				.from(".rules-intro", {
					autoAlpha: 0,
					y: 18,
					duration: 0.6,
					ease: "power2.out",
				}, 0.48)
				.from(".rules-row", {
					autoAlpha: 0,
					x: -20,
					duration: 0.55,
					stagger: 0.08,
					ease: "power2.out",
				}, 0.62)
				.from(".rules-footer", {
					autoAlpha: 0,
					y: 12,
					duration: 0.45,
					ease: "power2.out",
				}, "-=0.2");
		}, section);

		return () => context.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="rules"
			className="relative isolate min-h-[100dvh] overflow-hidden bg-[#101d20] text-white"
			aria-labelledby="rules-heading"
		>
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_45%,rgba(36,73,72,0.65),transparent_48%),linear-gradient(115deg,#101d20_0%,#14282a_48%,#0c171b_100%)]" />

			<div className="relative mx-auto grid min-h-[100dvh] max-w-[1500px] grid-cols-1 lg:grid-cols-[45%_55%]">
				<div className="relative z-10 flex flex-col justify-between px-6 pb-8 pt-24 sm:px-10 sm:pb-10 lg:px-16 lg:pb-12 lg:pt-28">
					<div>
						<p className="rules-label text-xs font-semibold uppercase tracking-[0.32em] text-orange-400 sm:text-sm">
							01 / Camp Rules
						</p>

						<h2
							id="rules-heading"
							className="rules-heading mt-5 max-w-md text-5xl font-bold leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[clamp(3.5rem,5vw,5.5rem)]"
						>
							Respect the wild.
						</h2>

						<p className="rules-intro mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
							A few simple rules keep the camp enjoyable, safe, and welcoming for everyone.
						</p>
					</div>

					<div className="mt-10 max-w-2xl border-t border-white/15">
						{rules.map((rule, index) => (
							<article
								key={rule.title}
								className="rules-row grid grid-cols-[2.5rem_1fr] gap-3 border-b border-white/15 py-3 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-3.5"
							>
								<span className="pt-0.5 text-xs font-semibold tracking-[0.12em] text-orange-400">
									{String(index + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="text-sm font-semibold text-white sm:text-base">
										{rule.title}
									</h3>
									<p className="mt-1 max-w-xl text-xs leading-relaxed text-white/50 sm:text-sm">
										{rule.description}
									</p>
								</div>
							</article>
						))}
					</div>

					<p className="rules-footer mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
						Safety comes next
					</p>
				</div>

				<div className="relative min-h-[48vh] overflow-hidden lg:min-h-0">
					<img
						className="rules-visual absolute inset-0 h-full w-full object-cover object-center lg:object-[center_38%]"
						src="/images/rules.png"
						alt="Camp character standing outdoors"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#101d20] via-transparent to-[#101d20]/20 lg:bg-[linear-gradient(90deg,#101d20_0%,rgba(16,29,32,0.68)_12%,transparent_48%),linear-gradient(0deg,#101d20_0%,transparent_30%,rgba(16,29,32,0.2)_100%)]" />
				</div>
			</div>
		</section>
	);
}
