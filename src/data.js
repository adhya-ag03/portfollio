// ============================================================
//  ALL SITE CONTENT LIVES HERE — edit freely.
// ============================================================

export const site = {
  name: "Adhya Agarwal",
  logo: "AA",
  title: "AI Agents & Full-Stack Engineer",
  roleLine: "Software Engineer · AI Agents · LLM Evaluation · Full-Stack Development",
  tagline: "Building the agents of tomorrow, shipping the web of today.",
  heroIntro:
    "I build and break AI agents — designing the evaluation infrastructure that proves whether frontier models are reliable — and ship full-stack products with Next.js, React and FastAPI.",
  location: "Gurugram, Haryana, India",
  email: "agarwaladhya03@gmail.com",
  linkedin: "https://linkedin.com/in/adhya-agarwal-995060240",
  github: "https://github.com/adhya-ag03",
  githubUsername: "adhya-ag03",
  resumeUrl:
    "https://drive.google.com/file/d/1Iz0wrXzKiA2ot7xt5pf4y5VhVb6WgrKh/view?usp=sharing",
  // The form posts to the built-in backend at /api/contact (configure .env.local,
  // see .env.example). Or paste a Formspree endpoint here to use that instead.
  formspreeEndpoint: "",
  ogUrl: "https://adhya.dev", // update after deploying
};

export const about = {
  badge: "Open to opportunities",
  bio: [
    "I'm a Software Engineer at Ethara AI, where I build and break AI agents — designing the evaluation infrastructure that proves whether frontier models are reliable: multi-provider LLM benchmarking, LLM-as-a-judge grading, state-drift injection, and sandboxed multi-agent orchestration.",
    "On the other side of the stack, I ship production applications with Next.js, React, TypeScript, FastAPI and Node.js — because a great model deserves a great interface.",
  ],
  stats: [
    { value: 92, suffix: "%", decimals: 0, label: "Model accuracy", accent: "cyan" },
    { value: 40, prefix: "+", suffix: "%", decimals: 0, label: "Daily active users", accent: "magenta" },
    { value: 9.6, suffix: "/10", decimals: 1, label: "CGPA", accent: "violet" },
    { value: 1.5, suffix: "+", decimals: 1, label: "Years in industry", accent: "blue" },
  ],
};

