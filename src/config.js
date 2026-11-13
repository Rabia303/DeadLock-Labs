// ─────────────────────────────────────────────────────────────
// Deadlock Labs — all site content lives in this file.
// Edit text, links and lists here; the components read from it.
// Leave a link as "" to hide it (e.g. until a profile is live).
// ─────────────────────────────────────────────────────────────


export const SITE = {
  name: "Deadlock Labs",
  tagline: "We turn ideas into working products.",
  intro:
    "A software studio helping businesses, startups and founders launch websites, web apps, mobile apps and AI-powered tools, built by the engineers you actually talk to.",
  location: "Working with clients worldwide",
  founded: "2025",
  slogan: "Innovating. Building. Scaling.",
  // TODO: switch to a studio address (e.g. hello@yourdomain.com) once you have one
  email: "rabiaimtiaz203@gmail.com",
  ccEmail: "tayyabarehanmansoori0099@gmail.com", // project inquiries go to both founders
  whatsapp: "923241458873", // country code, no + or spaces — shows a WhatsApp button
  linkedin: "", // company page URL, once created
  github: "",   // org URL, once created
  url: "https://dead-lock-labs.vercel.app", // live site address — update once deployed / on your domain
};

// ── Forms ───────────────────────────────────────────────────
// Get a free access key at https://web3forms.com (enter your email, the key is
// emailed to you) and paste it below. Contact and audit forms then arrive in that
// inbox directly. Leave it empty and forms open the visitor's email app instead.
export const FORMS = {
  web3formsKey: "9a66b372-a8f8-4e24-933f-94878a0c7795",
};

// Free website audit section.
export const AUDIT = {
  enabled: true,
  eyebrow: "Free website audit",
  title: "Is your website losing you customers?",
  short: "Send us your website and get 5 practical fixes by email within 48 hours, free.",
  text: "Send us your website and we'll review it for free: speed, mobile experience, Google visibility and design. You'll get 5 practical fixes by email within 48 hours, no strings attached.",
  checks: ["Page speed & performance", "Mobile experience", "Google search visibility", "Design & trust signals", "Contact & conversion flow"],
};

// Where clients can hire you. Empty url = shown as "Coming soon".
export const PLATFORMS = [
  {
    id: "upwork",
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~01d3047b395f7bf470",
    blurb: "Hourly or fixed-price contracts with Upwork's payment protection.",
  },
  {
    id: "fiverr",
    name: "Fiverr",
    url: "https://www.fiverr.com/nimra333",
    blurb: "Ready-made packages for web, AI chatbots and Flutter apps.",
  },
  {
    id: "direct",
    name: "Work with us directly",
    url: "#contact",
    blurb: "Tell us about your project and get a free scoping call and quote.",
  },
];

export const SERVICES = [
  {
    icon: "web",
    title: "Websites & Web Apps",
    text: "Business websites, landing pages, dashboards and portals — fast, mobile-friendly and built to grow.",
    stack: ["React", "Angular", "Node.js", ".NET", "MongoDB", "SQL Server"],
  },
  {
    icon: "mobile",
    title: "Mobile Apps",
    text: "Cross-platform iOS and Android apps from one codebase, with clean UI and real-time data.",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs"],
  },
  {
    icon: "ai",
    title: "AI Features & Chatbots",
    text: "Chatbots, document assistants, transcription and smart search built on modern LLM APIs.",
    stack: ["Gemini", "OpenAI", "Whisper", "Python", "Flask"],
  },
  {
    icon: "api",
    title: "Backend & APIs",
    text: "API design, database architecture and third-party integrations that don't break at scale.",
    stack: ["REST", "Node.js", "Flask", ".NET", "JWT Auth"],
  },
  {
    icon: "automation",
    title: "Automation & Scraping",
    text: "Python scripts and pipelines that collect data, clean it and save your team hours every week.",
    stack: ["Python", "Selenium", "BeautifulSoup", "Pandas"],
  },
  {
    icon: "shop",
    title: "Online Stores",
    text: "Shopify and custom e-commerce stores with carts, delivery options and simple order management.",
    stack: ["Shopify", "MERN", "Payments"],
  },
];

