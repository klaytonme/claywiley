"use client";

// ─── components/ProjectList.tsx ───────────────────────────────────────────────
//
//  Renders the full list of project cards with scroll-triggered entrance animations.
//  Drop this directly into your app/page.tsx below the HeroHeader.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
	return (
		<>
			{/* Section header */}

			{/* Cards */}
			<div className="flex flex-col gap-4 px-6 md:px-12 pb-24">
				{projects.map((project, index) => (
					<AnimatedCard key={project.id} index={index}>
						<ProjectCard project={project} />
					</AnimatedCard>
				))}
			</div>
		</>
	);
}

// ─── Scroll-triggered wrapper ─────────────────────────────────────────────────

function AnimatedCard({
	children,
	index,
}: {
	children: React.ReactNode;
	index: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 32 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{
				duration: 0.5,
				ease: "easeOut",
				delay: index * 0.05, // slight stagger between cards
			}}
		>
			{children}
		</motion.div>
	);
}