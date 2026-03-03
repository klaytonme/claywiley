// ─── data/contact.ts ──────────────────────────────────────────────────────────
//
//  This is the single source of truth for all contact data including links,
//	bio image, and bio description.


type IndicatorValues = {
	label: string;
	style: string;
	selected: boolean;
}

interface Link {
	type: 'link';
	prefix: string;
	label?: string;
	url: string;
}
interface Indicator {
	type: 'indicator';
	label: string;
	values: IndicatorValues[];
}
interface Blurb {
	type: 'blurb';
	value: string;
}

type InfoList = Link | Indicator | Blurb;


export type ContactTab = {
	id: string;
	label: string;
	type: string;
	content?: InfoList[];
}

export type Contact = {
	photo: string;
	title: string;
	subtitle: string;
	tabs: ContactTab[];
}



export const bio: Contact = {
	photo: "images/profileDown/clayton_senior.png",
	title: "Contact Information",
	subtitle: "For interview offers, project proposals, questions, or comments",
	tabs: [
		{
			id: "info",
			label: "Info",
			type: "list",
			content: [
				{
					type: "blurb",
					value: `If you would like to contact me for any reason, please use the information provided below
	
I typically respond within 24 hours.`,
				},
				{
					type: "indicator",
					label: "I am",
					values: [{
						label: "searching for positions",
						style: "green",
						selected: true,
					}, {
						label: "open to offers",
						style: "yellow",
						selected: false,
					}, {
						label: "taken",
						style: "red",
						selected: false
					}]
				},
				{
					type: "link",
					prefix: "Email",
					label: "me@claytonwiley.com",
					url: "mailto:me@claytonwiley.com",
				},
				{
					type: "link",
					prefix: "LinkedIn",
					url: "https://www.linkedin.com/in/clayton-wiley/",
				},
				{
					type: "link",
					prefix: "GitHub",
					url: "https://github.com/klaytonme",
				}
			]
		},
	]
};