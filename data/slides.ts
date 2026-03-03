// ─── data/slides.ts ───────────────────────────────────────────────────────────
//
//  Single source of truth for the slideshow card content.
//  Adding or removing entries in slideConfig updates the dropdown.
//  pdfPath are relative to /public

export type SlideEntry = {
	label: string;    // shown in the dropdown
	id: string;
	url: string;  // path under /public
};

export type SlideConfig = {
	title: string;
	subtitle: string;
	photo: string;
	generateDelayMs: number;  // how long the "generating" animation plays
	entries: SlideEntry[];
};

export const slideConfig: SlideConfig = {
	title: "Slides",
	subtitle: "Learn about me in slideshow format!",
	photo: "images/contact/resume.png",
	generateDelayMs: 1800,
	entries: [
		{ label: "Overview", id: "overview", url: "https://docs.google.com/presentation/d/e/2PACX-1vT86l8jvqu9IVI7O6RDoCxJlIYEZxBHykcYQpcD7RZqUdppbr_hT0gZ1938gLRzlDy5PMhbfb1SR0oz/pubembed?start=false&loop=false&delayms=3000" },
		{ label: "Test", id: "test2", url: "https://docs.google.com/presentation/d/e/2PACX-1vQsJStwv8j7R8i3AdTD2-ICxfWs28irx4W6Eb5-9-33_SYSM0Ol4OblgmPmP3WyWIuO3ipFHctOc56J/pubembed?start=false&loop=false&delayms=3000" },
	],
};