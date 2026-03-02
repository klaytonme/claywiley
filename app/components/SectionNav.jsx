"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
	{ label: "Selected Projects", href: "/#projects" },
	{ label: "Contact Me", href: "/contact" },
	{ label: "Website Credits", href: "/credits" },
];

export default function SectionNav() {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative">
			<button
				onClick={() => setOpen((v) => !v)}
				className="flex items-center gap-2 font-medium tracking-wider text-foreground-subtle hover:text-foreground transition-colors duration-200 cursor-pointer"
				style={{ fontSize: "clamp(0.8rem, 1.9vw, 1.2rem)" }}
			>
				Selected Projects
				<motion.span
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2 }}
					className="text-xl"
				>
					▾
				</motion.span>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.15 }}
						className="absolute top-full w-[104%] left-0 mt-2 mx-[-2%] flex flex-col bg-background overflow-hidden z-50"
					>
						{NAV_LINKS.map((link) => (<a

							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="py-2.5 px-[2%] font-medium tracking-wide text-foreground-subtle hover:text-foreground hover:bg-surface-raised transition-colors duration-150 first:font-semibold first:text-foreground"
							style={{
								fontSize: "clamp(0.8rem, 1.9vw, 1.2rem)",
								borderTop: "1px solid var(--color-border)"
							}}
						>
							{link.label}
						</a>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div >
	);
}