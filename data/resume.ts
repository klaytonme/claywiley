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
  generateDelayMs: number;  // how long the "generating" animation plays
  entries: ResumeEntry[];
};

export const resumeConfig: ResumeConfig = {
  title: "Résumé",
  subtitle: "Tailored to your field of interest",
  generateDelayMs: 1800,
  entries: [
    { label: "Systems Engineering",   pdfPath: "/resume/Clayton_Wiley_Resume.pdf" },
    { label: "Embedded Software",     pdfPath: "/resume/Clayton_Wiley_Resume.pdf" },
    { label: "Machine Vision",        pdfPath: "/resume/Clayton_Wiley_Resume.pdf" },
    { label: "Robotics",              pdfPath: "/resume/Clayton_Wiley_Resume.pdf" },
    { label: "Industrial Automation", pdfPath: "/resume/Clayton_Wiley_Resume.pdf" },
  ],
};