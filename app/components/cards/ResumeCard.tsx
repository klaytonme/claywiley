"use client";

// ─── components/cards/ResumeCard.tsx ─────────────────────────────────────────
//
//  Resume viewer card matching ContactCard conventions.
//  Config lives in data/resume.ts.
//
//  Tabs:
//    Standard   — dropdown to select engineering area + generate button + PDF viewer
//    Generative — coming soon placeholder

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { bio } from "@/data/contact";
import { resumeConfig } from "@/data/resume";
import type { ResumeEntry } from "@/data/resume";

// import type { ResumeEntry } from "@/data/resume";
// import { resumeConfig } from "@/data/resume";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "standard" | "generative";
type ViewerState = "idle" | "generating" | "ready";

const TABS: { id: TabId; label: string }[] = [
	{ id: "standard", label: "Standard" },
	{ id: "generative", label: "Generative" },
];

// ─── Tab nav ──────────────────────────────────────────────────────────────────

function TabNav({
	activeId,
	onSelect,
}: {
	activeId: TabId;
	onSelect: (id: TabId) => void;
}) {
	return (
		<nav className="flex items-center gap-1 border-b border-border mx-6 overflow-x-auto no-scrollbar">
			{TABS.map((tab) => {
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

// ─── Standard left panel ──────────────────────────────────────────────────────

function StandardPanel({
	onGenerate,
}: {
	onGenerate: (entry: ResumeEntry) => void;
}) {
	const [selected, setSelected] = useState(resumeConfig.entries[0]);

	return (
		<div className="flex flex-col gap-4">
			<p
				className="text-foreground-muted leading-relaxed"
				style={{ fontSize: "clamp(0.8rem, 1.3vw, 1rem)" }}
			>
				Select a specific area of engineering and view a resume tailored to that
				discipline. This feature does not use AI but procedurally assembles pre-verified
				sections of my resume. Each version is 100% accurate and highlights the most
				relevant experience and project work.
			</p>

			<div className="flex flex-col gap-1">
				<label className="text-[12px] font-mono uppercase tracking-widest text-foreground-subtle">
					Area
				</label>
				<select
					value={selected.label}
					onChange={(e) => {
						const entry = resumeConfig.entries.find((r) => r.label === e.target.value)!;
						setSelected(entry);
					}}
					className="w-full bg-surface-raised border border-border rounded-lg px-3 py-2
                     text-foreground font-medium
                     focus:outline-none focus:border-primary
                     transition-colors duration-200 cursor-pointer"
					style={{ fontSize: "clamp(0.65rem, 1.5vw, 1rem)" }}
				>
					{resumeConfig.entries.map((entry) => (
						<option key={entry.label} value={entry.label}>
							{entry.label}
						</option>
					))}
				</select>
			</div>

			<button
				onClick={() => onGenerate(selected)}
				className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground
                   font-semibold uppercase tracking-widest
                   hover:opacity-90 active:opacity-75
                   transition-opacity duration-150 cursor-pointer"
				style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)" }}
			>
				Assemble
			</button>
		</div>
	);
}

// ─── Generative left panel ────────────────────────────────────────────────────

function GenerativePanel() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
			<div className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-foreground-subtle text-sm">
				✦
			</div>
			<p className="text-foreground-subtle font-mono text-[10px] uppercase tracking-widest">
				Feature Coming Soon
			</p>
			<p
				className="text-foreground-subtle leading-relaxed"
				style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
			>
				AI-tailored resumes based on a job description or role are in the works.
			</p>
		</div>
	);
}

// ─── PDF viewer ───────────────────────────────────────────────────────────────

function PDFViewer({
	state,
	pdfPath,
}: {
	state: ViewerState;
	pdfPath: string | null;
}) {
	return (
		<div className={["relative w-full h-full bg-surface-raised rounded-lg border border-border overflow-hidden min-h-100", state === "ready" && "sm:min-h-200"].join(' ')}>
			<AnimatePresence mode="wait">

				{state === "idle" && (
					<motion.div
						key="idle"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground-subtle"
					>
						<div className="w-12 h-16 border-2 border-border rounded flex items-center justify-center text-2xl opacity-40">
							⎗
						</div>
						<p className="text-xs font-mono uppercase tracking-widest">
							Select an area and generate
						</p>
					</motion.div>
				)}

				{state === "generating" && (
					<motion.div
						key="generating"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 flex flex-col items-center justify-center gap-4"
					>
						<div className="flex flex-col gap-2 w-2/3">
							{[100, 85, 92, 70, 88, 60, 78].map((w, i) => (
								<motion.div
									key={i}
									className="h-2 bg-border rounded-full"
									animate={{ opacity: [0.3, 0.8, 0.3] }}
									transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
									style={{ width: `${w}%` }}
								/>
							))}
						</div>
						<p className="text-xs font-mono uppercase tracking-widest text-foreground-subtle">
							Preparing resume…
						</p>
					</motion.div>
				)}

				{state === "ready" && pdfPath && (
					<motion.iframe
						key="pdf"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						src={pdfPath}
						title="Resume"
						className="absolute inset-0 w-full h-full"
					/>
				)}

			</AnimatePresence>
		</div>
	);
}

// ─── Main ResumeCard ──────────────────────────────────────────────────────────

export default function ResumeCard({ collapsedInit = false }: { collapsedInit?: boolean }) {
	const [collapsed, setCollapsed] = useState(collapsedInit);
	const [activeTab, setActiveTab] = useState<TabId>("standard");
	const [viewerState, setViewerState] = useState<ViewerState>("idle");
	const [activePdf, setActivePdf] = useState<string | null>(null);

	function handleGenerate(entry: ResumeEntry) {
		setViewerState("generating");
		setActivePdf(null);
		setTimeout(() => {
			setActivePdf(entry.pdfPath);
			setViewerState("ready");
		}, resumeConfig.generateDelayMs);
	}

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
					src={resumeConfig.photo}
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
						{resumeConfig.title}
					</h2>
					<p
						className="text-foreground-muted mt-1 leading-snug"
						style={{ fontSize: "clamp(0.8rem, 1.9vw, 1.2rem)" }}
					>
						{resumeConfig.subtitle}
					</p>
				</div>

				{!collapsed && (
					<>
						<div className="h-px w-full bg-border mt-3" />

						{/* Tab nav */}
						<TabNav activeId={activeTab} onSelect={setActiveTab} />

						{/* Body */}
						<div className="flex flex-col sm:flex-row gap-4 p-6 flex-1">

							{/* Left panel */}
							<div
								className="flex flex-col gap-5 shrink-0 w-full sm:w-[25%] sm:max-w-75"
							>
								<AnimatePresence mode="wait">
									{activeTab === "standard" ? (
										<motion.div
											key="standard"
											initial={{ opacity: 0, y: 6 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -6 }}
											transition={{ duration: 0.2 }}
										>
											<StandardPanel onGenerate={handleGenerate} />
										</motion.div>
									) : (
										<motion.div
											key="generative"
											initial={{ opacity: 0, y: 6 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -6 }}
											transition={{ duration: 0.2 }}
										>
											<GenerativePanel />
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							{/* Vertical divider */}
							<div className="w-px hidden sm:flex bg-border shrink-0" />

							{/* PDF viewer */}
							<div className="flex-1 min-w-0">
								<PDFViewer state={viewerState} pdfPath={activePdf} />
							</div>

						</div>
					</>
				)}

			</div>
		</article>
	);
}