"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const CONFIG = {
	name: "Clayton Wiley",
	title: "Embedded Systems Engineer",
	subtitle: "Robotics · Vision · Embedded Systems",
	photoLeft: "/images/profileDown/3.png",
	photoRight: "/images/profileUp/3.png",
};


const CLIP_ID = "title-clip";

function TitleClipDef() {
	const d = 6; // offset of curves (%)
	return (
		<svg width="0" height="0" style={{ position: "absolute" }}>
			<defs>
				<clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
					{/*
						viewBox is 0..1 × 0..1 (objectBoundingBox)
						Start at (0, 0)
						Line to (1-d, 0) (Handle at 1, 0.5)
						Curve to (1, 1)
						Line to (d, 1)
						Curve to (0, 0) (Handle at 0, 0.5)
					*/}
					<path
						d={`
						M 0,0
						L ${1 - d / 100},0
						C ${1 - d / 100},0  1,0.5  1,1
						L ${d / 100},1
						C ${d / 100},1  0,0.5  0,0
						Z
						`}
					/>
				</clipPath>
			</defs>
		</svg>
	);
}

// ─── Gradient fade mask ───────────────────────────

const maskLeft = "linear-gradient(to right,  black 0%, black 45%, transparent 100%)";
const maskRight = "linear-gradient(to left,   black 0%, black 45%, transparent 100%)";
const maskTitle = "radial-gradient(ellipse 72% 150% at 50% 50%, black 50%, transparent 100%)";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Header() {

	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 500], [0, -250]);

	return (
		<>
			<TitleClipDef />

			{/*
        Google Fonts – swap for your own Next.js font setup via next/font
        Using Syne for the name (geometric, distinctive) and
        DM Sans for the subtitle (clean, modern).
      */}
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
      `}</style>

			<motion.header className="w-full overflow-hidden flex items-stretch bg-background"
				style={{
					y,
					height: "clamp(260px, 36vw, 520px)",
				}}
			>
				{/* ── Left photo ── */}
				<motion.div
					initial={{ opacity: 0, x: -24 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
					className="absolute inset-0 h-full aspect-7/6"
					style={{ WebkitMaskImage: maskLeft, maskImage: maskLeft }}
				>
					<img
						src={CONFIG.photoLeft}
						alt=""
						aria-hidden
						className="w-full h-full object-cover object-top brightness-75"
					/>
				</motion.div>

				{/* ── Right photo ── */}
				<motion.div
					initial={{ opacity: 0, x: 24 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
					className="absolute inset-0 h-full aspect-7/6 right-0 left-[unset]"
					style={{ WebkitMaskImage: maskRight, maskImage: maskRight }}
				>
					<img
						src={CONFIG.photoRight}
						alt=""
						aria-hidden
						className="w-full h-full object-cover object-top brightness-75"
					/>
				</motion.div>

				{/* ── Title block (clipped + faded) ── */}
				<motion.div
					initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "-50%" }}
					animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
					transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
					className="absolute left-[50%] top-[50%] h-full w-[60vw] bg-surface flex flex-col items-center justify-center"
					style={{

						clipPath: `url(#${CLIP_ID})`,
						WebkitMaskImage: maskTitle,
						maskImage: maskTitle,
						gap: "clamp(4px, 1vw, 12px)",
					}}
				>
					{/* Subtle grid texture overlay */}
					<div
						className="absolute inset-0 pointer-events-none opacity-20"
						style={{
							backgroundImage: `
								linear-gradient(var(--color-border) 1px, transparent 1px),
								linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
							`,
							backgroundSize: "60px 60px",
						}}
					/>

					{/* Name */}
					<h1
						className="relative m-0 text-center leading-none tracking-tight font-extrabold pb-2"
						style={{
							fontSize: "clamp(2rem, 6vw, 7rem)",
							// Gradient uses token values — stays in sync with theme
							backgroundImage: "linear-gradient(160deg, var(--color-foreground) 0%, var(--color-primary) 80%, var(--color-secondary) 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
						}}
					>
						{CONFIG.name}
					</h1>

					{/* Accent line */}
					<div
						className="rounded-sm h-0.5 pointer-events-none"
						style={{
							width: "clamp(40px, 8%, 80px)",
							background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
						}}
					/>

					{/* Job title */}
					<p
						className="relative m-0 text-center uppercase tracking-widest font-bold text-primary"
						style={{ fontSize: "clamp(0.8rem, 1.6vw, 2rem)" }}
					>
						{CONFIG.title}
					</p>

					{/* Subtitle */}
					<p
						className="relative m-0 text-center tracking-wider font-light text-foreground-muted"
						style={{ fontSize: "clamp(0.65rem, 1.1vw, 1.5rem)" }}
					>
						{CONFIG.subtitle}
					</p>
				</motion.div>
			</motion.header>
		</>
	);
}
