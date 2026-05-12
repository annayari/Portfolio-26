export interface SimpleResult {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

export interface ProblemPoint {
  title: string;
  description: string;
}

export interface Solution {
  id: string;
  title: string;
  intro?: string;
  designProcess: string[];
  userStories?: string[];
  results: string[];
  nextSteps?: string[];
}

export interface MetricRow {
  metric: string;
  change: string;
}

export interface Case {
  slug: string;
  title: string;
  company: string;
  companyUrl?: string;
  period?: string;
  year: string;
  categories: string[];
  summary: string;
  coverColor: string;
  // Overview / Problem
  overview?: string;
  problem: string;
  problemPoints?: ProblemPoint[];
  goals?: string[];
  // Research (standard)
  research: string;
  // Rich: solutions (Mate Academy style)
  solutions?: Solution[];
  mobileSection?: { bullets: string[]; results: string[] };
  combinedMetrics?: MetricRow[];
  // Standard results + learnings
  results: SimpleResult[];
  learnings: string[];
  navSections?: { id: string; label: string }[];
}

export const cases: Case[] = [
  {
    slug: "mate-academy",
    title: "Boosting DAU/MAU by 36% with a Gamification System",
    company: "Mate Academy",
    companyUrl: "https://mate.academy",
    period: "June 2022 — June 2024",
    year: "2024",
    categories: ["EdTech", "Mobile", "Web", "Gamification"],
    summary:
      "Designed a full gamification ecosystem — leaderboards, achievements, streaks, and soft deadlines — that became the primary driver of daily engagement on a self-paced coding platform.",
    coverColor: "#2D6A4F",
    overview:
      "Mate Academy is an EdTech platform offering self-paced coding courses with mentorship. While the curriculum was strong, the platform lacked engagement mechanisms — students had no way to measure their pace against peers, felt isolated during months-long courses, and struggled to maintain motivation without external accountability.\n\nI led the design of a full gamification ecosystem — leaderboards, achievements, streaks, and soft deadlines — across web and mobile. The system shipped incrementally over two years and became the primary driver of daily engagement.",
    problem:
      "Long-form, self-paced courses create a specific motivational challenge. Without cohort structure or deadlines, students drift.",
    problemPoints: [
      {
        title: "No sense of pace",
        description:
          "Students could only compare their progress against their own past performance. Without peer benchmarks, they had no way to know whether they were on track, falling behind, or ahead.",
      },
      {
        title: "Isolation",
        description:
          "Despite thousands of students studying simultaneously, the platform felt solitary. There was no visibility into who else was learning, no shared experience, and no social dimension to the product.",
      },
      {
        title: "Motivation decay",
        description:
          "Without external reinforcement, intrinsic motivation alone wasn't sufficient to carry students through courses lasting several months. Drop-off rates increased steadily after the first few weeks.",
      },
    ],
    goals: [
      "Increase DAU/MAU to ensure more students complete courses",
      "Boost engagement and reduce churn by making learning competitive and social",
      "Reduce isolation by creating visibility into peer activity",
      "Enable students to benchmark their progress against others",
      "Provide recurring incentives to use the platform daily",
    ],
    research:
      "Conducted 6 in-depth interviews to understand user challenges, goals, and motivations. Ran competitor analysis across EdTech and gaming platforms. Surveyed 50+ current users about learning habits and motivation barriers.",
    solutions: [
      {
        id: "leaderboard",
        title: "Leaderboard",
        intro:
          "Adding a competitive layer where students earn XP and are ranked against peers within time-bound leagues.",
        designProcess: [
          "Collaborated with the product manager on research plan, hypotheses, and MVP scope",
          "Conducted 6 in-depth interviews to understand user challenges, goals, and motivations",
          "Ran competitor analysis across EdTech and gaming platforms to study engagement patterns",
          "Developed user stories to map student needs and expectations",
          "Created UI direction aligned with the platform's brand identity",
          "Worked with engineering to ensure technical feasibility and prevent implementation delays",
          "Conducted usability testing with 7 students and iterated on feedback",
          "Delivered responsive designs, handed off to developers, and ran regular design reviews",
        ],
        userStories: [
          "As a student, I want a leaderboard to feel motivation and healthy competition.",
          "As a student, I want to compare my progress with peers and know a normal pace of studying.",
          "As a student, I want to not feel isolated as I see how other students are studying.",
        ],
        results: [
          "DAU/MAU +36% weekends, +15% weekdays",
          "Leaderboard made the platform genuinely social and significantly increased student engagement",
        ],
        nextSteps: [
          "Introduce time-based competitions to sustain engagement and give new users regular entry points",
          "Improve leaderboard UI on the main page",
        ],
      },
      {
        id: "achievements",
        title: "Achievements",
        intro:
          "A multi-tier achievement system rewarding both simple actions (early engagement hooks) and advanced milestones (quality benchmarks), giving students clear progression signals.",
        designProcess: [
          "Identified areas needing motivation through analysis of early user behavior patterns and desired platform interactions",
          "Conducted competitor analysis of achievement systems in educational and gaming products",
          "Designed graphical elements for reuse across different achievement categories",
          "Defined specific achievement names, thresholds, and unlock timing",
        ],
        results: [
          "Graded homework checks increased by 20% — students began rating mentor feedback more actively after achievement incentives were introduced",
          "Students collectively open 46,000 awards per month across all categories",
          "400 users interact with achievements daily",
        ],
      },
      {
        id: "streaks",
        title: "Streaks",
        intro:
          "A daily consistency mechanic encouraging students to maintain unbroken study chains. Streaks leverage the brain's natural tendency toward loss aversion — once a streak is established, breaking it feels costly.",
        designProcess: [
          "Conducted competitive analysis of gamification patterns across EdTech and gaming",
          "Surveyed 50+ current users about learning habits and motivation barriers",
          "Designed streak logic and visual treatment that celebrates consistency without overwhelming the learning experience",
          "Conducted moderated usability testing with 10 users",
          "Iterated design to include a streak freeze feature and progressive onboarding explaining the value of consistency",
          "Ran iterative feedback sessions with users to refine feature logic",
          "Handed off to developers with regular design reviews",
          "Post-launch validation: tested with 5 additional users after soft launch, confirming improved clarity around streak value and reduced anxiety about missed days",
        ],
        results: [
          "Average daily time on platform increased by 30 minutes",
          "Students complete 2× more daily tasks",
          "42% of users interact with streaks daily",
        ],
        nextSteps: [
          "Allow users to restore broken streaks once per month to reduce frustration",
          "Adjust streak requirements for weekends when study patterns differ",
          "Add milestone rewards to encourage long-term commitment",
        ],
      },
      {
        id: "soft-deadlines",
        title: "Soft Deadlines",
        intro:
          "A flexible deadline system allowing students to set and adjust their own course completion timeframes. The feature addresses a real tension: some students chose Mate Academy specifically because it's self-paced, while others struggle without external structure.",
        designProcess: [
          "Surveyed users to understand the deadline preference split and motivational challenges",
          "Created interactive prototypes with multiple deadline modes and customization options",
          "Conducted 10+ user tests to validate the toggle functionality and deadline selection flow",
          "Implemented improvements based on feedback, focusing on deadline flexibility and stress reduction",
        ],
        results: [
          "A major pain point resolved — students now understand their pace and projected completion date",
          "42% of new students have activated soft deadlines since launch",
        ],
        nextSteps: [
          "Track when and why users modify deadlines to optimize default suggestions",
          "Implement a progressive gentle reminder system",
        ],
      },
    ],
    mobileSection: {
      bullets: [
        "Adapted web gamification features for mobile interfaces and touch interactions",
        "Designed mobile-optimized progress tracking for monitoring course advancement",
        "Created consistent visual language between web and mobile for seamless cross-platform experience",
        "Integrated push notifications for streak maintenance and achievement celebrations",
      ],
      results: [
        "17% of notification center openings occurred via the mobile app",
        "Users can now access leaderboard and streaks from mobile",
        "Mobile app usage increased by 7.37% following gamification integration",
      ],
    },
    combinedMetrics: [
      { metric: "DAU/MAU (weekends)", change: "+36%" },
      { metric: "DAU/MAU (weekdays)", change: "+15%" },
      { metric: "Graded homework checks", change: "+20%" },
      { metric: "Daily time on platform", change: "+30 min" },
      { metric: "Daily task completion", change: "2×" },
      { metric: "Daily streak interactions", change: "42% of users" },
      { metric: "Monthly achievement opens", change: "46,000" },
      { metric: "Daily achievement interactions", change: "400 users" },
      { metric: "Soft deadline adoption", change: "42% of new students" },
      { metric: "Mobile app usage", change: "+7.37%" },
    ],
    results: [],
    learnings: [
      "Ship simple, iterate fast. Users preferred working features that improved over time rather than feature-heavy initial releases. Starting with a lean MVP and layering complexity based on real usage data consistently produced better outcomes.",
      "Explain the 'why', not just the 'how'. Feature adoption depended on users understanding the value proposition. Progressive onboarding that communicated why a feature matters — not just how to use it — was crucial for engagement.",
      "Behavior data over stated preferences. Weekly data reviews became essential for prioritization. Actual user behavior frequently diverged from what users said they wanted in interviews and surveys.",
      "Gamification works as an ecosystem. No single feature moved the needle dramatically on its own. The combined effect of leaderboards, achievements, streaks, and deadlines created compounding engagement improvements that exceeded the sum of individual features.",
    ],
    navSections: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "discovery", label: "Discovery" },
      { id: "streaks", label: "Streaks" },
      { id: "leaderboard", label: "Leaderboard" },
      { id: "achievements", label: "Achievements" },
      { id: "soft-deadlines", label: "Soft deadlines" },
      { id: "mobile", label: "Mobile" },
      { id: "learnings", label: "Learnings" },
    ],
  },
  {
    slug: "mate-academy-social",
    title: "Boosting user DMs and task interaction by 15% with launched social features",
    company: "Mate Academy",
    companyUrl: "https://mate.academy",
    period: "2023",
    year: "2023",
    categories: ["EdTech", "Web", "Social Features"],
    summary:
      "Designed and shipped a social layer for the learning platform — direct messaging, peer interactions, and task-based social features — increasing DMs and task engagement by 15%.",
    coverColor: "#3A6B9F",
    overview:
      "Mate Academy students were learning in isolation. Even with thousands of peers on the platform, there was no way to connect, ask for help, or share progress. I designed a social layer — DMs, peer interactions, and task-based engagement features — to reduce isolation and increase platform stickiness.",
    problem:
      "The platform lacked social infrastructure. Students couldn't message peers, share wins, or ask questions in context. This made the experience feel solitary and reduced the incentive to return daily.",
    problemPoints: [
      {
        title: "No peer communication",
        description: "Students had no way to reach out to classmates — no DMs, no in-context messaging, no way to celebrate each other's progress.",
      },
      {
        title: "Low task engagement",
        description: "Without social reinforcement, students didn't feel motivated to complete optional tasks or share their work.",
      },
      {
        title: "High isolation score",
        description: "Survey data showed that 60%+ of students felt they were studying alone, despite thousands of active users.",
      },
    ],
    research:
      "Conducted 5 user interviews and reviewed behavioral data to understand social needs and communication patterns. Benchmarked against social features in Duolingo, Discord, and LinkedIn Learning.",
    results: [
      { label: "DM activity", before: "baseline", after: "+15%", improvement: "+15%" },
      { label: "Task interaction rate", before: "baseline", after: "+15%", improvement: "+15%" },
    ],
    learnings: [
      "Social features have to be embedded in the learning flow — standalone chat is ignored, but contextual messaging drives usage.",
      "Ship incrementally. DMs first, then reactions, then task sharing. Each layer built on the previous.",
      "Notifications are the activation mechanism. Without them, social features stay dormant.",
    ],
    navSections: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "discovery", label: "Discovery" },
      { id: "profiles", label: "User Profiles" },
      { id: "peer-solutions", label: "Peer Solutions" },
      { id: "mobile", label: "Mobile" },
      { id: "learnings", label: "Learnings" },
    ],
  },
  {
    slug: "mate-academy-mentor",
    title: "Reducing the time for mentors to review home tasks by 25%",
    company: "Mate Academy",
    companyUrl: "https://mate.academy",
    period: "2022–2023",
    year: "2023",
    categories: ["EdTech", "Web", "Internal Tools"],
    summary:
      "Redesigned the mentor task review flow — reducing average review time by 25% and improving feedback quality — by streamlining the interface and surfacing the right context at the right moment.",
    coverColor: "#5A4B8A",
    overview:
      "Mentors at Mate Academy were spending too long on task reviews — navigating between screens, re-reading context, and formatting feedback manually. I redesigned the review interface to surface student context inline, standardize feedback patterns, and eliminate unnecessary steps.",
    problem:
      "The existing review interface required mentors to jump between multiple screens to understand student context before leaving feedback. This was slow, error-prone, and led to inconsistent feedback quality.",
    problemPoints: [
      {
        title: "Fragmented context",
        description: "Mentors had to open separate tabs to see student progress, previous submissions, and task requirements — before they could even start reviewing.",
      },
      {
        title: "Manual feedback formatting",
        description: "There was no structured way to leave feedback. Mentors typed everything from scratch, leading to inconsistency across 50+ mentors.",
      },
      {
        title: "No prioritization",
        description: "The task queue showed everything in chronological order — urgent overdue tasks were buried alongside fresh submissions.",
      },
    ],
    research:
      "Shadowed 6 mentors during review sessions to map the current flow. Identified where time was lost and what context mentors needed most. Ran a time-on-task study to establish baseline metrics.",
    results: [
      { label: "Average review time", before: "12 min", after: "9 min", improvement: "−25%" },
      { label: "Feedback consistency score", before: "baseline", after: "+30%", improvement: "+30%" },
      { label: "Mentor satisfaction", before: "baseline", after: "+40%", improvement: "+40%" },
    ],
    learnings: [
      "Context at the point of action beats centralized dashboards. Surfacing student history inline saved more time than any other change.",
      "Templates reduce cognitive load — structured feedback options improved both speed and consistency.",
      "Observe before you design. The shadowing sessions revealed pain points that interviews alone would have missed.",
    ],
    navSections: [
      { id: "overview", label: "Overview" },
      { id: "problem", label: "Problem" },
      { id: "discovery", label: "Discovery" },
      { id: "review-plugin", label: "Review Plugin" },
      { id: "time-tracker", label: "Time Tracker" },
      { id: "dashboard", label: "Dashboard" },
      { id: "learnings", label: "Learnings" },
    ],
  },
  {
    slug: "casavista-app",
    title: "Increasing new user conversion to subscription by 30%",
    company: "CasaVista",
    period: "Oct 2024 – Apr 2026",
    year: "2024–2026",
    categories: ["iOS App", "B2C", "AI", "Growth Design"],
    summary:
      "Led product design for an AI interior design app from pre-launch to product-market fit — driving 100% trial-to-paid conversion growth and +$82K MRR over 18 months as sole designer.",
    coverColor: "#C8B4A0",
    overview:
      "Joined pre-launch, before the first user. Designed the product end-to-end — from the first onboarding screen to the subscription paywall — and owned the full growth loop across acquisition, activation, conversion, and retention.",
    problem:
      "The product had a clear value proposition — upload a photo of any room, get an AI-generated redesign in seconds. The hard part was building a funnel that converted that value into revenue, from scratch, with no existing user base and no benchmark data.",
    problemPoints: [
      {
        title: "Activation",
        description:
          "67% of users churned before generating their first design. The entry point required finding and uploading a photo before seeing any result — too much friction before any value.",
      },
      {
        title: "Monetization",
        description:
          "96.8% of users dismissed the paywall after their first generation. Exit surveys showed 62% said 'I need to try more first.' The product was asking for commitment before building conviction.",
      },
      {
        title: "Retention",
        description:
          "78% of users never returned after day one. No engagement hooks. No reason to come back.",
      },
    ],
    research:
      "15 user interviews and session recording analysis from the first cohort. Identified three compounding problems across activation, monetization, and retention. Behavioral data tracked conversion rates at each step, A/B tested across 10,000–15,000 users per experiment.",
    results: [
      { label: "Trial-to-paid conversion", before: "22%", after: "44%", improvement: "+100%" },
      { label: "New user activation", before: "33%", after: "51%", improvement: "+55%" },
      { label: "Monthly Recurring Revenue", before: "$38K", after: "$120K", improvement: "+$82K" },
      { label: "Time to first generation", before: "4.5 min", after: "1.2 min", improvement: "−73%" },
      { label: "D7 retention", before: "baseline", after: "+38%", improvement: "+38%" },
      { label: "Annual plan adoption", before: "23%", after: "52%", improvement: "+126%" },
      { label: "ASO ranking", before: "#47", after: "#8", improvement: "↑39 positions" },
    ],
    learnings: [
      "Copy is design. 'Redesign This Room' moved conversion more than any visual change I shipped.",
      "Timing beats messaging. The best paywall copy fails before conviction is built. Delaying the ask until after three generations produced 86% higher LTV.",
      "Discovery is a design problem. Surfacing editing tools properly drove more paid conversion than building new features would have.",
      "Iteration over redesign. Eighteen months of sequenced bets compounded into 100% conversion growth. No big-bang launch.",
    ],
    navSections: [
      { id: "overview",    label: "Overview" },
      { id: "discovery",   label: "Discovery" },
      { id: "paywall",     label: "Paywall" },
      { id: "funnel",      label: "Funnel" },
      { id: "engagement",  label: "Engagement" },
      { id: "system",      label: "Design system" },
      { id: "learnings",   label: "Learnings" },
    ],
  },
  {
    slug: "renovio",
    title: "Renovio — Home Renovation App",
    company: "Renovio",
    year: "2023",
    categories: ["Mobile App", "UX Research", "Design System"],
    summary:
      "Redesigned the end-to-end renovation planning experience, reducing project setup time by 40% and increasing contractor bookings by 28%.",
    coverColor: "#D4B896",
    problem:
      "Homeowners struggled to manage renovation projects across multiple contractors, timelines, and budgets. The existing app had a 67% drop-off rate during project creation.",
    research:
      "Conducted 12 in-depth interviews with homeowners and 8 with contractors. Identified three core pain points: unclear scope estimation, lack of trust signals, and poor contractor communication tools.",
    results: [
      { label: "Drop-off rate", before: "67%", after: "31%", improvement: "-54%" },
      { label: "Project setup time", before: "24 min", after: "14 min", improvement: "-42%" },
      { label: "Contractor bookings", before: "baseline", after: "+28%", improvement: "+28%" },
    ],
    learnings: [
      "Trust is built through transparency — showing contractor reviews, licenses, and past work upfront eliminated hesitation.",
      "Progressive disclosure in complex forms reduces cognitive load more than splitting into separate screens.",
      "Real-time cost estimation needs to feel alive; static ranges were ignored but dynamic updates drove engagement.",
    ],
  },
  {
    slug: "ai-assistants",
    title: "AI Assistants Platform",
    company: "Internal / Side Project",
    year: "2024",
    categories: ["Product Design", "AI/ML", "Prototyping"],
    summary:
      "Designed a conversational AI platform for household tasks — interior design, gardening, renovation, and pet care — from zero to shipped in 6 weeks.",
    coverColor: "#9B8FC0",
    problem:
      "Generic AI chatbots lacked the domain context to give useful home-management advice. Users wanted a dedicated, personality-driven assistant, not a blank chat window.",
    research:
      "Ran a 2-week diary study with 20 participants tracking home management questions they asked AI tools. Discovered that 80% of queries fell into 5 clear domains.",
    results: [
      { label: "Task completion rate", before: "52%", after: "81%", improvement: "+56%" },
      { label: "Session length", before: "2.1 min", after: "6.4 min", improvement: "+204%" },
      { label: "Return rate (7d)", before: "18%", after: "47%", improvement: "+161%" },
    ],
    learnings: [
      "Persona-driven AI interfaces outperform generic ones when the user has a specific domain in mind.",
      "Suggested prompts are a crutch early on but become noise once users know what to ask — design for both states.",
      "Loading states in AI responses are a design surface, not an afterthought.",
    ],
  },
  {
    slug: "design-system",
    title: "UI Kit & Design System",
    company: "Personal Project",
    year: "2024",
    categories: ["Design System", "Component Library", "Documentation"],
    summary:
      "Built a production-ready design system from tokens to React components, serving as the foundation for 3 shipped products.",
    coverColor: "#8AB4C0",
    problem:
      "Each product was designed and built in isolation, causing inconsistency in visual language, duplicated effort, and slow iteration cycles across teams.",
    research:
      "Audited 3 existing products and catalogued 200+ unique UI patterns. Interviewed 6 engineers and 4 designers about their biggest friction points when building new features.",
    results: [
      { label: "Component reuse", before: "12%", after: "78%", improvement: "+550%" },
      { label: "Design-to-dev handoff time", before: "3 days", after: "4 hours", improvement: "-88%" },
      { label: "Visual inconsistencies", before: "47 types", after: "3 types", improvement: "-94%" },
    ],
    learnings: [
      "Naming is half the battle — consistent token names across Figma, CSS, and code dramatically reduce handoff friction.",
      "Ship a minimal viable system early; waiting for completeness means it never ships.",
      "The system is only as good as its documentation. Usage examples matter more than API specs.",
    ],
  },
];

