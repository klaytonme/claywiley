// lib/theme-context.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
	theme: Theme;
	toggle: () => void;
}>({ theme: "dark", toggle: () => { } });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("dark");

	useEffect(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		if (stored) {
			setTheme(stored);
			document.documentElement.setAttribute("data-theme", stored);
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
		const apply = (e: MediaQueryListEvent | MediaQueryList) => {
			const t = e.matches ? "light" : "dark";
			setTheme(t);
			document.documentElement.setAttribute("data-theme", t);
		};

		apply(mediaQuery);
		mediaQuery.addEventListener("change", apply);
		return () => mediaQuery.removeEventListener("change", apply);
	}, []);

	const toggle = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		localStorage.setItem("theme", next);
		document.documentElement.setAttribute("data-theme", next);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);