export const experience = [
  {
    role: "Software Engineer",
    company: "Ethara AI",
    location: "Gurugram",
    period: "Apr 2025 — Present",
    current: true,
    points: [
      "Grew the open-source WildClawBench benchmark (OpenClaw harness) into a multi-provider evaluation platform routing Claude on AWS Bedrock, GPT-5.5 and OpenRouter through a LiteLLM sidecar with prompt caching and per-request cost tracking",
      "Rebuilt grading as a three-judge LLM council with partial-coverage majority voting and a separate evidence budget per judge, backed by weighted pytest suites as an independent second score",
      "Built drift injection across 101 FastAPI mock services (Slack, GitHub, Stripe, Gmail), where a host-side director silently mutates backend state mid-run to test whether agents re-verify assumptions",
      "Shipped bounded multi-agent orchestration — up to 5 concurrent sub-agents, each capped at 50 tool calls, 16k tokens and 600s, with a full audit trail of every spawn",
      "Authored prompts and rubrics for a Meta LLaMA 4 Maverick fine-tuning program; built Python and LangChain pipelines benchmarking OpenAI, Gemini, Claude, LLaMA and Grok across finance, e-commerce and healthcare",
      "Deployed to production on AWS EC2 with Docker sandbox isolation, offline dependency vendoring and multimodal trajectories",
      "Built a Next.js, React and Tailwind CSS model-training UI, component library and live metric dashboards for a major tech client; shipped the Kuberha AI website and admin dashboard with role-based access control",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Zole Systems",
    location: "Noida",
    period: "May 2024 — Aug 2024",
    current: false,
    points: [
      "Developed responsive web applications and UIs with React.js, JavaScript, HTML and CSS across devices and browsers",
      "Built dynamic dashboards for internal tools, enabling real-time tracking of user engagement and financial metrics",
    ],
  },
];

export const projectFilters = ["All", "AI/ML", "Web"];

export const projects = [
  {
    title: "Hand Gesture Recognition System",
    subtitle: "Touch-free interaction, powered by computer vision",
    category: "AI/ML",
    cover: "/projects/gesture.svg", // replace with your screenshot
    tags: ["Python", "OpenCV", "CNNs", "Computer Vision"],
    points: [
      "CNN model classifying static and dynamic hand gestures with 92% accuracy",
      "Real-time gesture tracking with OpenCV in a web app for touch-free interaction",
      "Optimized inference to reduce latency for virtual interfaces and assistive tech",
    ],
    github: "https://github.com/adhya-ag03", // TODO: repo URL
    demo: "#", // TODO: live demo URL
  },
  {
    title: "Get Recommend",
    subtitle: "Movie recommendation system",
    category: "AI/ML",
    cover: "/projects/recommend.svg", // replace with your screenshot
    tags: ["Python", "Scikit-learn", "Streamlit"],
    points: [
      "Content-based movie recommender built with Scikit-learn",
      "Live TMDB posters with real-time data processing in Streamlit",
      "Grew daily active users by 40%",
    ],
    github: "https://github.com/adhya-ag03", // TODO: repo URL
    demo: "#", // TODO: live demo URL
  },
  {
    title: "Disney+ Hotstar Clone",
    subtitle: "Full-stack streaming platform",
    category: "Web",
    cover: "/projects/hotstar.svg", // replace with your screenshot
    tags: ["React.js", "Node.js", "Express.js"],
    points: [
      "Full-stack streaming platform clone with login and a watchlist",
      "React.js frontend with a Node.js/Express.js REST API",
      "Responsive carousels and streaming-style UI",
    ],
    github: "https://github.com/adhya-ag03", // TODO: repo URL
    demo: "#", // TODO: live demo URL
  },
];

export const education = [
  {
    type: "Education",
    title: "B.Tech CSE (AI & ML)",
    org: "Noida Institute of Engineering and Technology",
    detail: "2021 — 2025 · CGPA 9.6/10",
  },
  {
    type: "Certification",
    title: "Introduction to Cloud Identity",
    org: "Google Cloud",
    detail: "Certified",
  },
  {
    type: "Certification",
    title: "Geo-data Sharing & Cybersecurity",
    org: "ISRO",
    detail: "Certified",
  },
  {
    type: "Certification",
    title: "Agile Methodology Virtual Experience",
    org: "Cognizant",
    detail: "Certified",
  },
  {
    type: "Certification",
    title: "Generic Online Training in Cyber Security",
    org: "MeitY",
    detail: "Certified",
  },
];

// icon: slug on cdn.simple-icons.org · svg: inline icon key (see Skills.jsx)
// accent: cyan | magenta | violet | blue | emerald — colors the group
export const skillGroups = [
  {
    group: "Languages",
    accent: "cyan",
    items: [
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "SQL", svg: "database" },
    ],
  },
  {
    group: "AI & LLMs",
    accent: "magenta",
    items: [
      { name: "AI Agents", svg: "bot" },
      { name: "Multi-Agent Orchestration", svg: "network" },
      { name: "LLM Evaluation", svg: "checklist" },
      { name: "LLM-as-a-Judge", svg: "scale" },
      { name: "Benchmarking", svg: "chart" },
      { name: "Prompt Engineering", svg: "terminal" },
      { name: "Rubric Design", svg: "checklist" },
      { name: "RLHF", svg: "refresh" },
      { name: "Fine-Tuning", svg: "sliders" },
      { name: "LangChain", icon: "langchain", color: "ffffff" },
      { name: "LiteLLM", svg: "zap" },
      { name: "AWS Bedrock", svg: "cloud" },
      { name: "OpenRouter", svg: "network" },
    ],
  },
  {
    group: "Machine Learning",
    accent: "violet",
    items: [
      { name: "Deep Learning", svg: "brain" },
      { name: "CNNs", svg: "network" },
      { name: "Computer Vision", svg: "eye" },
      { name: "OpenCV", icon: "opencv", color: "60a5fa" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "Pandas", icon: "pandas", color: "a78bfa" },
      { name: "NumPy", icon: "numpy", color: "4dabcf" },
      { name: "Streamlit", icon: "streamlit" },
    ],
  },
  {
    group: "Frontend",
    accent: "blue",
    items: [
      { name: "Next.js", icon: "nextdotjs", color: "ffffff" },
      { name: "React.js", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "shadcn/ui", icon: "shadcnui", color: "ffffff" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css", color: "8b5cf6" },
    ],
  },
  {
    group: "Backend & Databases",
    accent: "emerald",
    items: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express.js", icon: "express", color: "ffffff" },
      { name: "REST APIs", svg: "zap" },
      { name: "Redis", icon: "redis" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    group: "DevOps & Testing",
    accent: "cyan",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "AWS EC2", svg: "cloud" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github", color: "ffffff" },
      { name: "pytest", icon: "pytest" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
