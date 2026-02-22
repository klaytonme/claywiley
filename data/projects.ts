// ─── lib/projects.ts ──────────────────────────────────────────────────────────
//
//  This is the single source of truth for all project content.
//  Add, remove, or reorder projects here — the page renders whatever is in this array.
//
//  Tab order determines nav order. The Links tab should always be last.
//  youtubeId is optional — omit it and the body text expands to fill the space.

export type LinkIcon = "github" | "docs" | "demo" | "paper" | "video";

export type ProjectLink = {
	label: string;
	url: string;
	icon?: LinkIcon;
};

export type Tab = {
	id: string;
	label: string;
	body?: string;          // Supports markdown — rendered via react-markdown
	youtubeId?: string;     // YouTube video ID (the part after ?v=)
	links?: ProjectLink[];  // Only used on the Links tab
};

export type Project = {
	id: string;
	title: string;
	subtitle?: string;      // One-line tagline shown under the title
	photo: string;          // Path under /public, e.g. "/projects/vision.jpg"
	tags?: string[];        // Skill tags shown as small chips e.g. ["Python", "OpenCV"]
	tabs: Tab[];
};

// ─── Project Data ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
	{
		id: "industrial-vision",
		title: "Industrial Vision System",
		subtitle: "Real-time defect detection at 60fps on embedded hardware",
		photo: "/projects/vision-system.jpg",
		tags: ["Python", "OpenCV", "C++", "CUDA", "Raspberry Pi"],
		tabs: [
			{
				id: "overview",
				label: "Overview",
				body: `
Designed and deployed a real-time machine vision pipeline for automated defect detection
on a high-speed manufacturing line. The system processes full-HD frames at 60fps on
embedded hardware, flagging surface anomalies with sub-millimeter precision.

The project ran from initial requirements capture through installation, commissioning,
and operator training — a full engineering lifecycle on a 6-month timeline.
        `.trim(),
				youtubeId: "dQw4w9WgXcQ",
			},
			{
				id: "vision-system",
				label: "Vision System",
				body: `
The detection pipeline is built around a custom-trained convolutional model optimised
for inference on the target hardware. A CUDA-accelerated preprocessing stage handles
lens correction, normalisation, and ROI extraction before each frame reaches the model.

False-positive rate was driven below 0.3% through a two-stage classification approach:
a fast shallow network filters obvious passes, and only ambiguous frames are escalated
to the full model — keeping average latency under 12ms.
        `.trim(),
				youtubeId: "dQw4w9WgXcQ",
			},
			{
				id: "serial-interface",
				label: "Serial Interface",
				body: `
The vision system communicates with the PLC over a hardened RS-485 serial link using
a custom binary protocol designed for deterministic latency. Each decision packet is
24 bytes: a 4-byte header, 16-byte payload, and a 4-byte CRC-32 checksum.

The protocol was designed to be tolerant of single-byte corruption — the PLC can
request a retransmit without halting the line — and was validated against IEC 61784
timing requirements.
        `.trim(),
			},
			{
				id: "compliance",
				label: "Industry Compliance",
				body: `
The installation is certified to IEC 62061 SIL 2 for the safety-critical reject actuator
path. Achieving this required formal hazard analysis, a fully redundant relay output
stage, and documented proof-of-concept testing witnessed by the certifying body.

The more interesting challenge was navigating the gap between the certifying standard's
assumptions (designed for discrete safety functions) and the probabilistic nature of an
ML-based detection system. The solution was to treat the model output as a sensor and
apply traditional SIL methodology only to the downstream actuation logic.
        `.trim(),
				youtubeId: "dQw4w9WgXcQ",
			},
			{
				id: "links",
				label: "Links",
				body: "",
				links: [
					{ label: "GitHub Repository", url: "https://github.com/", icon: "github" },
					{ label: "Technical Report", url: "https://example.com", icon: "paper" },
					{ label: "Live Demo", url: "https://example.com", icon: "demo" },
				],
			},
		],
	},

	// ── Add more projects below ────────────────────────────────────────────────
	{
		id: "serial-logger",
		title: "Serial Data Logger",
		subtitle: "High-fidelity embedded data acquisition with web dashboard",
		photo: "/projects/serial-logger.jpg",
		tags: ["Rust", "WebAssembly", "React", "InfluxDB"],
		tabs: [
			{
				id: "overview",
				label: "Overview",
				body: `
					A firmware + web stack for capturing, timestamping, and visualising high-speed serial
					data streams from embedded devices. Built to replace a commercial solution that lacked
					the timing accuracy needed for motor control diagnostics.
							`.trim(),
				youtubeId: "dQw4w9WgXcQ",
			},
			{
				id: "links",
				label: "Links",
				body: "",
				links: [
					{ label: "GitHub Repository", url: "https://github.com/", icon: "github" },
				],
			},
		],
	},
];