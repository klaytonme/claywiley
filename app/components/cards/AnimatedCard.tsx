'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedCard({
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