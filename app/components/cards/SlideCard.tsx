"use client";

// ─── components/cards/SlideCard.tsx ─────────────────────────────────────────
//
//  Slide viewer card.
//  Config lives in data/slides.ts.
//
//  Tabs:
//    For each slideshow

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { bio } from "@/data/contact";
import { slideConfig } from "@/data/slides";
import type { SlideEntry } from "@/data/slides";

// import type { ResumeEntry } from "@/data/resume";
// import { resumeConfig } from "@/data/resume";

// ─── Types ────────────────────────────────────────────────────────────────────

const SLIDES_PREFIX = "https://docs.google.com/presentation/d/e/";
const SLIDES_EMBED_SUFFIX = "/pubembed";
const SLIDES_DOWNLOAD_SUFFIX = "/export/pdf";

// ─── Tab nav ──────────────────────────────────────────────────────────────────

function TabNav({
	tabs,
	activeId,
	onSelect,
}: {
	tabs: SlideEntry[];
	activeId: string;
	onSelect: (id: string) => void;
}) {
	return (
		<nav className="flex items-center gap-1 border-b border-border mx-6 overflow-x-auto no-scrollbar">
			{tabs.map((tab) => {
				const isActive = tab.id === activeId;
				return (
					<button
						key={tab.id}
						onClick={() => onSelect(tab.id)}
						className={[
							"relative px-4 py-3 text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-colors duration-200 cursor-pointer",
							isActive
								? "text-primary"
								: "text-foreground-subtle hover:text-foreground-muted",
						].join(" ")}
						style={{ fontSize: "clamp(0.7rem, 1.3vw, 0.9rem)" }}
					>
						{tab.label}
						{isActive && (
							<motion.div
								layoutId="resume-tab-indicator"
								className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm"
								transition={{ type: "spring", stiffness: 400, damping: 35 }}
							/>
						)}
					</button>
				);
			})}
		</nav>
	);
}

// ─── Main ResumeCard ──────────────────────────────────────────────────────────

export default function SlideCard({ collapsedInit = false }: { collapsedInit?: boolean }) {
	const [collapsed, setCollapsed] = useState(collapsedInit);
	const [activeTab, setActiveTab] = useState<string>(slideConfig.entries[0].id);
	const activeUrl: string | undefined = slideConfig.entries.find((entry) => entry.id == activeTab)?.docId
	console.log(activeUrl);


	return (
		<article className="w-full flex flex-row bg-surface border border-border rounded-xl overflow-hidden shadow-xl">

			{/* ── Collapse triangle ── */}
			<button
				onClick={() => setCollapsed((v) => !v)}
				aria-label={collapsed ? "Expand resume" : "Collapse resume"}
				className="absolute shrink-0 mt-[1.35rem] -ml-5 text-foreground-subtle hover:text-primary transition-colors duration-200 cursor-pointer"
			>
				<motion.span
					animate={{ rotate: collapsed ? -90 : 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="block text-[20px] leading-none select-none"
				>
					▾
				</motion.span>
			</button>

			{/* ── Photo ── */}
			<div className={[
				"hidden md:block shrink-0 relative border-r border-border aspect-3/4",
				collapsed ? "min-w-20" : "min-w-[18vw]",
			].join(" ")}>
				<img
					src={slideConfig.photo}
					alt="Profile photo"
					className="absolute inset-0 w-full h-full object-cover object-center"
				/>
				<div
					className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
					style={{ background: "linear-gradient(to bottom, transparent, black)", opacity: 0.4 }}
				/>
			</div>

			{/* ── Right side ── */}
			<div className="flex flex-col flex-1 my-6 min-w-0">

				{/* Header */}
				<div className="px-6">
					<h2
						className="font-bold text-foreground tracking-tight leading-tight"
						style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}
					>
						{slideConfig.title}
					</h2>
					<p
						className="text-foreground-muted mt-1 leading-snug"
						style={{ fontSize: "clamp(0.8rem, 1.9vw, 1.2rem)" }}
					>
						{slideConfig.subtitle}
					</p>
				</div>

				{!collapsed && (
					<>
						<div className="h-px w-full bg-border mt-3" />

						{/* Tab nav */}
						<TabNav tabs={slideConfig.entries} activeId={activeTab} onSelect={setActiveTab} />

						{/* Body */}
						<div className="flex flex-col p-6 w-full justify-center">
							{/* Download link */}


							{/* Slide viewer */}
							<div className="flex w-[60vw] aspect-960/580 max-h-200 mx-auto">
								<iframe src={SLIDES_PREFIX + activeUrl + SLIDES_EMBED_SUFFIX} style={{ border: "none" }} className="h-full w-full" allowFullScreen></iframe>
							</div>

						</div>
					</>
				)}

			</div>
		</article>
	);
}