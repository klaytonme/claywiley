// "use client";

// ─── components/ProjectList.tsx ───────────────────────────────────────────────
//
//  Renders the full list of project cards with scroll-triggered entrance animations.
//  Drop this directly into your app/page.tsx below the HeroHeader.

import AnimatedCard from "./cards/AnimatedCard"
import { projects } from "@/data/projects";
import ProjectCard from "./cards/ProjectCard";

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