export const articles = [
  {
    title: "How I Use AI in My Design Workflow Without Losing Creative Control",
    platform: "Medium",
    date: "Jan 2024",
    url: "#",
  },
  {
    title: "Designing for Accessibility: 5 Lessons From Real User Testing",
    platform: "UX Planet",
    date: "Nov 2023",
    url: "#",
  },
  {
    title: "Tokens All the Way Down: Building a Design System That Scales",
    platform: "Design Week",
    date: "Sep 2023",
    url: "#",
  },
  {
    title: "Prototyping With AI Tools: What Works, What Doesn't",
    platform: "Prototypr",
    date: "Jul 2023",
    url: "#",
  },
];

export const testimonials = [
  {
    quote:
      "Each project under her collaboration has resulted in outstanding outcomes. Anna always demonstrates a proactive attitude towards designs and is ready to suggest better ways to solve problems. She follows the design process really great",
    name: "Oleksandr Bartosiuk",
    role: "CEO & Founder at Kodree, former colleague at Mate acadamy",
    initials: "OB",
    image: "/avatar-oleksandr.png",
  },
  {
    quote:
      "Anna has been an invaluable member of our team. Her user-centered approach, strong design skills, and ability to create engaging, intuitive interfaces significantly contributed to improving retention and overall platform engagement.",
    name: "Volodymyr Kryvytsky",
    role: "Frontend Lead at Howly, former colleague at Mate acadamy",
    initials: "VK",
    image: "/avatar-volodymyr.png",
  },
];

