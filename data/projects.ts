// ─── data/projects.ts ──────────────────────────────────────────────────────────
//
//  This is the single source of truth for all project content.
//
//  Tab order determines nav order. The Links tab should always be last.
//  youtubeId is optional

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
		id: "pi-vision-follow-spot",
		title: "Automated Theater Follow Spot",
		subtitle: "Raspberry Pi + infrared beacon tracking for autonomous DMX spotlight control",
		photo: "/images/projectPhotos/FollowSpot.png",
		tags: ["Python", "C", "OpenCV", "Raspberry Pi", "DMX512", "Computer Vision", "Real-Time", "Embedded Systems", "Hardware Design"],
		tabs: [
			{
				id: "overview",
				label: "Overview",
				body: `Automated follow spotlights are a solved problem... if you have tens of thousands of dollars to spend on a BlackTrax system, Robe RoboSpot, or any of the other proprietary industry leaders. My senior thesis tackled the same usecase with a Raspberry Pi, a $125 DMX interface, and some infrared LEDs soldered to a battery pack.

The system sits inline on a **DMX512** universe between the lightboard and the moving light, behaving as a passive repeater until tracking is engaged. Once activated, it overwrites only the pan/tilt position channels while passing everything else — color, intensity, focus — through untouched. Any theater company that already owns a moving light can drop this module into their existing rig without touching their lightboard or buying fixture-specific hardware. Estimated reproduction cost: ~$130.`,
				youtubeId: "Rskb4pdwM3o",
			},
			{
				id: "cv-pipeline",
				label: "CV Pipeline",
				body: `Face detection failed immediately — performers at 45-foot throw distances don't give enough facial resolution, and stage lighting is too unpredictable. Instead, I made the tracking target easier to find: three 850 nm IR emitters mounted on the performer's costume (shoulders and forehead), wired to a pocket-sized battery pack.

I removed the **Pi HQ camera**'s built-in IR-cut filter and fitted an 850 nm bandpass lens filter, reducing the performer to three bright points against near-total darkness regardless of stage lighting. I trained a **Haar Cascade Classifier** on 2,000 positive and 10,000 negative samples captured in both lab and live stage environments. At runtime, **OpenCV's KCF tracker** maintains position state between frames rather than re-detecting from scratch, running at **~3×** the throughput of raw detection.`,
			},
			{
				id: "serial-comms",
				label: "Communication",
				body: `**DMX512**'s daisy-chain architecture — where every channel packet passes through every device — makes selective channel interception straightforward. The module claims a single control channel and monitors it for operator commands; all other channel data is passed through transparently.

Two parallel C processes handle the actuation stack:

- A fixed-rate DMX Daemon manages all protocol timing and **FTDI (USB) interface I/O** via the **ENTTEC DMX USB Pro**, selectively overwriting pan/tilt channels from shared memory when tracking is active
- A separate Main Control process handles coordinate transformation and state machine logic without competing for the daemon's clock cycle.

Commands are issued from the lightboard using a range-based action table — holding a DMX value in a defined range for one second triggers the corresponding function — the same pattern used by professional fixtures like the **Vari-Lite VL2500**.`,
			},
			{
				id: "hardware-design",
				label: "Hardware Design",
				body: `The **IR beacon array** was designed from scratch around the tracking system's optical requirements. Three 260° 850 nm emitters were wired in series with a current-limiting resistor to a 6V AA battery pack, sized to sit in a performer's back pocket with leads running up to shoulder and forehead mounting points. This is the same routing used for wireless vocalist mic elements, so it integrates naturally into existing costume workflows.

On the camera side, I removed the Pi HQ camera's built-in **IR-cut filter** per Raspberry Pi Foundation instructions and selected an 8mm fixed lens to place the focal plane at ~45 feet — the throw distance to the Mayer Theater's 1/3 stage marking. **Lens selection**, **filter pairing**, and **focal plane** math were all done relative to a specific test venue, which surfaced the key commercial limitation: a production version needs motorized zoom and adjustable focus to be venue-agnostic.`,
			},
			{
				id: "industry-integration",
				label: "Industry Integration",
				body: `Every design decision in this project was made in the context of how professional theater technology actually works. DMX512 is a fully **open standard** maintained by **ESTA** — no licensing, no proprietary pairing, no manufacturer lock-in. By building on top of it rather than around it, this module is compatible with *any* moving light from *any* manufacturer running *any* lightboard (hardware already owned by most theaters) which is exactly the interoperability that makes the $81,000 BlackTrax system unnecessary for most venues.

The control channel action table was designed to mirror the pattern already used by professional fixtures like the Vari-Lite VL2500 — range-based triggers with deliberate gaps to prevent false positives from channel noise. Operators interact with the module entirely from their existing lightboard with no new hardware on the operator side.

On the electrical safety side, the Vari-Lites used for testing are variable-voltage fixtures capable of running on 120V, which avoided the 240V theatrical power grid entirely. A custom Edison-to-L6 adapter was fabricated using theatrical-grade cable under the supervision of SCU's Theater Operations Manager and tested for continuity before being connected to any live circuit — standard practice for theatrical electrical work and a requirement I took seriously given the high-current environment.`,
			},
			{
				id: "results",
				label: "Results",
				body: `The system successfully tracked a performer across the full width of the Mayer Theater stage at SCU in real time (60 frames/second) and was robust across low ambient light, direct spotlight, and IR wash from house lights. Total prototype hardware cost was ~$301; a redesigned BOM with a simpler DMX breakout and Raspberry Pi Nano brings that to ~$130.

The main limitation is lens focal range — the 8mm fixed lens was calibrated for a specific throw distance. A commercial version would need motorized zoom or a more robust calibration process.

The most compelling near-term extensions include
1. Multi-performer tracking which would require led signal sequencing to distinguish between otherwise identical patterns
2. Multi-fixture tracking which would likely require a second camera for 3D localization.`,
			},
			{
				id: "links",
				label: "Links",
				body: "",
				links: [
					{ label: "Thesis PDF", url: "https://scholarcommons.scu.edu/elec_senior/100/", icon: "paper" },
					{ label: "Source Code", url: "https://github.com/claytonwiley/pi-vision-followspot", icon: "github" },
					{ label: "Demo Video", url: "https://youtu.be/Fg9T1ztIY08", icon: "video" },
				]
			}
		]
	},

	{
		id: "modulit",
		title: "ModuLit",
		subtitle: "PoE-powered modular LED lighting system to replace traditional string lights",
		photo: "images/projectPhotos/ModuLit.png",
		tags: ["Embedded Systems", "Power over Ethernet", "LED Control", "STM32", "Hardware Design", "Product Development", "Startup"],
		tabs: [
			{
				id: "overview",
				label: "Overview",
				body: `Lighting a single tree in Monterey costs up to $6,000 in materials and labor. We heard that directly from Thys Norton at the City of Monterey — and it was one of a dozen conversations with Parks & Rec departments, commercial installers, and church AV integrators that confirmed the same thing: traditional string lights are a universal pain point that nobody has adequately solved.

ModuLit replaces the monolithic string with short, individually addressable LED modules that connect through a common interface. Snap them end-to-end for a classic string, branch them for icicle or mesh displays, or build fully custom layouts. A single PoE-powered host controller manages the entire installation — one plug, one point of control, no high-voltage runs across your yard. We built and pitched this as a funded startup venture, completing working prototypes and validating demand across consumer, municipal, and commercial segments before seeking $500K in seed funding.`,
			},
			{
				id: "electrical-architecture",
				label: "Electrical Architecture",
				body: `Each module is built around an STM32 microcontroller driving an LED through a dedicated LED driver, with power and data routed through a branching connector system that handles all inter-module interconnections. A key early design decision was running two data lines — forward and backward — rather than the single data line common in off-the-shelf addressable LED strings. This gives us bidirectional communication and cleaner fault isolation across the chain.

Power delivery is the hardest constraint in a system like this. We chose Power over Ethernet for the host-to-module run specifically to eliminate high-voltage wiring across installation areas. PoE imposes real per-port power budgets, so the beta and V1 products have defined limits on chain length that we're transparent about — and the system is designed to fail safe: exceeding the power budget dims or disables modules rather than creating a hazard. Expanding that ceiling is the primary driver of our V2 and V3 hardware roadmap.`,
			},
			{
				id: "product-design",
				label: "Product Design",
				body: `The core design challenge was making a genuinely novel product feel immediately intuitive. A Home Depot employee told us customers stand in the lighting aisle confused by the sheer variety of incompatible options — our answer was a single modular format with one connector standard, so any module works with any other regardless of configuration.

The physical prototype demonstrates four display topologies from the same set of modules: linear strings, branching icicle drops, flat mesh grids, and custom freeform layouts. Individual module replacement — instead of hunting for one dead bulb in a 50-foot string — was consistently the feature that resonated most with installers and municipal contacts. Storage and teardown are solved by form factor: short modules stack flat and don't tangle.`,
			},
			{
				id: "venture",
				label: "Venture & Pitch",
				body: `We validated ModuLit through direct stakeholder interviews across three segments — individual consumers, municipal Parks & Rec departments (San Jose, Redwood City, Monterey), and commercial lighting installers including Earthscape Gardens, Jolly Lights, and Social Lights. Each group confirmed the same core pain points and willingness to pay for a better solution.

Our go-to-market strategy prioritizes consumer retail first, reaching V2 before targeting larger municipal and commercial contracts that require more inventory depth and longer sales cycles. The retail play is straightforward: shelf placement next to existing string lights, with modularity as the only differentiator that category currently lacks. The pitch was competitive enough to earn positive judge feedback on problem framing, validation depth, and the modularity angle — with the recurring note that the connector interface is the IP worth protecting.`,
			},
			{
				id: "links",
				label: "Links",
				body: "",
				links: [
					{ label: "Pitch Deck", url: "https://github.com/klaytonme/ModuLit/blob/main/Pitch%20Deck.pdf", icon: "docs" },
					{ label: "Pitch Presentation", url: "https://github.com/claytonwiley/modulit/blob/main/Executive_Summary.pdf", icon: "video" },
					{ label: "Executive Summary", url: "https://github.com/klaytonme/ModuLit/blob/main/Executive%20Summary.pdf", icon: "paper" },
					{ label: "Demo Video", url: "https://youtu.be/316i1Ld6ez4", icon: "video" },
				]
			}
		]
	},

	{
		id: "lablink",
		title: "LabLink",
		subtitle: "Distributed wireless queue management system for SCU teaching labs",
		photo: "/images/projectPhotos/LabLink.png",
		tags: ["FreeRTOS", "STM32", "Bluetooth LE", "WiFi", "Embedded C", "RTOS", "PCB Design", "Distributed Systems"],
		tabs: [
			{
				id: "overview",
				label: "Overview",
				body: `LabLink is a distributed embedded queue management system built on FreeRTOS and wireless mesh communication. Each node in the network is symmetric — any device can elect itself host or assume a peripheral role at startup, with no user configuration required. Nodes coordinate state in real time over a shared wireless channel, with physical LED feedback at each station reflecting live queue position across the whole network.

The immediate problem we designed for was SCU's ECEN teaching labs: up to 20 student groups per session, one TA, and no good way to manage who needs help and in what order. A button press enters a group into the FIFO queue; the TA works through stations in order with a single-click dismiss. But the underlying architecture (self-organizing wireless nodes, a centrally managed queue with distributed status feedback, plug-and-play deployment) applies anywhere a fair, ordered call system is needed without permanent infrastructure. The system is agnostic to its environment by design.`,
			},
			{
				id: "rtos-firmware",
				label: "RTOS Firmware",
				body: `The firmware runs three concurrent FreeRTOS tasks on the STM32L475E-IOT01A:
				
- A WiFi/HTTP server task
- A state machine task handling LED control and button permissions and
- A deferred interrupt task triggered by the TA's physical button press via GPIO EXTI callback.
				
A FreeRTOS queue serves as the backbone data structure — FIFO ordering, built-in resource protection, and a natural fit for the problem schema.

Shared state between tasks is protected with a semaphore. The ISR defers processing to the USR_BTN task rather than executing in interrupt context, which keeps interrupt latency low and avoids priority inversion. A one-shot software timer drives the LED feedback on queue removal — the LED extinguishes for two seconds then restores, giving the TA a clear physical confirmation without blocking any task. Total heap usage across all three tasks came to 6,936 bytes against a 9,000 byte allocation, leaving comfortable headroom.`,
			},
			{
				id: "wireless-architecture",
				label: "Wireless Architecture",
				body: `The V1 WiFi architecture required an existing network and a dedicated host device — workable for a lab with reliable infrastructure, but fragile and inflexible for deployment elsewhere. The more interesting and flexible design was V2: a Bluetooth LE mesh where every node is symmetric from the user's perspective.

In the V2 BLE design, nodes communicate over SPI-connected BlueNRG controllers. On startup, each node advertises and scans simultaneously — the first node that powers up and finds no host elects itself; all others connect as peripherals. This negotiation is invisible to users. The host manages the FIFO queue and pushes state updates back to all peripherals so every node's LED reflects real-time queue position. Validating mesh reliability and BLE signal integrity under lab RF conditions was done with bench instrumentation.`,
			},
			{
				id: "pcb-design",
				label: "PCB Design",
				body: `A core goal of the V2 extension was moving from development boards to a purpose-built PCB — one that a TA could plug in at a bench and forget about. The design requirements were strict: no configuration, no network dependency, plug-and-play from power-on. That drove most of the hardware decisions, including the self-electing host architecture and the choice to run on USB power with no external infrastructure.

While still underway, the PCB design process covers full circuit schematic design, component selection, layout and routing, and hands-on assembly including both through-hole and SMD soldering. Designing for ergonomics at a lab bench was the priority: a single button, a single LED, a USB connector. The goal is a unit which does not compromise on cost, footprint, power consumption, or usability.`,
			},
			{
				id: "links",
				label: "Links",
				body: "",
				links: [
					{ label: "Source Code V1", url: "https://github.com/LabLinkSCU/LabLink-HTTP", icon: "github" },
					{ label: "Source Code V2", url: "https://github.com/LabLinkSCU/LabLink-L475E", icon: "github" },
					{ label: "Demo Video V1", url: "https://youtu.be/lbM8WyMebFk", icon: "video" },
					{ label: "Demo Video V2", url: "https://github.com/LabLinkSCU/LabLinkSW/blob/develop/output.log", icon: "video" },
				]
			}
		]
	},
];