// ─── data/resume.ts ───────────────────────────────────────────────────────────
//
//  Single source of truth for the resume card content.
//  Adding or removing entries in RESUME_ENTRIES updates the dropdown.
//  pdfPath are relative to /public

export type ResumeEntry = {
	label: string;    // shown in the dropdown
	pdfPath: string;  // path under /public
};

export type ResumeConfig = {
	title: string;
	subtitle: string;
	photo: string;
	generateDelayMs: number;  // how long the "generating" animation plays
	entries: ResumeEntry[];
};

export const resumeConfig: ResumeConfig = {
	title: "Résumé",
	subtitle: "View and download summary of education and experience",
	photo: "images/contact/resume.png",
	generateDelayMs: 1800,
	entries: [
		{ label: "Embedded Firmware", pdfPath: "/resume/Rivian/Clayton_Wiley_Resume.pdf" },
		{ label: "Real-Time Linux Systems", pdfPath: "/resume/Rivian/Clayton_Wiley_Resume.pdf" },
		{ label: "Power Interfacing", pdfPath: "/resume/Rivian/Clayton_Wiley_Resume.pdf" },
		{ label: "Embedded Control", pdfPath: "/resume/embeddedControl/Clayton_Wiley_Resume.pdf" },
		{ label: "Microprocessor System Design", pdfPath: "/resume/mpSystem/Clayton_Wiley_Resume.pdf" },
		{ label: "Real-Time Backend", pdfPath: "/resume/rtBackend/Clayton_Wiley_Resume.pdf" },
		{ label: "Power Architecture", pdfPath: "/resume/powerArchitecture/Clayton_Wiley_Resume.pdf" },
		{ label: "FPGA Hardware Acceleration", pdfPath: "/resume/fpgavlsi/Clayton_Wiley_Resume.pdf" },
		{ label: "VLSI Design", pdfPath: "/resume/fpgavlsi/Clayton_Wiley_Resume.pdf" },
		{ label: "Embedded Machine Learning", pdfPath: "/resume/embeddedML/Clayton_Wiley_Resume.pdf" },
		{ label: "Sustainable Engineering", pdfPath: "/resume/sustainable/Clayton_Wiley_Resume.pdf" },
		{ label: "Robust, Reparable Engineering", pdfPath: "/resume/repairable/Clayton_Wiley_Resume.pdf" },
		{ label: "Immersive Performance Tech", pdfPath: "/resume/performanceTech/Clayton_Wiley_Resume.pdf" },
	],
};