export const aiTools = [
  {
    name: "Claude",
    description: "Research synthesis, writing critique, and thinking through design decisions out loud.",
    emoji: "🤖",
  },
  {
    name: "Midjourney",
    description: "Early-stage visual exploration and mood board generation before opening Figma.",
    emoji: "🎨",
  },
  {
    name: "Figma AI",
    description: "Auto-layout suggestions, copy generation, and quick content fills during ideation.",
    emoji: "✏️",
  },
  {
    name: "NotebookLM",
    description: "Uploading research transcripts and synthesizing patterns across 10+ interviews at once.",
    emoji: "📓",
  },
  {
    name: "Cursor",
    description: "Rapid HTML/CSS prototyping when Figma isn't fast enough to test an interaction.",
    emoji: "⚡",
  },
  {
    name: "Perplexity",
    description: "Domain research with citations — especially useful for unfamiliar industries.",
    emoji: "🔍",
  },
];

export const albums = [
  { name: "Kind of Blue", artist: "Miles Davis", color: "#1A2744" },
  { name: "Random Access Memories", artist: "Daft Punk", color: "#C8A84B" },
  { name: "OK Computer", artist: "Radiohead", color: "#3D6B5E" },
  { name: "Blonde", artist: "Frank Ocean", color: "#D4944A" },
  { name: "In Rainbows", artist: "Radiohead", color: "#8B4E6B" },
];

export const defaultNavSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "iterations", label: "Iterations" },
  { id: "explorations", label: "Explorations" },
  { id: "prototypes", label: "Prototypes" },
  { id: "experiments", label: "Search & experiments" },
  { id: "results", label: "Results + metrics" },
  { id: "learnings", label: "Learnings" },
];

export const caseNavSections = defaultNavSections;
