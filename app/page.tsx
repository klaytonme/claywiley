import Header from "./components/Header";
import ProjectList from "./components/ProjectList"
import Footer from "./components/Footer"

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
						background: "linear-gradient(to bottom, transparent, var(--color-background))",
					}}
				/>
				<ProjectList />
				<Footer />
			</div>
		</main>
	);
}