// ── Project images ──────────────────────────────────────────
// Two ways to add screenshots (any of .png .jpg .jpeg .webp), no code changes needed:
//   1. One image:   src/assets/screenshots/<slug>.png
//   2. A gallery:   src/assets/screenshots/<slug>/01.png, 02.png, ...  (shown in order)
//      Name a file 00.* or cover.* to use it only as the card cover.
// Until then, the placeholder in src/assets/work/ is shown.
const SCREENSHOTS = import.meta.glob("./assets/screenshots/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}", { eager: true, import: "default" });
const PLACEHOLDERS = import.meta.glob(
  ["./assets/work/*.webp", "!./assets/work/{hotel,laptop1,movie,ngo1,text}.webp"], // unused old files, safe to delete
  { eager: true, import: "default" }
);

const stem = (path) => path.split("/").pop().replace(/\.\w+$/, "").toLowerCase();
const isCover = (path) => /^(00|cover)$/.test(stem(path));

const imageFor = (slug) => {
  const keys = Object.keys(SCREENSHOTS).sort();
  const inFolder = keys.filter((k) => k.toLowerCase().includes(`/screenshots/${slug}/`));
  const gallery = inFolder.filter((k) => !isCover(k)).map((k) => SCREENSHOTS[k]);
  const cover = inFolder.find(isCover);
  const single = keys.find((k) => k.split("/").length === 4 && stem(k) === slug);
  const image = (cover && SCREENSHOTS[cover]) || gallery[0] || (single && SCREENSHOTS[single]);
  if (image) return { image, gallery: gallery.length ? gallery : [image], isScreenshot: true };
  const placeholder = PLACEHOLDERS[`./assets/work/${slug}.webp`];
  return { image: placeholder, gallery: [], isScreenshot: false };
};

// Filter tabs shown above the projects
export const WORK_FILTERS = ["All", "Websites", "Business Systems", "AI", "Mobile"];

