import Header from "@/app/components/Header";
import ProjectList from "@/app/components/ProjectList"
import Footer from "@/app/components/Footer"
import SectionNav from "@/app/components/SectionNav";

export default function Home() {
	return (
		<main className="min-h-screen bg-slate-950 text-white">
			<div className="sticky top-0 z-0">
				<Header />

			</div>
			<div className="relative z-10">
				{/* Vignette*/}
				<div
					className="w-full pointer-events-none"
					style={{
						height: "40px",
						marginTop: "-40px",
						opacity: 0.1,
						background: "linear-gradient(to bottom, transparent, black)",
						transition: "opacity 0.5s ease",
					}}
				/>

				<main className="w-full bg-background z-10">
					<div className="px-6 md:px-12 py-8">
						<SectionNav />
						<div className="mt-2 h-px w-full bg-border" />
					</div>
					<Footer />
				</main>
			</div>
		</main>
	);
}