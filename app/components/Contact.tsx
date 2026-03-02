'use client'

import { motion } from "framer-motion"
import { bio } from "@/data/contact"

export default function Contact() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 32 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				ease: "easeOut",
			}}
			className="flex flex-row gap-4 px-6 md:px-12 py-12 bg-surface w-full max-w-300 mx-auto mt-8 border border-border rounded-xl overflow-hidden shadow-xl">
			<img src={bio.image} className="w-[30%]"></img>

			<div className="flex flex-col w-full">
				<div className="flex flex-row h-[10%] align-center, justify-center">
					<span className="text-foreground">Email: </span>
				</div>
			</div>
		</motion.div>
	);
};