// ─── components/Footer.tsx ────────────────────────────────────────────────────

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CONFIG = {
	name: "Clayton Wiley",
	email: "me@claytonwiley.com",
	socials: [
		{ label: "GitHub", url: "https://github.com/klaytonme" },
		{ label: "LinkedIn", url: "https://www.linkedin.com/in/clayton-wiley/" },
	],
};

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-border bg-background">
			<div className="px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">

				{/* Copyright */}
				<p className="text-xs text-foreground-subtle font-mono">
					© {year} {CONFIG.name}
				</p>

				{/* Social links + email */}
				<nav className="flex items-center gap-5">
					{CONFIG.socials.map((s) => (
						<a
							key={s.url}
							href={s.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs text-foreground-subtle hover:text-primary transition-colors duration-200"
						>
							{s.label}
						</a>
					))}

					{/* Divider */}
					<span className="text-border select-none">|</span>

					<a
						href={`mailto:${CONFIG.email}`}
						className="text-xs text-foreground-subtle hover:text-primary transition-colors duration-200"
					>
						{CONFIG.email}
					</a>
				</nav>

			</div>
		</footer>
	);
}