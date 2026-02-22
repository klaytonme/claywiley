import Header from "./components/Header";

export default function Home() {
	return (
		<main className="min-h-screen bg-slate-950 text-white">
			<Header />
			<div className="px-6 py-24 space-y-24">
				{/* Project cards will go here */}
			</div>
		</main>
	);
}