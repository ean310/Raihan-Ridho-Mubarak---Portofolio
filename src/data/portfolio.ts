export interface StorySlide {
  id: string;
  tag: string;
  title: string;
  subtitle?: string;
  body: string;
  bullets?: string[];
  accentColor: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface HighlightItem {
  id: "about" | "stack" | "now" | "contact";
  label: string;
  say: string;
  gradient: string;
  iconName: string;
  slides: StorySlide[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  isCurrent?: boolean;
  badgeText?: string;
  company: string;
  companyUrl?: string;
  companySay?: string;
  role: string;
  location: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  issuer: string;
  date: string;
  title: string;
  description: string;
  icon: "trophy" | "medal" | "graduation";
  links: {
    label: string;
    href: string;
    say: string;
    external?: boolean;
  }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  validUntil?: string;
  hours?: string;
  category: "Flutter" | "Android" | "Fundamentals";
  badge: string;
  accentColor: string;
  credentialId?: string;
  credentialUrl: string;
  imageUrl?: string;
  pdfUrl?: string;
  projectSlug?: string;
  description: string;
  skills: string[];
}

export interface FeaturedSlide {
  id: string;
  badge: string;
  badgeIcon: "sparkles" | "globe" | "layers" | "trophy" | "medal";
  iconUrl?: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  external?: boolean;
  ctaLabel: string;
  say: string;
  visualType: "phones-fan" | "macbook" | "certificate";
  visualTheme: {
    accent: string;
    secondary: string;
    label: string;
    sublabel: string;
    certImageUrl?: string;
    imageUrl?: string;
    screens?: {
      title: string;
      subtitle: string;
      stat: string;
      color: string;
      imageUrl?: string;
    }[];
  };
  stats: {
    value: string;
    label: string;
  }[];
}

export interface ProjectItem {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  developer: string;
  category: "Mobile" | "Web" | "UI/UX" | "AI";
  tags: string[];
  accentColor: string;
  iconBg: string;
  iconText: string;
  iconUrl?: string;
  status: "Live" | "Open Source" | "Capstone" | "Enterprise";
  liveUrl?: string;
  repoUrl?: string;
  secondaryRepoUrl?: string;
  downloadUrl?: string;
  year: string;
  platform: string;
  role: string;
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
  screens: {
    title: string;
    caption: string;
    badge: string;
    gradient: string;
    imageUrl?: string;
    highlights: string[];
    device: "phone" | "desktop";
  }[];
  overview: string[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  architecture: string[];
  techStack: string[];
}

export interface ToolCategory {
  name: string;
  items: {
    name: string;
    iconSlug: string;
    iconUrl?: string;
    color: string;
    invertDark?: boolean;
  }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Raihan Ridho Mubarok",
    handle: "ean310",
    roles: ["Mobile Developer", "Frontend Developer", "UI/UX Designer"],
    roleDisplay: "Mobile & Frontend Developer · UI/UX",
    tagline:
      "Software enthusiast & continuous learner. Building impactful projects one commit at a time.",
    avatar: "https://github.com/ean310.png?size=352",
    location: "Jakarta, Indonesia",
    timezone: "Asia/Jakarta",
    timezoneLabel: "Jakarta time (GMT+7)",
    availabilityText: "Open to Mobile & Frontend roles",
    responseTimeText: "Usually replies within a few hours",
    githubUrl: "https://github.com/ean310",
    githubUsername: "ean310",
    whatsappUrl: "https://api.whatsapp.com/send?phone=6285640700007",
    whatsappDisplay: "+62 856-4070-0007",
    email: "raihanridhomubarok4@gmail.com",
    emailUrl: "mailto:raihanridhomubarok4@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/raihan-ridho-mubarok-85020a2bb",
    cvUrl: "/cv/Raihan_Ridho_Mubarok_CV.pdf",
  },

  highlights: [
    {
      id: "about",
      label: "About",
      say: "About me ✨",
      gradient: "from-sky-500/30 via-indigo-500/20 to-emerald-500/30",
      iconName: "user",
      slides: [
        {
          id: "about-1",
          tag: "01 / WHO I AM",
          title: "Mobile & Frontend Developer",
          subtitle: "B.Sc. in Informatics · Ahmad Dahlan University (GPA 3.81/4.00)",
          body: "Mobile Application Developer and Informatics graduate specializing in both cross-platform and native ecosystems. My core expertise lies in crafting intuitive, high-performance apps using Flutter & Dart alongside Kotlin & Jetpack Compose for Android.",
          bullets: [
            "Bangkit Academy 2024 Mobile Development Distinction Graduate",
            "Dicoding Certified Multi-Platform App Developer (Flutter Expert)",
            "Strong eye for responsive UI/UX & design systems in Figma",
          ],
          accentColor: "#38bdf8",
        },
        {
          id: "about-2",
          tag: "02 / ENGINEERING PHILOSOPHY",
          title: "Clean Architecture & Craft",
          subtitle: "Maintainable, Scalable & Testable Systems",
          body: "I am highly focused on writing maintainable code backed by Clean Architecture, SOLID Principles, Modularization, and robust State Management (BLoC/Cubit, Riverpod, Provider, and MVVM).",
          bullets: [
            "Test-Driven Development (TDD) & automated CI/CD workflows",
            "High-security mobile standards including SSL Pinning",
            "End-to-end ownership from Figma prototypes to production release",
          ],
          accentColor: "#818cf8",
        },
        {
          id: "about-3",
          tag: "03 / HOLISTIC APPROACH",
          title: "Bridging UX & Backend",
          subtitle: "Full-Stack Web & Cloud Integration",
          body: "With a complementary background in full-stack web development (React, Next.js, Node.js) and cloud database integration (Firebase, Supabase, GCP), I bring a holistic approach to software engineering—bridging front-end user experience and backend architecture.",
          accentColor: "#34d399",
          ctaLabel: "Connect on LinkedIn",
          ctaHref: "https://www.linkedin.com/in/raihan-ridho-mubarok-85020a2bb",
        },
      ],
    },
    {
      id: "stack",
      label: "Stack",
      say: "My stack 🧰",
      gradient: "from-violet-500/30 via-fuchsia-500/20 to-amber-500/30",
      iconName: "layers",
      slides: [
        {
          id: "stack-1",
          tag: "MOBILE ECOSYSTEM",
          title: "Cross-Platform & Native Android",
          subtitle: "Flutter · Dart · Kotlin · Jetpack Compose",
          body: "Whether building a single-codebase multi-platform product with Flutter or a deeply integrated native Android app with Kotlin & Jetpack Compose, I architect apps that feel fluid at 60/120fps.",
          bullets: [
            "State Management: BLoC / Cubit, Riverpod, Provider, ViewModel",
            "Architecture: Clean Architecture, MVVM, Dependency Injection, Modularization",
            "Quality & Security: TDD, Unit/Widget Testing, SSL Pinning, CI/CD",
          ],
          accentColor: "#a78bfa",
        },
        {
          id: "stack-2",
          tag: "WEB, CLOUD & DESIGN",
          title: "Modern Frontend & Cloud Stack",
          subtitle: "React · Next.js · TypeScript · Firebase · Supabase · Figma",
          body: "Beyond mobile, I ship responsive web portals and enterprise dashboards powered by modern JavaScript/TypeScript frameworks and scalable cloud backends.",
          bullets: [
            "Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS",
            "Cloud & Backend: Firebase, Supabase, Node.js, REST APIs, GCP, AWS",
            "Design & Workflow: Figma UI/UX Systems, Draw.io, Postman, Git/GitHub/GitLab",
          ],
          accentColor: "#f472b6",
        },
      ],
    },
    {
      id: "now",
      label: "Now",
      say: "What I'm up to 🚀",
      gradient: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
      iconName: "zap",
      slides: [
        {
          id: "now-1",
          tag: "CURRENT FOCUS",
          title: "Ready for Impactful Roles",
          subtitle: "Seeking Mobile Developer / Frontend Engineer Positions",
          body: "Currently seeking Mobile Developer, Frontend Developer, or Software Engineer roles where I can leverage my dual expertise in Kotlin and Flutter alongside React/Next.js to build high-impact digital products.",
          bullets: [
            "Available for full-time, remote, hybrid, or on-site roles in Jakarta & across Indonesia",
            "Also open to selective freelance mobile & web product engagements",
          ],
          accentColor: "#10b981",
          ctaLabel: "Download My CV",
          ctaHref: "/cv/Raihan_Ridho_Mubarok_CV.pdf",
        },
        {
          id: "now-2",
          tag: "CONTINUOUS LEARNING",
          title: "Deepening Multi-Platform Mastery",
          subtitle: "300+ Hours Dicoding Flutter Expert & Graph Network Research",
          body: "Recently completed the 300+ hour Multi-Platform App Developer Learning Path (Flutter Expert) and conducted research on Link Prediction in Co-Authorship Networks using SimRank and Personalized PageRank.",
          accentColor: "#06b6d4",
        },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      say: "Let's talk 📮",
      gradient: "from-amber-500/30 via-orange-500/20 to-rose-500/30",
      iconName: "mail",
      slides: [
        {
          id: "contact-1",
          tag: "LET'S COLLABORATE",
          title: "Get in Touch Anytime",
          subtitle: "Jakarta, Indonesia (GMT+7)",
          body: "Have an exciting mobile app, web platform, or engineering role in mind? Reach out directly via WhatsApp, Email, or LinkedIn—I'd love to chat!",
          bullets: [
            "WhatsApp: +62 856-4070-0007",
            "Email: raihanridhomubarok4@gmail.com",
            "LinkedIn: in/raihan-ridho-mubarok-85020a2bb",
            "GitHub: github.com/ean310",
          ],
          accentColor: "#f59e0b",
          ctaLabel: "Message on WhatsApp 💬",
          ctaHref: "https://api.whatsapp.com/send?phone=6285640700007",
        },
      ],
    },
  ] as HighlightItem[],

  experiences: [
    {
      id: "gilangharjo",
      period: "Aug 2025 – Sep 2025",
      isCurrent: false,
      badgeText: "GovTech",
      company: "Pemerintah Kalurahan Gilangharjo",
      companyUrl: "https://gilangharjo.id/",
      companySay: "Visit gilangharjo.id 🏛️",
      role: "Web Developer",
      location: "Yogyakarta, Indonesia",
      highlights: [
        "Designed and developed a dedicated web portal for Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (TP PKK) Kalurahan Gilangharjo from initial planning to launch.",
        "Integrated the PKK management information system directly into the main Kalurahan Gilangharjo portal to centralize public data access and community activity reporting.",
      ],
    },
    {
      id: "murgung",
      period: "Jan 2025 – Jul 2025",
      isCurrent: false,
      badgeText: "7 mos",
      company: "PT. Murgung",
      companyUrl: "https://github.com/ConstMg",
      companySay: "Explore ConstMG 🏗️",
      role: "UI/UX Designer & Team Administration",
      location: "Remote",
      highlights: [
        "Co-developed 'ConstMG', a web-based construction project management platform supporting core company operations.",
        "Designed comprehensive UI/UX in Figma, including the executive admin dashboard and real-time construction project tracking interfaces.",
        "Managed end-to-end project documentation, comprehensive progress reports, promotional visual assets, and product pitching decks.",
      ],
    },
    {
      id: "bangkit",
      period: "Sep 2024 – Dec 2024",
      isCurrent: false,
      badgeText: "Distinction",
      company: "Bangkit Academy (Google, GoTo, Traveloka)",
      companyUrl: "https://github.com/Iq11k/Capstone-WizzMate",
      companySay: "Distinction Graduate 🏆",
      role: "Mobile Development Cohort",
      location: "Remote",
      highlights: [
        "Selected from thousands of national applicants for the Kampus Merdeka Certified Independent Study (SIB) Mobile Development track and graduated with Distinction.",
        "Integrated REST APIs in collaboration with Cloud Computing and Machine Learning cohorts to deliver real-time Indonesian tourism analytics & AI itinerary recommendations following Google industry standards (SOLID, Clean Architecture, MVVM).",
        "Managed intensive Git version control workflows, feature branching, and merge conflict resolution across a cross-functional capstone team.",
      ],
    },
    {
      id: "uad-edu",
      period: "Sep 2022 – Jun 2026",
      isCurrent: false,
      badgeText: "GPA 3.81",
      company: "Ahmad Dahlan University (UAD)",
      companyUrl: "https://www.linkedin.com/in/raihan-ridho-mubarok-85020a2bb",
      companySay: "B.Sc. in Informatics 🎓",
      role: "Bachelor of Informatics & Admin/Doc Staff",
      location: "Yogyakarta, Indonesia",
      highlights: [
        "Graduated with a 3.81/4.00 GPA in Informatics; experienced in Administrative and Technical Documentation at Magister Informatika UAD.",
        "Conducted undergraduate research on Link Prediction in Co-Authorship Networks using SimRank and Personalized PageRank algorithms.",
        "Built WizzMate AI Android Capstone Project and actively contributed to Esport UAD Community & KKN Reguler community empowerment.",
      ],
    },
  ] as ExperienceItem[],

  achievements: [
    {
      id: "bangkit-distinction",
      issuer: "Bangkit Academy (Google, GoTo, Traveloka)",
      date: "Dec 2024",
      title: "Mobile Development Cohort — Distinction Graduate",
      description:
        "Awarded Distinction Graduate status (top tier of cohort) after completing 900+ hours of Android engineering with Kotlin, Jetpack Compose, Clean Architecture, and leading the WizzMate AI Capstone.",
      icon: "trophy",
      links: [
        {
          label: "Capstone case study",
          href: "/projects/wizzmate",
          say: "Read WizzMate case study →",
          external: false,
        },
        {
          label: "GitHub repo",
          href: "https://github.com/Iq11k/Capstone-WizzMate",
          say: "View source on GitHub ↗",
          external: true,
        },
      ],
    },
    {
      id: "dicoding-flutter",
      issuer: "Dicoding Indonesia (Google Authorized Partner)",
      date: "Oct 2026",
      title: "Multi-Platform & Android Developer Learning Path (11+ Certificates)",
      description:
        "Graduated from 11+ intensive Google Authorized Training Partner courses on Dicoding (470+ hours total), spanning Flutter Fundamental, Android Intermediate, Machine Learning for Android, Kotlin, and Dart.",
      icon: "medal",
      links: [
        {
          label: "Verify on Dicoding",
          href: "https://www.dicoding.com/users/3789638/academies",
          say: "Open my official Dicoding profile ↗",
          external: true,
        },
        {
          label: "Flutter certificate",
          href: "https://www.dicoding.com/certificates/KEXLMY23RZG2",
          say: "Verify KEXLMY23RZG2 on Dicoding ↗",
          external: true,
        },
      ],
    },
    {
      id: "uad-honors",
      issuer: "Universitas Ahmad Dahlan · Yogyakarta",
      date: "Jun 2026",
      title: "Bachelor of Informatics — Cum Laude (GPA 3.81 / 4.00)",
      description:
        "Graduated with high honors in Informatics Engineering, combining applied mobile/web software engineering with graph algorithm research (SimRank & Personalized PageRank).",
      icon: "graduation",
      links: [
        {
          label: "Download Resume / CV",
          href: "/cv/Raihan_Ridho_Mubarok_CV.pdf",
          say: "Grab my full CV 📄",
          external: true,
        },
      ],
    },
  ] as AchievementItem[],

  certificates: [
    {
      id: "cert-flutter-fundamental",
      title: "Belajar Fundamental Aplikasi Flutter",
      issuer: "Dicoding Indonesia · Google Developers Authorized Partner",
      issuerLogo: "flutter",
      date: "28 Oct 2026",
      validUntil: "28 Oct 2029",
      hours: "90 Hours",
      category: "Flutter",
      badge: "ID: KEXLMY23RZG2",
      accentColor: "#38bdf8",
      credentialId: "KEXLMY23RZG2",
      credentialUrl: "https://www.dicoding.com/certificates/KEXLMY23RZG2",
      imageUrl: "/certificates/flutter-fundamental-KEXLMY23RZG2.png",
      pdfUrl: "/certificates/flutter-fundamental-KEXLMY23RZG2.pdf",
      projectSlug: "flutter-clean-arch",
      description:
        "90-hour intensive curriculum covering Flutter Widget Lifecycle, Responsive UI Design, State Management, REST API Networking, Local Persistence, Notification & Scheduler, Firebase in Flutter, and Automated Testing.",
      skills: [
        "Flutter",
        "State Management",
        "Networking & Web API",
        "Local Storage",
        "Automated Testing",
        "Notification & Scheduler",
        "Firebase",
      ],
    },
    {
      id: "cert-android-intermediate",
      title: "Belajar Pengembangan Aplikasi Android Intermediate",
      issuer: "Dicoding Indonesia · Google Developers Authorized Partner",
      issuerLogo: "android",
      date: "20 Dec 2024",
      validUntil: "20 Dec 2027",
      hours: "150 Hours",
      category: "Android",
      badge: "ID: NVP74R6GGPR0",
      accentColor: "#3ddc84",
      credentialId: "NVP74R6GGPR0",
      credentialUrl: "https://www.dicoding.com/certificates/NVP74R6GGPR0",
      imageUrl: "/certificates/android-intermediate-NVP74R6GGPR0.png",
      pdfUrl: "/certificates/android-intermediate-NVP74R6GGPR0.pdf",
      projectSlug: "story-app",
      description:
        "150-hour advanced Android curriculum covering Custom Views & WebView, Property Animation & MotionLayout, Localization & Accessibility, Background Services, Multipart Media Upload, Google Maps API & Geofences, TDD with Test Double/MockWebServer, Paging 3 Database, and Firebase (Auth, RTDB, FCM).",
      skills: [
        "Kotlin",
        "Paging 3",
        "Google Maps & Geofences",
        "Custom View & Animation",
        "TDD & MockWebServer",
        "Multipart Media",
        "Firebase FCM",
      ],
    },
    {
      id: "cert-ml-android",
      title: "Belajar Penerapan Machine Learning untuk Android",
      issuer: "Dicoding Indonesia · Google Developers Authorized Partner",
      issuerLogo: "tensorflow",
      date: "12 Nov 2024",
      validUntil: "12 Nov 2027",
      hours: "60 Hours",
      category: "Android",
      badge: "ID: 2VX34VRYVZYQ",
      accentColor: "#ff6f00",
      credentialId: "2VX34VRYVZYQ",
      credentialUrl: "https://www.dicoding.com/certificates/2VX34VRYVZYQ",
      imageUrl: "/certificates/ml-android-2VX34VRYVZYQ.png",
      pdfUrl: "/certificates/ml-android-2VX34VRYVZYQ.pdf",
      projectSlug: "wizzmate",
      description:
        "60-hour curriculum on integrating on-device Machine Learning in Android: ML Kit (Text Recognition, Translation, Barcode), TensorFlow Lite (Image Classification, Object Detection, Prediction), MediaPipe real-time streaming, Firebase ML OTA updates, and Generative AI (Smart Reply & BERT Q&A).",
      skills: [
        "TensorFlow Lite",
        "ML Kit",
        "MediaPipe",
        "Firebase ML",
        "Generative AI (BERT)",
        "On-Device Inference",
      ],
    },
    {
      id: "cert-android-fundamental",
      title: "Belajar Fundamental Aplikasi Android",
      issuer: "Dicoding Indonesia · Google Developers Authorized Partner",
      issuerLogo: "android",
      date: "29 Oct 2024",
      validUntil: "29 Oct 2027",
      hours: "140 Hours",
      category: "Android",
      badge: "ID: 1OP844QJQZQK",
      accentColor: "#10b981",
      credentialId: "1OP844QJQZQK",
      credentialUrl: "https://www.dicoding.com/certificates/1OP844QJQZQK",
      imageUrl: "/certificates/android-fundamental-1OP844QJQZQK.png",
      pdfUrl: "/certificates/android-fundamental-1OP844QJQZQK.pdf",
      projectSlug: "wizzmate",
      description:
        "140-hour Android engineering curriculum covering Activity/Fragment/RecyclerView, Navigation Component & ViewPager2, Background Thread & JSON Web API Networking, Android Architecture Component (ViewModel & LiveData), Unit & Instrumentation Testing, Room Database & DataStore, and WorkManager/AlarmManager.",
      skills: [
        "Kotlin",
        "ViewModel & LiveData",
        "Room & DataStore",
        "Navigation Component",
        "WorkManager",
        "Unit & UI Testing",
      ],
    },
    {
      id: "cert-dart-programming",
      title: "Memulai Pemrograman dengan Dart",
      issuer: "Dicoding Indonesia · Google Developers Authorized Partner",
      issuerLogo: "dart",
      date: "09 Oct 2026",
      validUntil: "09 Oct 2029",
      hours: "30 Hours",
      category: "Flutter",
      badge: "ID: 53XEMOOK9PRN",
      accentColor: "#0175c2",
      credentialId: "53XEMOOK9PRN",
      credentialUrl: "https://www.dicoding.com/certificates/53XEMOOK9PRN",
      imageUrl: "/certificates/dart-53XEMOOK9PRN.png",
      pdfUrl: "/certificates/dart-53XEMOOK9PRN.pdf",
      projectSlug: "flutter-clean-arch",
      description:
        "30-hour industry-standard Dart programming certification covering Dart Fundamentals, Control Flow, Collections, Object-Oriented Programming (OOP), Functional Programming (Lambda, Higher-Order Functions, Closures), Dart Type System, Asynchronous Dart Futures, and Effective Dart conventions.",
      skills: [
        "Dart",
        "Object-Oriented Programming",
        "Functional Programming",
        "Dart Futures & Async",
        "Effective Dart",
      ],
    },
    {
      id: "cert-flutter-pemula",
      title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
      issuer: "Dicoding Indonesia · Google Developers Authorized Partner",
      issuerLogo: "flutter",
      date: "13 Oct 2026",
      validUntil: "13 Oct 2029",
      hours: "40 Hours",
      category: "Flutter",
      badge: "ID: N9ZO0ML5YXG5",
      accentColor: "#06b6d4",
      credentialId: "N9ZO0ML5YXG5",
      credentialUrl: "https://www.dicoding.com/certificates/N9ZO0ML5YXG5",
      imageUrl: "/certificates/flutter-pemula-N9ZO0ML5YXG5.png",
      pdfUrl: "/certificates/flutter-pemula-N9ZO0ML5YXG5.pdf",
      projectSlug: "flutter-clean-arch",
      description:
        "40-hour industry-standard Flutter foundation covering Flutter SDK setup, package management, Stateless & Stateful Widgets, multi-screen navigation, asset/image management, and building release APK, AAB, and Web bundles.",
      skills: [
        "Flutter",
        "Dart",
        "Stateless & Stateful Widgets",
        "Responsive Layout",
        "APK / AAB / Web Deployment",
      ],
    },
    {
      id: "cert-dasar-mobile",
      title: "Belajar Dasar Pengembangan Aplikasi Mobile",
      issuer: "Dicoding Indonesia · Google Developers Authorized Partner",
      issuerLogo: "android",
      date: "07 Oct 2026",
      validUntil: "07 Oct 2029",
      hours: "16 Hours",
      category: "Fundamentals",
      badge: "ID: MEPJMNN26P3V",
      accentColor: "#8b5cf6",
      credentialId: "MEPJMNN26P3V",
      credentialUrl: "https://www.dicoding.com/certificates/MEPJMNN26P3V",
      imageUrl: "/certificates/dasar-mobile-MEPJMNN26P3V.png",
      pdfUrl: "/certificates/dasar-mobile-MEPJMNN26P3V.pdf",
      projectSlug: "wizzmate",
      description:
        "16-hour mobile engineering foundation covering the Mobile Development Ecosystem, Mobile Software Development Life Cycle (SDLC), Internal Component Architecture & Lifecycle, App Prototyping, and Mobile Engineering Career Standards.",
      skills: [
        "Mobile SDLC",
        "Mobile Architecture",
        "Component Lifecycle",
        "App Prototyping",
      ],
    },
    {
      id: "cert-dasar-software",
      title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
      issuer: "Dicoding Indonesia · Kartu Prakerja Verified",
      issuerLogo: "git",
      date: "26 Sep 2024",
      validUntil: "26 Sep 2027",
      hours: "9 Hours · Score 100/100",
      category: "Fundamentals",
      badge: "ID: 2VX342NRVZYQ",
      accentColor: "#ec4899",
      credentialId: "2VX342NRVZYQ",
      credentialUrl: "https://www.dicoding.com/certificates/2VX342NRVZYQ",
      imageUrl: "/certificates/dasar-software-2VX342NRVZYQ.png",
      pdfUrl: "/certificates/dasar-software-2VX342NRVZYQ.pdf",
      description:
        "Graduated with a perfect 100/100 Final Exam & Class Graduation Score. Covers User & Technical Requirements Analysis, Flowchart & Modification Planning, ES6 JavaScript Logic & Pseudocode, HTML5/CSS3 UI Modification, and Software Archiving & Technical Documentation.",
      skills: [
        "Requirements Analysis",
        "Flowchart & Pseudocode",
        "JavaScript ES6",
        "HTML5 & CSS3",
        "Technical Documentation",
      ],
    },
  ] as CertificateItem[],

  featuredSlides: [
    {
      id: "feat-wizzmate",
      badge: "Capstone AI",
      badgeIcon: "sparkles",
      iconUrl: "/projects/wizzmate-logo.png",
      title: "WizzMate — AI Travel Companion",
      subtitle: "Bangkit Academy 2024 · Mobile, Cloud & ML",
      description:
        "An AI-powered Android travel companion for Indonesian tourism featuring personalized itinerary recommendations and ML daily budget estimation.",
      href: "/projects/wizzmate",
      external: false,
      ctaLabel: "Read case study",
      say: "Explore WizzMate case study →",
      visualType: "phones-fan",
      visualTheme: {
        accent: "#0ea5e9",
        secondary: "#6366f1",
        label: "WizzMate Android",
        sublabel: "Kotlin · TFLite · Maps API",
        screens: [
          {
            title: "Cost Estimator",
            subtitle: "ML Budget Predictor",
            stat: "Rp 450k/day",
            color: "from-sky-600 to-indigo-900",
            imageUrl: "/projects/screens/wizzmate/4-cost-estimator.png",
          },
          {
            title: "Explore Gems",
            subtitle: "ML Curated Spots",
            stat: "98% Match",
            color: "from-cyan-500 via-blue-600 to-indigo-950",
            imageUrl: "/projects/screens/wizzmate/2-home-explore.png",
          },
          {
            title: "Detail & Maps",
            subtitle: "Google Maps Sync",
            stat: "4.9 ★ Rating",
            color: "from-indigo-600 to-slate-900",
            imageUrl: "/projects/screens/wizzmate/3-destination-detail.png",
          },
        ],
      },
      stats: [
        { value: "Top 10%", label: "Distinction Graduate cohort" },
        { value: "3", label: "streams (Mobile, Cloud, ML)" },
        { value: "AI", label: "itinerary & budget estimator" },
      ],
    },
    {
      id: "feat-gilangharjo",
      badge: "GovTech Portal",
      badgeIcon: "globe",
      iconUrl: "/projects/gilangharjo-logo.png",
      title: "Kalurahan Gilangharjo & PKK Portal",
      subtitle: "Pemerintah Kalurahan Gilangharjo · Aug–Sep 2025",
      description:
        "Designed and integrated the official TP PKK information system directly into the Kalurahan Gilangharjo digital portal for centralized citizen access.",
      href: "/projects/gilangharjo",
      external: false,
      ctaLabel: "Read case study",
      say: "Read Gilangharjo case study →",
      visualType: "macbook",
      visualTheme: {
        accent: "#10b981",
        secondary: "#059669",
        label: "gilangharjo.id",
        sublabel: "Integrated TP PKK Information System",
        imageUrl: "/projects/screens/gilangharjo/2-tp-pkk.png",
      },
      stats: [
        { value: "Live", label: "at gilangharjo.id portal" },
        { value: "100%", label: "centralized PKK data" },
        { value: "24/7", label: "public citizen access" },
      ],
    },
    {
      id: "feat-constmg",
      badge: "Enterprise Web",
      badgeIcon: "layers",
      iconUrl: "/projects/murgung-logo.png",
      title: "ConstMG — Construction Management",
      subtitle: "PT. Murgung · Jan–Jul 2025",
      description:
        "End-to-end UI/UX design and web platform for construction project tracking, executive admin dashboards, and automated operational reporting.",
      href: "/projects/constmg",
      external: false,
      ctaLabel: "Read case study",
      say: "Read ConstMG case study →",
      visualType: "macbook",
      visualTheme: {
        accent: "#f59e0b",
        secondary: "#d97706",
        label: "ConstMG Platform",
        sublabel: "Admin Dashboard & Project Tracker",
        imageUrl: "/projects/screens/constmg/1-landing-hero.png",
      },
      stats: [
        { value: "7 mos", label: "production engagement" },
        { value: "E2E", label: "dashboard & tracker UI/UX" },
        { value: "2", label: "core repositories (FE & BE)" },
      ],
    },
    {
      id: "feat-bangkit",
      badge: "Dicoding Android",
      badgeIcon: "trophy",
      title: "Android Intermediate & ML on Android",
      subtitle: "Dicoding Indonesia · Dec 2024 (NVP74R6GGPR0)",
      description:
        "Completed 350+ hours of Android engineering (Fundamental, Intermediate & On-Device Machine Learning) during Bangkit Academy 2024.",
      href: "https://www.dicoding.com/certificates/NVP74R6GGPR0",
      external: true,
      ctaLabel: "Verify on Dicoding",
      say: "Verify NVP74R6GGPR0 on Dicoding ↗",
      visualType: "certificate",
      visualTheme: {
        accent: "#3ddc84",
        secondary: "#10b981",
        label: "NVP74R6GGPR0",
        sublabel: "Belajar Pengembangan Aplikasi Android Intermediate",
        certImageUrl: "/certificates/android-intermediate-NVP74R6GGPR0.png",
      },
      stats: [
        { value: "150h", label: "Android Intermediate course" },
        { value: "140h", label: "Android Fundamental course" },
        { value: "60h", label: "Machine Learning for Android" },
      ],
    },
    {
      id: "feat-flutter",
      badge: "Dicoding Flutter",
      badgeIcon: "medal",
      title: "Belajar Fundamental Aplikasi Flutter",
      subtitle: "Dicoding Indonesia · Oct 28, 2026 (KEXLMY23RZG2)",
      description:
        "Official Google Developers Authorized Training Partner certification covering Flutter State Management, REST API Networking, Local DB, Firebase, and Automated Testing.",
      href: "https://www.dicoding.com/certificates/KEXLMY23RZG2",
      external: true,
      ctaLabel: "Verify on Dicoding",
      say: "Verify KEXLMY23RZG2 on Dicoding ↗",
      visualType: "certificate",
      visualTheme: {
        accent: "#38bdf8",
        secondary: "#818cf8",
        label: "KEXLMY23RZG2",
        sublabel: "Belajar Fundamental Aplikasi Flutter",
        certImageUrl: "/certificates/flutter-fundamental-KEXLMY23RZG2.png",
      },
      stats: [
        { value: "90h", label: "Flutter Fundamental curriculum" },
        { value: "30h", label: "Dart Programming foundation" },
        { value: "2029", label: "valid until Oct 28, 2029" },
      ],
    },
  ] as FeaturedSlide[],

  projects: [
    {
      slug: "wizzmate",
      name: "WizzMate",
      tagline: "Your AI Travel Companion for Indonesian Tourism",
      shortDescription:
        "An AI-powered Android application providing personalized Indonesian travel itinerary recommendations and ML-driven daily budget estimations. Built by Mobile, Cloud, and ML cohorts at Bangkit Academy.",
      developer: "Raihan Ridho Mubarok · Bangkit Capstone Team",
      category: "AI",
      tags: ["AI", "Mobile", "Kotlin"],
      accentColor: "#10B981",
      iconBg: "#0a873a",
      iconText: "WM",
      iconUrl: "/projects/wizzmate-logo.png",
      status: "Capstone",
      repoUrl: "https://github.com/Iq11k/Capstone-WizzMate",
      secondaryRepoUrl: "https://github.com/ean310/WizzMate",
      downloadUrl:
        "https://drive.google.com/file/d/1VzqvTgbxI2HkPA0fww4otlSHAc74GEc4/view?usp=sharing",
      year: "2024",
      platform: "Android (Kotlin)",
      role: "Mobile Developer (Android)",
      metrics: [
        { label: "Category", value: "AI Travel", sub: "Tourism & Navigation" },
        { label: "Architecture", value: "MVVM", sub: "Clean Arch + SOLID" },
        { label: "Cohort Honor", value: "Distinction", sub: "Bangkit Academy 2024" },
        { label: "Platform", value: "Android", sub: "Kotlin & Maps SDK" },
      ],
      screens: [
        {
          title: "Welcome & Google Sign-In",
          caption: "Full-screen travel onboarding with email sign-in, one-tap Sign In with Google (Credential Manager + Firebase Auth), and Sign Up link.",
          badge: "WelcomeActivity",
          gradient: "from-emerald-500/25 via-green-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/wizzmate/1-welcome-auth.png",
          highlights: [
            "Full-screen travel onboarding with WizzMate branding & tagline",
            "Supports email/password login and one-tap Sign In with Google",
            "Firebase Auth & Jetpack DataStore persistent login session",
          ],
          device: "phone",
        },
        {
          title: "Home & Destination Discovery",
          caption: "Main discovery feed with live GPS geocoding, green SearchView, horizontal category chips, destination cards, and bottom navigation.",
          badge: "HomeFragment",
          gradient: "from-sky-500/25 via-blue-600/15 to-indigo-900/30",
          imageUrl: "/projects/screens/wizzmate/2-home-explore.png",
          highlights: [
            "Paging 3 infinite destination feed with category filters (Recommendation, Budaya, Taman Hiburan, Cagar Alam)",
            "Header displaying logged-in user profile, live FusedLocation city name, and quick logout",
            "Signature green BottomNavigationView (Home, Cost Estimator, History)",
          ],
          device: "phone",
        },
        {
          title: "Destination Detail & Hybrid MapView",
          caption: "Detailed destination screen combining embedded Google Maps (Hybrid mode), star rating card, category badge, and Estimate Your Cost CTA.",
          badge: "DetailActivity",
          gradient: "from-teal-500/25 via-emerald-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/wizzmate/3-destination-detail.png",
          highlights: [
            "Embedded Google MapView with user-to-destination LatLngBounds zoom control",
            "Displays verified star rating and tourism category in green-bordered cards",
            "Direct 'Estimate Your Cost' button navigating straight to the Cost Estimator tab",
          ],
          device: "phone",
        },
        {
          title: "Cost Estimator & Recommendation Form",
          caption: "Interactive trip planner selecting Departure city, Budget (IDR), First Day & Last Day date pickers, and Destination city.",
          badge: "EstimatorFragment",
          gradient: "from-indigo-500/25 via-violet-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/wizzmate/4-cost-estimator.png",
          highlights: [
            "Material 3 ExposedDropdownMenu for Departure and Destination cities",
            "Interactive First Day & Last Day DatePickers automatically computing trip duration in days",
            "Dispatches user parameters to the ML Recommendation & Cost Estimator API",
          ],
          device: "phone",
        },
        {
          title: "Recommendation Result — Destinations & Flights",
          caption: "Generated travel plan displaying trip summary, ML-curated nearest tourist destinations, and recommended flight schedules.",
          badge: "ResultFragment",
          gradient: "from-cyan-500/25 via-sky-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/wizzmate/5-recommendation-result.png",
          highlights: [
            "Displays selected Departure, Duration (days), and Destination summary",
            "Nearest Destination Recommendation cards with reverse-geocoded addresses and ticket prices",
            "Flight Recommendation list showing airline, departure/arrival airports, duration, and fare",
          ],
          device: "phone",
        },
        {
          title: "Daily Expense Breakdown & Flight Options",
          caption: "Detailed day-by-day predicted travel expense summary alongside multi-airline flight comparisons.",
          badge: "ML Budget Breakdown",
          gradient: "from-emerald-500/25 via-teal-600/15 to-cyan-900/30",
          imageUrl: "/projects/screens/wizzmate/6-history-maps.png",
          highlights: [
            "Day-by-day IDR expense forecast (Day 1, Day 2, Day 3) and total estimated trip cost",
            "Compares multiple flight options (Garuda Indonesia, Citilink) with class and duration",
            "Powered by collaborative filtering & cost prediction models",
          ],
          device: "phone",
        },
        {
          title: "Sign In to Your Account",
          caption: "Authentication screen featuring custom EmailInput and PasswordInput validation views with Remember Me session toggle.",
          badge: "LoginFragment",
          gradient: "from-emerald-500/25 via-green-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/wizzmate/8-login-account.png",
          highlights: [
            "Custom EmailInput and PasswordInput views with real-time format validation",
            "Supports persistent login via Remember Me checkbox and DataStore Preferences",
            "Quick switch to Sign Up registration flow",
          ],
          device: "phone",
        },
        {
          title: "Your Journey (History Tab)",
          caption: "Dedicated History navigation tab within MainActivity's green BottomNavigationView.",
          badge: "HistoryFragment",
          gradient: "from-teal-500/25 via-emerald-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/wizzmate/7-your-journey.png",
          highlights: [
            "Accessible directly from the History tab on the bottom navigation bar",
            "Consistent Material 3 active pill indicator on the green navigation bar",
            "Seamless fragment transactions managed by MainActivity",
          ],
          device: "phone",
        },
      ],
      overview: [
        "WizzMate is an Android application designed to be the ultimate AI travel companion for exploring Indonesia. Developed as the flagship capstone project during Bangkit Academy 2024 Batch 2, it bridges Mobile Development, Cloud Computing, and Machine Learning into a seamless mobile experience.",
        "As a Mobile Developer on the team, I engineered the native Android client in Kotlin, integrating RESTful APIs deployed by the Cloud team and TensorFlow Lite / scikit-learn models trained by the Machine Learning team to deliver real-time travel analytics, itinerary generation, and budget estimations.",
      ],
      keyFeatures: [
        {
          title: "Personalized Travel Recommendations",
          description:
            "Discovers hidden gems and iconic Indonesian tourist attractions tailored to each traveler's interests, travel style, and preferred regions.",
        },
        {
          title: "ML-Powered Daily Budget Estimator",
          description:
            "Forecasts daily travel expenses accurately so travelers can plan multi-day adventures without unexpected cost surprises.",
        },
        {
          title: "Interactive Maps & Destination Ratings",
          description:
            "Displays verified destination details, community ratings, and interactive route previews powered by Google Maps API.",
        },
        {
          title: "Google-Standard Clean Architecture",
          description:
            "Engineered with SOLID principles, Clean Architecture layers, and MVVM pattern for high maintainability and testability.",
        },
      ],
      architecture: [
        "Presentation Layer: Kotlin, Jetpack Compose / XML Material 3 components, ViewModel, and reactive state streams.",
        "Domain Layer: Use cases encapsulating itinerary generation, budget estimation, and destination filtering following SOLID principles.",
        "Data Layer: Retrofit REST client communicating with the Node.js Cloud API, Firebase Realtime Database, and TensorFlow Lite model outputs.",
      ],
      techStack: [
        "Kotlin",
        "Android SDK",
        "Jetpack Compose",
        "Clean Architecture",
        "MVVM",
        "TensorFlow Lite",
        "Google Maps API",
        "Firebase",
        "Node.js",
        "REST API",
        "Git",
      ],
    },
    {
      slug: "gilangharjo",
      name: "Gilangharjo Portal",
      tagline: "Official Kalurahan Gilangharjo & Integrated TP PKK Information System",
      shortDescription:
        "Designed and developed the dedicated TP PKK web platform for Pemerintah Kalurahan Gilangharjo and integrated it into the main village government portal (gilangharjo.id) for centralized public access.",
      developer: "Pemerintah Kalurahan Gilangharjo · Yogyakarta",
      category: "Web",
      tags: ["GovTech", "Web", "Live"],
      accentColor: "#10B981",
      iconBg: "#ffffff",
      iconText: "GH",
      iconUrl: "/projects/gilangharjo-logo.png",
      status: "Live",
      liveUrl: "https://gilangharjo.id/",
      year: "2025",
      platform: "Responsive Web Portal",
      role: "Web Developer",
      metrics: [
        { label: "Category", value: "GovTech", sub: "Public Service Portal" },
        { label: "Integration", value: "Centralized", sub: "TP PKK + Main Portal" },
        { label: "Region", value: "Bantul, DIY", sub: "Kalurahan Gilangharjo" },
        { label: "Status", value: "Live", sub: "gilangharjo.id" },
      ],
      screens: [
        {
          title: "Kalurahan Gilangharjo Main Portal",
          caption: "Official digital gateway of Pemerintah Kalurahan Gilangharjo featuring quick-access citizen service modules.",
          badge: "Main Government Portal",
          gradient: "from-emerald-500/25 via-teal-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/gilangharjo/1-home.png",
          highlights: [
            "Unified navigation bar connecting Profil, Lembaga Kalurahan, APBKal & PPID",
            "Quick-action grid for WebGis, e-Gilang, Lapak, Informasi Publik & Pengaduan",
            "Live production deployment at gilangharjo.id",
          ],
          device: "desktop",
        },
        {
          title: "Integrated TP PKK Information Page",
          caption: "Dedicated hub for Tim Penggerak PKK Kalurahan Gilangharjo programs, 10 Program Pokok, and Pokja 1–4.",
          badge: "TP PKK System",
          gradient: "from-teal-500/25 via-cyan-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/gilangharjo/2-tp-pkk.png",
          highlights: [
            "Centralized publication of TP PKK organizational profile & 50+ members",
            "Structured breakdown of Pokja 1 to Pokja 4 community empowerment programs",
            "Integrated print-ready article view and Sinergi Program sidebar",
          ],
          device: "desktop",
        },
        {
          title: "Village Demographic & Occupation Statistics",
          caption: "Interactive Highcharts data visualization presenting real-time village demographic and occupation metrics.",
          badge: "Public Data & Analytics",
          gradient: "from-sky-500/25 via-emerald-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/gilangharjo/3-statistik.png",
          highlights: [
            "Interactive Pie Graph & Bar Graph modes for citizen demographic transparency",
            "Categorized sidebar covering Statistik Penduduk, Keluarga & Bantuan",
            "Real-time synchronization with Sistem Informasi Kalurahan database",
          ],
          device: "desktop",
        },
        {
          title: "Lapak Kalurahan Digital Marketplace",
          caption: "Community UMKM promotion portal enabling Gilangharjo residents to showcase and market local products online.",
          badge: "UMKM Marketplace",
          gradient: "from-green-500/25 via-teal-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/gilangharjo/4-layanan.png",
          highlights: [
            "Category filter and product search for local village entrepreneurs",
            "Displays verified seller profiles, pricing, and direct contact links",
            "Responsive card layout accessible across mobile and desktop browsers",
          ],
          device: "desktop",
        },
      ],
      overview: [
        "Developed during my tenure as Web Developer at Pemerintah Kalurahan Gilangharjo (Yogyakarta), this project focused on modernizing how Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (TP PKK) manages and publishes community empowerment data.",
        "I designed and built the dedicated TP PKK website from initial planning through production deployment, and integrated the system directly into the primary Kalurahan Gilangharjo portal (gilangharjo.id) so residents and officials can access data centrally and efficiently.",
      ],
      keyFeatures: [
        {
          title: "Centralized PKK Information Hub",
          description:
            "Consolidates organizational profiles, Pokja initiatives, community event schedules, and public reports into one accessible web platform.",
        },
        {
          title: "Seamless Portal Integration",
          description:
            "Embedded directly within the official Kalurahan Gilangharjo digital ecosystem to eliminate fragmented data silos.",
        },
        {
          title: "Mobile-First Citizen Accessibility",
          description:
            "Engineered with responsive layouts and fast page loads so residents can browse announcements easily from any smartphone.",
        },
      ],
      architecture: [
        "Full-cycle web engineering: requirements analysis with village stakeholders, UI/UX wireframing, frontend & backend implementation, and production rollout.",
        "Integrated routing and data structures aligned with the existing Sistem Informasi Kalurahan Gilangharjo.",
      ],
      techStack: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "PHP",
        "Responsive UI",
        "Figma",
        "Web Portal Integration",
      ],
    },
    {
      slug: "constmg",
      name: "ConstMG",
      tagline: "Web-Based Construction Project Management & Tracking Platform",
      shortDescription:
        "Enterprise construction management platform developed for PT. Murgung. Led the end-to-end UI/UX design for the admin dashboard and project tracking workflows alongside project administration.",
      developer: "PT. Murgung · ConstMg Team",
      category: "UI/UX",
      tags: ["Enterprise", "UI/UX", "Web"],
      accentColor: "#F59E0B",
      iconBg: "#ffffff",
      iconText: "CM",
      iconUrl: "/projects/murgung-logo.png",
      status: "Enterprise",
      repoUrl: "https://github.com/ConstMg",
      secondaryRepoUrl: "https://github.com/ConstMg/FrontEnd-ConstMG",
      year: "2025",
      platform: "Web Application & Figma Design System",
      role: "UI/UX Designer & Team Administration",
      metrics: [
        { label: "Category", value: "Construction", sub: "ERP & Project Tracker" },
        { label: "Role", value: "UI/UX Lead", sub: "& Team Administration" },
        { label: "Duration", value: "7 Months", sub: "Jan – Jul 2025" },
        { label: "Architecture", value: "FE + BE", sub: "JS Frontend & PHP API" },
      ],
      screens: [
        {
          title: "Main Landing Page & Interactive Hero",
          caption: "Corporate web presence for PT Murgung Nusa Parama featuring animated hero parallax and division highlights.",
          badge: "Corporate Landing UI",
          gradient: "from-amber-500/25 via-orange-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/constmg/1-landing-hero.png",
          highlights: [
            "Framer Motion interactive parallax hero with typewriter headline",
            "Inline editable content fields when logged in with Admin role",
            "Highlights 50+ completed projects across 4 core construction divisions",
          ],
          device: "desktop",
        },
        {
          title: "Construction Services & Client Partners",
          caption: "Comprehensive showcase of General Contractor, Civil, Aluminium Applicator, and Supplier divisions.",
          badge: "Services & Portfolio",
          gradient: "from-yellow-500/25 via-amber-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/constmg/2-services-clients.png",
          highlights: [
            "Dedicated cards for General Contractor, Civil, Aluminium & Supplier",
            "Showcases enterprise clients including MRT Jakarta, Pegadaian & Transmart",
            "Designed in Figma with responsive grid and clean visual hierarchy",
          ],
          device: "desktop",
        },
        {
          title: "Executive Construction Admin Dashboard",
          caption: "High-clarity analytics dashboard giving project managers real-time visibility into site milestones, budgets, and active teams.",
          badge: "Admin Dashboard UI",
          gradient: "from-orange-500/25 via-rose-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/constmg/3-admin-dashboard.png",
          highlights: [
            "KPI summary cards for Active Projects, Total Personnel, and Daily Attendance",
            "Interactive DataTable with progress bars, site photo folders & CRUD modals",
            "Role-based views tailored for executives, site engineers, and admins",
          ],
          device: "desktop",
        },
        {
          title: "Employee Presensi Tracker & Portal Auth",
          caption: "Split-screen administrator login paired with daily field-team attendance (Presensi) tracking.",
          badge: "Presensi & Auth UX",
          gradient: "from-amber-500/25 via-yellow-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/constmg/4-presensi-login.png",
          highlights: [
            "Split-screen login portal with PT Murgung Nusa Parama architectural imagery",
            "Real-time Hadir / Izin / Sakit attendance logging for field personnel",
            "Backed by separated FrontEnd-ConstMG (React) and Backend-Murgung (PHP) repos",
          ],
          device: "desktop",
        },
      ],
      overview: [
        "ConstMG is a web-based construction project management platform built to streamline operational workflows at PT. Murgung. Over a 7-month engagement (Jan – Jul 2025), I shaped both the product's visual experience and the team's operational documentation.",
        "I designed the end-to-end UI/UX in Figma—covering the administrative command center and real-time project tracking interfaces—while also managing comprehensive project lifecycle documentation, promotional visual assets, and executive pitching presentations.",
      ],
      keyFeatures: [
        {
          title: "Executive Admin Dashboard",
          description:
            "Centralizes construction site KPIs, workforce allocation, and financial progress in a clean, scannable interface.",
        },
        {
          title: "End-to-End Project Tracking",
          description:
            "Allows stakeholders to track milestone completion percentages, daily site logs, and deliverables in real time.",
        },
        {
          title: "Design System & Pitching Assets",
          description:
            "Complete Figma component library paired with product pitch decks, promotional posters, and structured technical reports.",
        },
      ],
      architecture: [
        "Decoupled Web Architecture: FrontEnd-ConstMG (JavaScript/React-based SPA) communicating with Backend-Murgung (PHP RESTful service).",
        "Design-to-Code Workflow: Interactive Figma prototypes, user flow diagrams in Draw.io, and comprehensive sprint documentation.",
      ],
      techStack: [
        "Figma",
        "JavaScript",
        "React",
        "PHP",
        "UI/UX Design",
        "Draw.io",
        "Canva",
        "GitHub",
      ],
    },
    {
      slug: "flutter-clean-arch",
      name: "Flutter Expert Suite",
      tagline: "Clean Architecture, Modularization, BLoC/Riverpod & CI/CD Multi-Platform Apps",
      shortDescription:
        "Production-grade multi-platform Flutter application architecture built during the 300+ hour Dicoding Flutter Expert Learning Path—featuring Clean Architecture, Modularization, BLoC/Cubit, Riverpod, TDD, SSL Pinning, and CI/CD.",
      developer: "Raihan Ridho Mubarok · Dicoding Expert Path",
      category: "Mobile",
      tags: ["Flutter", "Dart", "Clean Arch"],
      accentColor: "#38BDF8",
      iconBg: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
      iconText: "FL",
      status: "Open Source",
      repoUrl: "https://github.com/ean310/a195-flutter-fundamental-labs",
      secondaryRepoUrl: "https://github.com/ean310/a159_flutter_pemula_project",
      year: "2026",
      platform: "iOS & Android (Flutter)",
      role: "Multi-Platform Mobile Developer",
      metrics: [
        { label: "Curriculum", value: "300+ Hrs", sub: "Google Authorized Partner" },
        { label: "State Mgmt", value: "BLoC", sub: "Cubit · Riverpod · Provider" },
        { label: "Testing", value: "TDD", sub: "Unit & Widget Coverage" },
        { label: "Security", value: "SSL Pin", sub: "+ Automated CI/CD" },
      ],
      screens: [
        {
          title: "Modular Clean Architecture & BLoC State",
          caption: "Strict separation of Presentation, Domain, and Data layers across independent feature modules.",
          badge: "Clean Architecture",
          gradient: "from-sky-500/25 via-cyan-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/flutter/1-clean-arch-home.png",
          highlights: [
            "Feature-based modularization with GetIt dependency injection",
            "Predictable state transitions using BLoC/Cubit and Riverpod",
            "Offline-first local caching with SQLite / Hive & reactive streams",
          ],
          device: "phone",
        },
        {
          title: "Cloud Firestore Chat & TDD Test Suite",
          caption: "Real-time Firebase Cloud Firestore messaging paired with SSL Pinning and automated TDD coverage.",
          badge: "Firebase & TDD",
          gradient: "from-indigo-500/25 via-blue-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/flutter/2-firestore-chat-tdd.png",
          highlights: [
            "Real-time chat stream powered by Firebase Auth & Cloud Firestore",
            "Certificate SSL Pinning protecting API traffic against MITM attacks",
            "Automated unit & widget tests across use cases, repositories, and BLoCs",
          ],
          device: "phone",
        },
        {
          title: "Global Google Offices Directory",
          caption: "Multi-screen Flutter application displaying global Google offices with typed navigation arguments.",
          badge: "Multi-Screen Navigation",
          gradient: "from-cyan-500/25 via-sky-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/flutter/3-google-offices.png",
          highlights: [
            "Displays regional headquarters and global Google offices directory",
            "Passes strongly-typed GoogleOffice models across Stateless & Stateful views",
            "Built for Android, iOS, and Web targets from a single codebase",
          ],
          device: "phone",
        },
      ],
      overview: [
        "Engineered while completing the 300+ hour Multi-Platform App Developer Learning Path (Basic to Expert) at Dicoding Indonesia (Google Authorized Training Partner), this suite demonstrates enterprise-ready Flutter engineering.",
        "Every module is structured around Clean Architecture and SOLID principles, decoupling UI from business logic via BLoC/Cubit and Riverpod, enforcing security with SSL Pinning, and verifying reliability with Test-Driven Development (TDD) and CI/CD automation.",
      ],
      keyFeatures: [
        {
          title: "Multi-Package Modularization",
          description:
            "Splits core utilities, domain entities, data sources, and feature modules for scalable team development and fast incremental builds.",
        },
        {
          title: "Advanced State Management (BLoC, Cubit & Riverpod)",
          description:
            "Implements reactive, immutable state streams that keep complex UI interactions smooth, predictable, and easy to unit-test.",
        },
        {
          title: "SSL Pinning & TDD Reliability",
          description:
            "Hardens network communication with cryptographic certificate pinning and maintains high test coverage using Mockito & flutter_test.",
        },
      ],
      architecture: [
        "Presentation Layer: Flutter Custom Widgets, BLoC / Cubit / Riverpod Providers, and responsive adaptive layouts.",
        "Domain Layer: Pure Dart UseCases, Repository Interfaces, and Equatable Entities with 100% unit test coverage.",
        "Data Layer: Remote Data Sources with SSL-Pinned HttpClient/Dio, Local Data Sources, and Either<Failure, T> functional error handling.",
      ],
      techStack: [
        "Flutter",
        "Dart",
        "Clean Architecture",
        "BLoC / Cubit",
        "Riverpod",
        "Provider",
        "TDD",
        "SSL Pinning",
        "CI/CD",
        "Git",
      ],
    },
    {
      slug: "story-app",
      name: "StoryApp Android",
      tagline: "Location-Aware Social Story Sharing App in Native Kotlin",
      shortDescription:
        "Native Android social story application built with Kotlin, MVVM, Paging 3 infinite scrolling, Room offline mediator, Custom Views, camera/gallery upload, and interactive Google Maps story markers.",
      developer: "Raihan Ridho Mubarok",
      category: "Mobile",
      tags: ["Mobile", "Kotlin", "Android"],
      accentColor: "#8B5CF6",
      iconBg: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
      iconText: "SA",
      status: "Open Source",
      repoUrl: "https://github.com/ean310/StoryApp",
      year: "2024",
      platform: "Android (Kotlin)",
      role: "Android Developer",
      metrics: [
        { label: "Language", value: "Kotlin", sub: "100% Native Android" },
        { label: "Pagination", value: "Paging 3", sub: "RemoteMediator + Room" },
        { label: "Geolocation", value: "Maps SDK", sub: "Geotagged Story Feed" },
        { label: "Testing", value: "Unit/UI", sub: "Coroutines & Paging Tests" },
      ],
      screens: [
        {
          title: "Welcome & Custom EditText Validation Auth",
          caption: "Onboarding & login flow featuring custom-built EmailEditText and PasswordEditText components.",
          badge: "Custom Views & Auth",
          gradient: "from-lime-500/25 via-emerald-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/storyapp/1-welcome-login.png",
          highlights: [
            "Custom EditText views validating email format & 8-char password in real time",
            "Property animations on welcome illustration and form elements",
            "Asynchronous JWT session persistence via Jetpack DataStore Preferences",
          ],
          device: "phone",
        },
        {
          title: "Infinite Paginated Story Feed (Paging 3)",
          caption: "Smooth Paging 3 feed with shared-element transitions, Glide image caching, and Room offline support.",
          badge: "Paging 3 + Room",
          gradient: "from-violet-500/25 via-purple-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/storyapp/2-story-feed.png",
          highlights: [
            "Paging 3 StoryPagingSource & PagingDataAdapter with DiffUtil",
            "Cross-fade Glide image loading and shared-element detail transitions",
            "Quick toolbar navigation to interactive MapsActivity and session logout",
          ],
          device: "phone",
        },
        {
          title: "Camera / Gallery Upload & Auto-Compression",
          caption: "Media upload screen supporting Camera intent, Photo Picker gallery, Exif rotation fix, and GPS tagging.",
          badge: "Media & Exif Pipeline",
          gradient: "from-emerald-500/25 via-teal-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/storyapp/3-upload-story.png",
          highlights: [
            "Automatic image compression under 1 MB (reduceFileImage) before upload",
            "Optional FusedLocationProviderClient toggle attaching current GPS coordinates",
            "Multipart REST API upload with reactive loading state",
          ],
          device: "phone",
        },
        {
          title: "Geotagged Stories on Google Maps",
          caption: "Interactive map view plotting user stories across Indonesia with custom JSON map styling and camera bounds.",
          badge: "Google Maps SDK",
          gradient: "from-fuchsia-500/25 via-indigo-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/storyapp/4-maps-stories.png",
          highlights: [
            "Custom map style loaded from raw map_style.json resource",
            "Interactive markers with author & story snippet InfoWindows",
            "Auto-fit LatLngBounds camera animation enveloping all story pins",
          ],
          device: "phone",
        },
      ],
      overview: [
        "StoryApp is a native Android application crafted in Kotlin that lets users capture, geotag, and share visual stories with the community. It showcases intermediate-to-advanced Android Jetpack components working in harmony.",
        "Built with MVVM architecture, it combines Paging 3 and Room RemoteMediator for resilient infinite scrolling, custom UI components with property animations, camera/gallery image compression, and Google Maps integration.",
      ],
      keyFeatures: [
        {
          title: "Paging 3 with Offline RemoteMediator",
          description:
            "Streams large story feeds effortlessly while caching pages locally in Room for instant startup and offline resilience.",
        },
        {
          title: "Interactive Story Map",
          description:
            "Visualizes geotagged stories on Google Maps with custom styling, marker info windows, and automatic camera bounds.",
        },
        {
          title: "CameraX / Gallery Upload & Compression",
          description:
            "Captures photos directly or from gallery, compresses file size automatically, and uploads via multipart REST API.",
        },
      ],
      architecture: [
        "MVVM Architecture with Kotlin Coroutines, Flow, LiveData, DataStore Preferences (JWT auth session), Retrofit2, Room, and Paging 3.",
      ],
      techStack: [
        "Kotlin",
        "Android Jetpack",
        "MVVM",
        "Paging 3",
        "Room Database",
        "Google Maps API",
        "Retrofit",
        "Coroutines",
      ],
    },
    {
      slug: "yorsyd-web",
      name: "Yorsyd Web",
      tagline: "Collaborative Interactive Web Portal & Frontend Showcase",
      shortDescription:
        "Collaborative web project combining responsive frontend interfaces with dynamic PHP and JavaScript modules.",
      developer: "Raihan Ridho Mubarok · Collaborative Project",
      category: "Web",
      tags: ["Web", "Frontend", "PHP"],
      accentColor: "#EC4899",
      iconBg: "linear-gradient(135deg, #db2777 0%, #9333ea 100%)",
      iconText: "YW",
      status: "Open Source",
      repoUrl: "https://github.com/yorsyd/yorsyd.github.io",
      year: "2024",
      platform: "Web Application",
      role: "Frontend & Web Developer",
      metrics: [
        { label: "Category", value: "Web App", sub: "Collaborative Portal" },
        { label: "Stack", value: "PHP & JS", sub: "HTML5 · CSS3" },
        { label: "Workflow", value: "Git Flow", sub: "Multi-Contributor" },
        { label: "Source", value: "GitHub", sub: "Open Repository" },
      ],
      screens: [
        {
          title: "Streetwear Hero & Brand Category Showcase",
          caption: "Landing page highlighting featured sneaker drops and brand categories (Nike, New Balance, Converse, Vans).",
          badge: "Home & Brand Hub",
          gradient: "from-pink-500/25 via-rose-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/yorsyd/1-home-showcase.png",
          highlights: [
            "Full-width streetwear hero banner with call-to-action catalog trigger",
            "Dedicated category cards for Nike, New Balance, Converse, and Vans",
            "Responsive navigation bar with quick access to Wishlist & Cart",
          ],
          device: "desktop",
        },
        {
          title: "Interactive Sneaker Catalog & Cart",
          caption: "Multi-brand product grid with JavaScript brand filtering, pricing display, and shopping cart actions.",
          badge: "Catalog & Cart JS",
          gradient: "from-fuchsia-500/25 via-pink-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/yorsyd/2-sneaker-catalog.png",
          highlights: [
            "Dynamic brand filter scripts (nike.js, newBalance.js, converse.js, vans.js)",
            "Product cards showcasing high-res sneaker imagery and IDR pricing",
            "Interactive Add to Cart and Wishlist toggles",
          ],
          device: "desktop",
        },
        {
          title: "Member Authentication & Wishlist Sync",
          caption: "Split-screen member login and registration interface backed by PHP & MySQL database tables.",
          badge: "PHP & MySQL Auth",
          gradient: "from-purple-500/25 via-pink-600/15 to-slate-900/30",
          imageUrl: "/projects/screens/yorsyd/3-auth-wishlist.png",
          highlights: [
            "Split-screen login & registration views (login.php & registrasi.php)",
            "Connected to MySQL user.sql and jual1.sql schemas via connect.php",
            "Persistent user session for managing saved wishlist items",
          ],
          device: "desktop",
        },
      ],
      overview: [
        "Yorsyd Web is a collaborative web development repository where our team designed and implemented responsive web interfaces and dynamic PHP/JavaScript views using structured Git collaboration.",
      ],
      keyFeatures: [
        {
          title: "Responsive Multi-Page Architecture",
          description:
            "Crafted semantic HTML5, modern CSS3, and interactive JavaScript components that adapt cleanly across screen sizes.",
        },
        {
          title: "Collaborative Git Workflow",
          description:
            "Practiced structured team branching, code reviews, and merge conflict resolution across shared web modules.",
        },
      ],
      architecture: [
        "Modular PHP & JavaScript frontend/backend templates managed via GitHub.",
      ],
      techStack: ["PHP", "JavaScript", "HTML5", "CSS3", "Git", "GitHub"],
    },
  ] as ProjectItem[],

  toolCategories: [
    {
      name: "Mobile & Architecture",
      items: [
        { name: "Flutter", iconSlug: "flutter", color: "#02569B" },
        { name: "Dart", iconSlug: "dart", color: "#0175C2" },
        { name: "Kotlin", iconSlug: "kotlin", color: "#7F52FF" },
        { name: "Jetpack Compose", iconSlug: "jetpackcompose", color: "#4285F4" },
        { name: "Android", iconSlug: "android", color: "#3DDC84" },
      ],
    },
    {
      name: "Languages & Frontend",
      items: [
        { name: "TypeScript", iconSlug: "typescript", color: "#3178C6" },
        { name: "JavaScript", iconSlug: "javascript", color: "#F7DF1E" },
        { name: "React", iconSlug: "react", color: "#61DAFB" },
        { name: "Next.js", iconSlug: "nextdotjs", color: "#000000", invertDark: true },
        { name: "Tailwind CSS", iconSlug: "tailwindcss", color: "#06B6D4" },
        { name: "PHP", iconSlug: "php", color: "#777BB4" },
        { name: "HTML5", iconSlug: "html5", color: "#E34F26" },
        { name: "CSS3", iconSlug: "css", color: "#1572B6" },
      ],
    },
    {
      name: "Backend, Cloud & Data",
      items: [
        { name: "Node.js", iconSlug: "nodedotjs", color: "#5FA04E" },
        { name: "Firebase", iconSlug: "firebase", color: "#DD2C00" },
        { name: "Supabase", iconSlug: "supabase", color: "#3FCF8E" },
        { name: "Google Cloud", iconSlug: "googlecloud", color: "#4285F4" },
        { name: "TensorFlow Lite", iconSlug: "tensorflow", color: "#FF6F00" },
      ],
    },
    {
      name: "Design, DevOps & Tools",
      items: [
        { name: "Figma", iconSlug: "figma", color: "#F24E1E" },
        { name: "Android Studio", iconSlug: "androidstudio", color: "#3DDC84" },
        { name: "Git", iconSlug: "git", color: "#F05032" },
        { name: "GitHub", iconSlug: "github", color: "#181717", invertDark: true },
        { name: "GitLab", iconSlug: "gitlab", color: "#FC6D26" },
        { name: "Postman", iconSlug: "postman", color: "#FF6C37" },
        { name: "Diagrams.net", iconSlug: "diagramsdotnet", color: "#F08705" },
        { name: "Canva", iconSlug: "canva", iconUrl: "/techstack/canva.svg", color: "#00C4CC" },
      ],
    },
    {
      name: "Engineering Practices",
      items: [
        { name: "Clean Architecture", iconSlug: "stackblitz", color: "#1389FD" },
        { name: "MVVM & SOLID", iconSlug: "levelsdotfyi", color: "#10B981" },
        { name: "BLoC & Riverpod", iconSlug: "dart", color: "#00B4AB" },
        { name: "TDD & CI/CD", iconSlug: "githubactions", color: "#2088FF" },
      ],
    },
  ] as ToolCategory[],
};

