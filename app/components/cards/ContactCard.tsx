"use client";

// ─── components/ProjectCard.tsx ───────────────────────────────────────────────
//
//  Renders a single full-width project card with:
//    - Project photo (left, hidden on mobile)
//    - Tab navigation
//    - Body text (centre)
//    - Embedded YouTube video (right, when youtubeId is set)
//    - Links layout (when tab.links is set)

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { ContactTab, MainTabContent } from "@/data/contact";
import { bio } from "@/data/contact";

// ─── Icon map for link types ──────────────────────────────────────────────────

const LINK_ICONS: Record<LinkIcon, string> = {
	github: "↗ GitHub",
	docs: "↗ Docs",
	demo: "↗ Demo",
	paper: "↗ Paper",
	video: "↗ Video",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TabNav({
	tabs,
	activeId,
	onSelect,
}: {
	tabs: ContactTab[];
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
						{/* Active indicator bar */}
						{isActive && (
							<motion.div
								layoutId="tab-indicator"
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

function YouTubeEmbed({ videoId }: { videoId: string }) {
	return (
		<div className="relative w-full rounded-lg overflow-hidden border border-border bg-surface-raised"
			style={{ aspectRatio: "16/9" }}>
			<iframe
				src={`https://www.youtube.com/embed/${videoId}`}
				title="Project video"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="absolute inset-0 w-full h-full"
			/>
		</div>
	);
}

function LinksPanel({ links }: { links: NonNullable<Tab["links"]> }) {
	return (
		<div className={[
			"grid gap-3 w-full mx-auto",
			links.length > 3 ? "grid-cols-2 max-w-250" : "grid-cols-1 max-w-125",
		].join(" ")}>
			{links.map((link, index) => (
				<a
					key={link.url + "-" + index}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group flex items-center justify-between px-5 py-4 rounded-lg border border-border bg-surface-raised hover:border-primary hover:bg-surface transition-all duration-200"
				>
					<span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
						{link.label}
					</span>
					<span className="text-xs text-foreground-subtle group-hover:text-primary transition-colors font-mono">
						{link.icon ? LINK_ICONS[link.icon] : "↗"}
					</span>
				</a>
			))}
		</div>
	);
}

// ─── Tab content panel ────────────────────────────────────────────────────────

function TabContent({ tab }: { tab: ContactTab }) {
	if (tab.type == "list")
		return (
			<motion.div
				key={tab.id}
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -6 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				className="flex p-12 pb-6 w-full flex-col mx-auto"
			>
				{tab.content && tab.content.map((entry, index) => {
					let out = <></>
					if (entry.type == "link")
						out = (
							<div className="flex flex-col sm:flex-row gap-1 align-middle">
								<div className="flex flex-col text-foreground-muted w-[10vw] justify-center" style={{ fontSize: "clamp(0.8rem, 1.6vw, 1rem)" }}>{entry.prefix}</div>
								<a
									key={entry.url + "-" + index}
									href={entry.url}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex w-full items-center justify-between px-5 py-4 rounded-lg border border-border bg-surface-raised hover:border-primary hover:bg-surface transition-all duration-200"
								>
									<span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
										{entry.label ? entry.label : entry.url}
									</span>
								</a>
							</div>
						);

					if (entry.type == "blurb")
						out = (
							<div className={"fw-full md:flex-1 md:min-w-0"}>
								<div className="max-w-none text-foreground-muted leading-relaxed text-sm
																[&>p]:mb-3 [&>p:last-child]:mb-0
																[&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-3
																[&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:mb-3
																[&>li]:mb-1
																[&>h3]:text-foreground [&>h3]:font-semibold [&>h3]:mb-2 [&>h3]:mt-4
																[&>strong]:text-foreground [&>strong]:font-semibold
																[&>code]:font-mono [&>code]:text-xs [&>code]:text-primary
																[&>code]:bg-surface-raised [&>code]:px-1 [&>code]:rounded"
									style={{ fontSize: "clamp(0.8rem, 1.6vw, 1rem)" }}
								>
									<ReactMarkdown>{entry.value ?? ""}</ReactMarkdown>
								</div>
							</div>
						);

					return (<>
						{index != 0 && <div className="bg-border w-full h-px my-2"></div>}
						{out}
					</>)
				})}

			</motion.div>
		);
}

// ─── Main ProjectCard ─────────────────────────────────────────────────────────

export default function ContactCard({ collapsedInit }: { collapsedInit: Boolean }) {
	const [activeTabId, setActiveTabId] = useState(bio.tabs[0].id);
	const [collapsed, setCollapsed] = useState(collapsedInit);
	const activeTab = bio.tabs.find((t) => t.id === activeTabId)!;

	return (
		<article className="w-full flex flex-row bg-surface border border-border rounded-xl overflow-hidden shadow-xl">

			{/* ── Collapse triangle — sits in the margin, aligned with title ── */}
			<button
				onClick={() => setCollapsed((v) => !v)}
				aria-label={collapsed ? "Expand project" : "Collapse project"}
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

			{/* ── Photo (hidden on mobile) ── */}
			<div className={["hidden md:block shrink-0 relative border-r border-border aspect-3/4", (collapsed ? "min-w-20" : " min-w-[18vw]")].join(" ")}>
				<img
					src={bio.photo}
					alt="Image of Clayton Wiley"
					className="absolute inset-0 w-full h-full object-cover object-center"
				/>
				{/* Subtle gradient over photo bottom */}
				<div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
					style={{
						background: "linear-gradient(to bottom, transparent, black)",
						opacity: 0.4,
						transition: "opacity 0.5s ease"
					}} />
			</div>

			{/* ── Right side: title + nav + content ── */}
			<div className="flex flex-col flex-1 my-6 min-w-0">

				{/* Card header */}
				<div className="px-6 border-border">
					<h2 className="text-base font-bold text-foreground tracking-tight leading-tight"
						style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}>
						{bio.title}
					</h2>
					<p className="text-xs text-foreground-muted mt-1 leading-snug"
						style={{ fontSize: "clamp(0.8rem, 1.9vw, 1.2rem)" }}>
						{bio.subtitle}
					</p>
				</div>

				{!collapsed && <>
					<div className="h-px w-full bg-border mt-3"></div>

					{/* Tab navigation */}
					<TabNav
						tabs={bio.tabs}
						activeId={activeTabId}
						onSelect={setActiveTabId}
					/>

					{/* Tab content */}
					<div className="flex-1 overflow-hidden">
						<AnimatePresence mode="wait">
							<TabContent key={activeTabId} tab={activeTab} />
						</AnimatePresence>
					</div>
				</>}

			</div>
		</article>
	);
}