// Projects built by the team. `device: "mobile"` = phone screenshots (shown uncropped).
// `demo` = live link (leave "" to hide the button). `label` = optional badge.
const PROJECTS = [
  {
    slug: "muhafiz",
    title: "Muhafiz",
    category: "AI",
    label: "Nominated · P@SHA ICT Awards 2025",
    summary: "Urban safety platform with crime-zone risk maps, incident reporting and safer route suggestions, built on a 100K+ record dataset.",
    caseStudy: {
      challenge: "People in Karachi, women especially, had no easy way to know which areas and routes were unsafe before heading out, and incident information was scattered across news and social media.",
      solution: "We built a community safety platform: a live risk map of crime zones, a safest-route finder, verified incident reporting and a community forum, powered by a 100K+ record crime dataset we collected and cleaned ourselves.",
      results: [
        "Nominated for the P@SHA ICT Awards 2025",
        "100K+ crime records turned into an interactive risk map",
        "Route planning that avoids high-risk zones",
        "Community reports and forum for real-time alerts",
      ],
    },
    stack: ["React", "Node.js", "Flask", "MongoDB"],
  },
  {
    slug: "luxurystay",
    title: "LuxuryStay",
    category: "Business Systems",
    summary: "Hotel and restaurant management with online bookings, automated billing, guest feedback and staff dashboards.",
    caseStudy: {
      challenge: "Running a hotel on phone calls, paper registers and spreadsheets meant double bookings, slow check-outs and no clear view of occupancy or revenue.",
      solution: "A complete hospitality platform: a guest-facing website for browsing rooms and booking online, plus role-based dashboards for reception, housekeeping and management, with automated billing and guest feedback.",
      results: [
        "Online room booking with live availability",
        "Automated invoices at check-out",
        "Separate dashboards for admin, staff and guests",
        "Guest feedback collected after every stay",
      ],
    },
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    slug: "talktotext",
    title: "TalkToText Pro",
    category: "AI",
    summary: "Turns meeting recordings into transcripts, summaries and subtitles, handling a 30-minute meeting in under 2 minutes.",
    caseStudy: {
      challenge: "Teams were losing hours writing up meetings by hand, and anyone who missed a call, or spoke a different language, had no quick way to catch up.",
      solution: "An AI meeting assistant: upload a recording or paste a link, and it produces a transcript, a structured summary with action items, translated subtitles and smart notes, plus a chatbot to ask questions about any past meeting.",
      results: [
        "30-minute meeting processed in under 2 minutes",
        "Transcripts, summaries and subtitles from one upload",
        "Chat with your meetings to find decisions instantly",
        "Searchable history of every processed meeting",
      ],
    },
    stack: ["Flask", "React", "Gemini", "MongoDB"],
  },
  {
    slug: "multivox",
    title: "Multivox",
    category: "AI",
    summary: "AI dubbing and subtitling: upload a video or paste a link and get it back translated with synced voice and captions.",
    stack: ["React", "Flask", "Whisper"],
  },
  {
    slug: "laptop-harbour",
    title: "Laptop Harbour",
    category: "Mobile",
    device: "mobile",
    summary: "Shopping app for laptops and tech products with search, wishlist and a smooth checkout.",
    stack: ["Flutter", "Firebase"],
  },
  {
    slug: "cineflix",
    title: "CineFlix",
    category: "Websites",
    summary: "Movie streaming website with trailers, reviews and an admin dashboard to manage content and see user analytics.",
    stack: ["PHP", "MySQL"],
  },
  {
    slug: "cosmetics-store",
    title: "Cosmetics & Jewelry Store",
    category: "Websites",
    summary: "Online store for a cosmetics and jewelry business with product search, shopping basket, checkout and order management.",
    stack: ["PHP", "MySQL", "Bootstrap"],
  },
  {
    slug: "drivexchange",
    title: "DriveXChange",
    category: "Websites",
    summary: "Car rental website with vehicle browsing, online bookings and an admin dashboard for rentals and customers.",
    stack: ["PHP", "MySQL", "Bootstrap"],
  },
  {
    slug: "give-aid",
    title: "Give-AID",
    category: "Websites",
    summary: "NGO website with donations, campaigns and content management through separate admin and user portals.",
    stack: [".NET MVC", "SQL Server"],
  },
  {
    slug: "dineflow",
    title: "DineFlow",
    category: "Business Systems",
    summary: "Restaurant management system with menu management, live order tracking and sales dashboards.",
    stack: [".NET MVC", "SQL Server", "Bootstrap"],
  },
  {
    slug: "docudraft",
    title: "DocuDraft Pro",
    category: "AI",
    summary: "AI writing assistant for proposals, contracts and reports with templates, compliance checks and PDF/DOCX export.",
    stack: ["React", "Flask", "Gemini", "MongoDB"],
  },
  {
    slug: "geospeak",
    title: "GeoSpeak",
    category: "AI",
    summary: "Translation app for text and images across many languages, with conversation mode and translation history.",
    stack: ["React", "Flask", "Gemini"],
  },
  {
    slug: "hrgenix",
    title: "HRGenix",
    category: "Business Systems",
    summary: "HR software for employee records, payroll and expense tracking, with role-based access and reports.",
    stack: ["C#", "SQL Server"],
  },
  {
    slug: "fintrack",
    title: "FinTrack",
    category: "Mobile",
    device: "mobile",
    summary: "Expense tracker app that sorts spending into categories and syncs in real time across devices.",
    stack: ["Flutter", "Firebase"],
  },
  {
    slug: "tripbudgeter",
    title: "TripBudgeter",
    category: "Mobile",
    device: "mobile",
    summary: "Travel budgeting app to plan trips and track expenses on the go, with a separate admin panel.",
    stack: ["Flutter", "Firebase"],
  },
  // Concept demo sites (live pages in public/demos/). Show clients what their site could look like.
  {
    slug: "demo-restaurant",
    title: "Ember & Spice",
    category: "Websites",
    label: "Concept demo · Restaurant",
    summary: "Restaurant website with a tabbed menu, table booking, WhatsApp ordering, opening hours and directions.",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "/demos/restaurant/index.html",
  },
  {
    slug: "demo-clinic",
    title: "CarePoint Family Clinic",
    category: "Websites",
    label: "Concept demo · Clinic",
    summary: "Clinic website with online appointment slots, doctor profiles, services, timings and FAQs.",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "/demos/clinic/index.html",
  },
  {
    slug: "demo-clothing",
    title: "Noor Atelier",
    category: "Websites",
    label: "Concept demo · Clothing brand",
    summary: "Online store for a clothing brand with collections, product filters, shopping bag and WhatsApp checkout.",
    stack: ["HTML", "CSS", "JavaScript"],
    demo: "/demos/clothing/index.html",
  },
];

export const WORK = PROJECTS.map((p) => ({ demo: "", device: "desktop", ...p, ...imageFor(p.slug) }));

