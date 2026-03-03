import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer"
import SectionNav from "@/app/components/SectionNav";
import AnimatedCard from "@/app/components/cards/AnimatedCard"
import ContactCard from "@/app/components/cards/ContactCard"
import ResumeCard from "@/app/components/cards/ResumeCard";


export default function Home() {
	return (
		<main className="min-h-screen bg-background relative pb-12">
			<div className="sticky top-0 z-0">
				<Header />

			</div>
			<div className="mb-0 relative z-10">
				{/* Vignette*/}
				<div
					className="w-full pointer-events-none"
					style={{
						height: "40px",
						marginTop: "-40px",
						opacity: 0.2,
						background: "linear-gradient(to bottom, transparent, black)",
						transition: "opacity 0.5s ease",
					}}
				/>

				<main className="w-full h-full bg-background z-10">
					<div className="flex flex-col px-6 md:px-12 py-8 gap-4">
						<SectionNav />
						<div className="mt-2 h-px w-full bg-border" />

						<AnimatedCard key={"contact"} index={0}>
							<ContactCard collapsedInit={false} />
						</AnimatedCard>

						<AnimatedCard key={"resume"} index={1}>
							<ResumeCard collapsedInit={true} />
						</AnimatedCard>

					</div>
				</main>
			</div>
			<Footer />
		</main>
	);
}