// Hero: headline + the projects shown in the stacked previews (by slug, front card first).
export const HERO = {
  eyebrow: "Taking on new projects",
  title: "We turn ideas into",
  highlight: "software that works.",
  short: "Fast, mobile-friendly websites, online stores, apps and AI tools for growing businesses.",
  text: "We design and build fast, mobile-friendly websites and online stores for restaurants, clinics, shops and startups, plus web apps, mobile apps and AI tools when you're ready to grow.",
  previews: ["luxurystay", "muhafiz", "talktotext", "multivox"],
  phone: "laptop-harbour", // mobile project shown in the phone mockup
};

// Founding client offer. Set enabled: false to hide it once you have reviews.
export const FOUNDING_OFFER = {
  enabled: false,
  eyebrow: "Founding client offer",
  title: "Be one of our first 5 clients",
  text: "We're a new studio building our client list. Our first five clients get founding rates in exchange for an honest review and permission to feature the project here.",
  perks: [
    "20% off your first project",
    "60 days of free support after launch (instead of 30)",
    "Priority scheduling and direct WhatsApp access",
  ],
  cta: "Claim a founding spot",
};

// Client reviews. The section stays hidden until you add at least one.
// Example: { quote: "…", name: "Ali Khan", role: "Owner, Café Name", project: "Restaurant website" }
export const TESTIMONIALS = [];

// ── Pricing ──────────────────────────────────────────────────
// Starting prices. Visitors in Pakistan see Rs by default, everyone else sees $.
export const CURRENCIES = { PKR: "Rs", USD: "$" };

export const PACKAGES = [
  {
    name: "Starter Website",
    price: { PKR: "Rs 35,000", USD: "$300" },
    for: "For new businesses that need to get online fast.",
    time: "1–2 weeks",
    features: [
      "Landing page or up to 5 pages",
      "Mobile-friendly, fast-loading design",
      "Contact form and WhatsApp button",
      "Google Maps and basic SEO setup",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Business Website",
    popular: true,
    price: { PKR: "Rs 75,000", USD: "$650" },
    for: "For businesses that want a site that brings in customers.",
    time: "2–3 weeks",
    features: [
      "Up to 12 pages with a custom design",
      "Admin panel to edit your own content",
      "Booking, inquiry or quote forms",
      "SEO, speed and Google Analytics setup",
      "Google Business Profile setup",
      "3 rounds of revisions",
    ],
  },
  {
    name: "Online Store",
    price: { PKR: "Rs 120,000", USD: "$1,100" },
    for: "For brands ready to sell online.",
    time: "3–5 weeks",
    features: [
      "Product catalogue with categories and filters",
      "Cart, checkout and order tracking",
      "Payments: COD, JazzCash, Easypaisa, cards or Stripe",
      "Order and inventory dashboard",
      "Delivery charges and discount codes",
      "Training on managing your store",
    ],
  },
];

export const CUSTOM_PRICING = [
  { name: "Web apps & business systems", price: { PKR: "from Rs 250,000", USD: "from $2,500" } },
  { name: "Mobile apps (Android & iOS)", price: { PKR: "from Rs 300,000", USD: "from $3,000" } },
  { name: "AI chatbot or AI feature", price: { PKR: "from Rs 60,000", USD: "from $600" } },
  { name: "Monthly maintenance & updates", price: { PKR: "from Rs 10,000/mo", USD: "from $80/mo" } },
];

export const INCLUDED = [
  "Mobile-friendly on every screen",
  "Free SSL (https) and speed optimisation",
  "Basic SEO so Google can find you",
  "30 days of free bug fixes",
  "Full source code and admin access",
  "Walkthrough video at handover",
];

// Industries section on the home page.
export const INDUSTRIES = [
  { icon: "food", name: "Restaurants & Cafés", text: "Menus, table bookings and WhatsApp ordering." },
  { icon: "health", name: "Clinics & Healthcare", text: "Appointments, doctor profiles and patient forms." },
  { icon: "shop", name: "Retail & Fashion", text: "Online stores with payments and delivery." },
  { icon: "home", name: "Real Estate", text: "Property listings, filters and lead capture." },
  { icon: "school", name: "Schools & Academies", text: "Course pages, admissions and student portals." },
  { icon: "rocket", name: "Startups & SaaS", text: "MVPs, dashboards and subscription products." },
  { icon: "heart", name: "NGOs & Nonprofits", text: "Donations, campaigns and volunteer sign-ups." },
  { icon: "truck", name: "Logistics & Services", text: "Booking systems, tracking and internal tools." },
];

// Scrolling tech-stack strip (names must match icons in Sections.jsx).
export const TECH = ["React", "Angular", "Node.js", "Express", ".NET", "Flutter", "Dart", "Firebase", "MongoDB", "MySQL", "Python", "Flask", "Gemini", "OpenAI", "Tailwind", "Shopify", "WordPress", "Figma"];

export const PROCESS = [
  { title: "Discover", text: "A free call to understand your goal, users and budget. You get a clear scope and quote — no jargon." },
  { title: "Design", text: "Wireframes and UI for the key screens, so you see the product before a line of code is written." },
  { title: "Build", text: "Weekly demos and progress updates. You can test features as they land, not just at the end." },
  { title: "Launch & Support", text: "We deploy, hand over the code and docs, and stay on for fixes and improvements." },
];

export const TEAM = [
  {
    name: "Rabia Imtiaz",
    role: "Head of Technology · Backend & AI",
    initials: "RI",
    bio: "Technology consultant delivering enterprise platforms for logistics and terminal operations. Leads backend architecture, databases, integrations and AI features, so every product we ship is secure, fast and built to scale.",
    skills: ["Node.js", "Flask", ".NET", "MongoDB", "SQL Server", "Gemini"],
    links: {
      linkedin: "https://www.linkedin.com/in/rabia-imtiaz/",
      email: "rabiaimtiaz203@gmail.com",
    },
  },
  {
    name: "Tayyaba Rehan",
    role: "Head of Product · Web, Mobile & Design",
    initials: "TR",
    bio: "Builds across the stack, from React and Angular interfaces to Node.js and ASP.NET MVC backends and Flutter mobile apps, and leads product design and user experience. Has delivered AI products including TalkToText Pro, Multivox and GeoSpeak.",
    skills: ["React", "Angular", "Node.js", "ASP.NET MVC", "Flutter", "UI/UX"],
    links: {
      linkedin: "https://www.linkedin.com/in/tayyaba-rehan/",
      email: "tayyabarehanmansoori0099@gmail.com",
    },
  },
];

export const WHY_US = [
  { title: "Talk to the engineers", text: "No account managers in between. The people building your product are the people you talk to." },
  { title: "Full stack, one team", text: "Backend, frontend, mobile and AI under one roof — no juggling separate freelancers." },
  { title: "Visible progress", text: "Weekly demos and a shared board, so you always know what's done and what's next." },
  { title: "You own everything", text: "Full source code, documentation and deployment access handed over at the end." },
];

export const STATS = [
  { value: "50+", label: "Projects delivered" },
  { value: "8+", label: "Industries served" },
  { value: "Enterprise", label: "Systems experience" },
  { value: "24h", label: "Response time" },
];

export const PROJECT_TYPES = ["Business website", "Online store", "Web app", "Mobile app", "AI feature / chatbot", "Backend / API", "Automation", "Not sure yet"];
// Budget options in the contact form follow the currency picked in Pricing.
export const BUDGETS = {
  PKR: ["Under Rs 50,000", "Rs 50,000 – 150,000", "Rs 150,000 – 400,000", "Rs 400,000+", "Not sure yet"],
  USD: ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"],
};

export const FAQ = [
  { q: "How much does a project cost?", a: "See the starting prices in Pricing. After a short call we send a fixed quote with clear milestones, so there are no surprises." },
  { q: "Do you handle the domain and hosting?", a: "Yes. We can register your domain, set up hosting and a business email, and keep it all in your name. These are billed at cost." },
  { q: "Will I be able to update the website myself?", a: "Yes. Business websites and stores come with a simple admin panel, and we show you how to use it at handover." },
  { q: "How long does it take?", a: "Simple websites and tools: 1–3 weeks. Full web or mobile apps: usually 4–10 weeks. You'll get a timeline with the quote." },
  { q: "How do payments work?", a: "Milestone-based: you pay for each stage as it's delivered. On Upwork and Fiverr, payments go through the platform's protection." },
  { q: "Do I own the code?", a: "Yes. Once the project is paid, the full source code, assets and documentation are yours." },
  { q: "Do you offer support after launch?", a: "Yes — every project includes a free bug-fix period, and we offer monthly support for updates and new features." },
  { q: "Can you work with my existing codebase?", a: "Yes. We regularly add features to, fix or modernise existing web, mobile and backend projects." },
];
