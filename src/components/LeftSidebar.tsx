"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Mail,
  Medal,
  MessageCircle,
  Sparkles,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import {
  CertificateItem,
  HighlightItem,
  PORTFOLIO_DATA,
} from "@/data/portfolio";

export function LeftSidebar() {
  const { profile, highlights, experiences, achievements, certificates } =
    PORTFOLIO_DATA;

  const [partyMode, setPartyMode] = useState(false);
  const [avatarGreetingIdx, setAvatarGreetingIdx] = useState<number | null>(null);
  const [showAllExp, setShowAllExp] = useState(false);

  // Certificates state
  const [certCategory, setCertCategory] = useState<string>("All");
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(
    null
  );

  // Story modal state
  const [activeHighlightIdx, setActiveHighlightIdx] = useState<number | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyPaused, setStoryPaused] = useState(false);

  // Live Jakarta clock
  const [jakartaTime, setJakartaTime] = useState("--:--");
  const [jakartaDate, setJakartaDate] = useState("");

  const greetings = [
    "Hey! I'm Raihan 👋",
    "Kotlin & Flutter Dev 📱",
    "Bangkit Distinction Grad 🏆",
    "Let's build together! 🚀",
  ];

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        const dateStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(now);
        setJakartaTime(timeStr);
        setJakartaDate(`${dateStr} · GMT+7`);
      } catch {
        setJakartaTime("08:00:00");
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance Instagram Story modal
  useEffect(() => {
    if (activeHighlightIdx === null || storyPaused) return;
    const currentHighlight = highlights[activeHighlightIdx];
    if (!currentHighlight) return;

    const tick = window.setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          // Move to next slide or next highlight
          if (activeSlideIdx < currentHighlight.slides.length - 1) {
            setActiveSlideIdx((s) => s + 1);
            return 0;
          } else if (activeHighlightIdx < highlights.length - 1) {
            setActiveHighlightIdx((h) => (h !== null ? h + 1 : null));
            setActiveSlideIdx(0);
            return 0;
          } else {
            setActiveHighlightIdx(null);
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(tick);
  }, [activeHighlightIdx, activeSlideIdx, storyPaused, highlights]);

  const openHighlight = (idx: number) => {
    setActiveHighlightIdx(idx);
    setActiveSlideIdx(0);
    setStoryProgress(0);
    setStoryPaused(false);
  };

  const nextStorySlide = () => {
    if (activeHighlightIdx === null) return;
    const current = highlights[activeHighlightIdx];
    if (activeSlideIdx < current.slides.length - 1) {
      setActiveSlideIdx((s) => s + 1);
      setStoryProgress(0);
    } else if (activeHighlightIdx < highlights.length - 1) {
      setActiveHighlightIdx(activeHighlightIdx + 1);
      setActiveSlideIdx(0);
      setStoryProgress(0);
    } else {
      setActiveHighlightIdx(null);
    }
  };

  const prevStorySlide = () => {
    if (activeHighlightIdx === null) return;
    if (activeSlideIdx > 0) {
      setActiveSlideIdx((s) => s - 1);
      setStoryProgress(0);
    } else if (activeHighlightIdx > 0) {
      const prevH = activeHighlightIdx - 1;
      setActiveHighlightIdx(prevH);
      setActiveSlideIdx(highlights[prevH].slides.length - 1);
      setStoryProgress(0);
    }
  };

  const visibleExperiences = showAllExp ? experiences : experiences.slice(0, 2);

  const filteredCerts =
    certCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === certCategory);
  const visibleCerts = showAllCerts ? filteredCerts : filteredCerts.slice(0, 4);

  const renderHighlightIcon = (item: HighlightItem) => {
    switch (item.iconName) {
      case "user":
        return <User className="h-6 w-6 text-[var(--foreground)] transition-transform duration-300 group-hover:scale-110" />;
      case "layers":
        return <Layers className="h-6 w-6 text-[var(--foreground)] transition-transform duration-300 group-hover:scale-110" />;
      case "zap":
        return <Zap className="h-6 w-6 text-[var(--foreground)] transition-transform duration-300 group-hover:scale-110" />;
      default:
        return <Mail className="h-6 w-6 text-[var(--foreground)] transition-transform duration-300 group-hover:scale-110" />;
    }
  };

  return (
    <>
      <aside className="relative no-scrollbar lg:h-screen lg:overflow-y-auto lg:overscroll-contain lg:border-r lg:pb-[22vh]">
        <div className="sticky top-0 z-20 hidden h-0 lg:block" />

        {/* Profile Section */}
        <section className="mx-auto w-full max-w-2xl px-5 pt-14 pb-2 sm:pt-20 lg:max-w-none lg:px-8 lg:pt-20">
          <div className="flex items-center gap-3.5 lg:flex-col lg:items-center lg:gap-5">
            <div className="group relative shrink-0">
              {/* Popover Speech Bubble on Avatar Click */}
              {avatarGreetingIdx !== null && (
                <div className=" absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border bg-[var(--background)] px-3 py-1 text-xs font-semibold text-[var(--foreground)] shadow-lg">
                  {greetings[avatarGreetingIdx]}
                </div>
              )}

              <span
                aria-hidden="true"
                className={`avatar-ring pointer-events-none absolute -inset-[5px] rounded-full transition duration-300 lg:-inset-[7px] ${
                  partyMode
                    ? "avatar-ring--party scale-100 opacity-100"
                    : "scale-95 opacity-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100"
                }`}
              >
                <span className="avatar-ring__spin absolute inset-0 rounded-full" />
              </span>

              <button
                type="button"
                aria-label={`${profile.name} — click me`}
                data-say="That's me 👋 Click me!"
                onClick={() => {
                  setPartyMode((p) => !p);
                  setAvatarGreetingIdx((prev) =>
                    prev === null ? 0 : (prev + 1) % greetings.length
                  );
                }}
                className="avatar-backdrop relative block h-16 w-16 overflow-hidden rounded-full border bg-[var(--muted)] outline-none sm:h-18 sm:w-18 lg:h-44 lg:w-44"
              >
                <img
                  alt={profile.name}
                  src={profile.avatar}
                  className={`h-full w-full object-cover transition-all duration-500 ${
                    partyMode ? "grayscale-0 scale-105" : "grayscale-[45%] group-hover:grayscale-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col lg:items-center lg:text-center">
              <div data-tour="profile" className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl lg:text-2xl">
                  {profile.name}
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="var(--foreground)"
                  stroke="var(--background)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 lg:h-5 lg:w-5"
                  aria-label="Verified"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <p className="mt-0.5 text-xs font-medium text-[var(--muted-foreground)] sm:text-sm">
                {profile.roles.join(" · ")}
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted-foreground)] lg:mx-auto lg:text-center">
            {profile.tagline}
          </p>

          {/* Follow & Message CTA Row */}
          <div data-tour="cta" className="mt-4 flex gap-2 lg:mt-6">
            <a
              href={profile.githubUrl}
              data-say="Follow @ean310 on GitHub 🐙"
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-lg bg-[var(--foreground)] px-4 py-2 text-center text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-90"
            >
              Follow
            </a>
            <a
              href={profile.whatsappUrl}
              data-say="Say hi on WhatsApp 💬"
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-lg border px-4 py-2 text-center text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
            >
              Message
            </a>
            <a
              href={profile.linkedinUrl}
              data-say="Connect on LinkedIn 💼"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href={profile.emailUrl}
              data-say="Send me an email ✉️"
              aria-label="Email"
              className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <hr className="mt-8 border-[var(--border)] lg:hidden" />
        </section>

        {/* Instagram-Style Story Highlights */}
        <section className="mx-auto w-full max-w-2xl px-5 pb-4 pt-2 lg:max-w-none lg:px-8 lg:pt-6">
          <div data-tour="highlights" className="flex gap-5 overflow-x-auto pb-1">
            {highlights.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                data-say={item.say}
                onClick={() => openHighlight(idx)}
                className="group flex shrink-0 flex-col items-center gap-1.5"
              >
                <span className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--border)] bg-[var(--muted)] p-0.5 transition-colors group-hover:border-[var(--foreground)]">
                  <span
                    className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} grayscale transition-all duration-300 group-hover:grayscale-0`}
                  >
                    {renderHighlightIcon(item)}
                  </span>
                </span>
                <span className="text-[11px] font-medium text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--foreground)]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section
          data-tour="experience"
          className="mx-auto w-full max-w-2xl px-5 pt-3 pb-8 lg:max-w-none lg:px-8 lg:pt-6"
        >
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            Experience &amp; Education
          </h2>
          <ol>
            {visibleExperiences.map((exp, idx) => {
              const isLast = idx === visibleExperiences.length - 1;
              return (
                <li
                  key={exp.id}
                  className={`relative border-l pl-6 ${isLast ? "" : "pb-7"}`}
                >
                  <span
                    className="absolute -left-[6.5px] top-1 h-3 w-3 rounded-full border-2 border-[var(--background)] bg-[var(--foreground)]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-[var(--muted-foreground)]">
                      {exp.period}
                    </span>
                    {exp.badgeText && (
                      <span className="rounded-full border px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted-foreground)]">
                        {exp.badgeText}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        data-say={exp.companySay || exp.company}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-[var(--foreground)] transition-opacity hover:opacity-75"
                      >
                        <span className={idx === 0 ? "shiny-text" : ""}>
                          {exp.company}
                        </span>
                      </a>
                    ) : (
                      <span className="font-semibold text-[var(--foreground)]">
                        {exp.company}
                      </span>
                    )}
                    <span className="text-sm italic text-[var(--muted-foreground)]">
                      {exp.role}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {exp.highlights[0]}
                  </p>
                </li>
              );
            })}
          </ol>

          {experiences.length > 2 && (
            <button
              type="button"
              data-say={showAllExp ? "Collapse timeline" : "See my whole journey"}
              onClick={() => setShowAllExp((s) => !s)}
              className="mt-5 inline-flex items-center gap-1 pl-6 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              {showAllExp ? "Show less" : `See all (${experiences.length})`}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  showAllExp ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </section>

        {/* Achievements Section */}
        <section
          data-tour="achievements"
          className="mx-auto w-full max-w-2xl px-5 pt-3 pb-8 lg:max-w-none lg:px-8 lg:pt-6"
        >
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            Achievements &amp; Honors
          </h2>
          <ul className="space-y-6">
            {achievements.map((ach) => (
              <li key={ach.id} className="flex gap-3.5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[var(--muted)] text-[var(--foreground)]"
                  aria-hidden="true"
                >
                  {ach.icon === "trophy" ? (
                    <Trophy className="h-4 w-4" />
                  ) : ach.icon === "medal" ? (
                    <Medal className="h-4 w-4" />
                  ) : (
                    <GraduationCap className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--muted-foreground)]">
                    {ach.issuer} · {ach.date}
                  </p>
                  <p className="mt-0.5 font-semibold text-[var(--foreground)]">
                    {ach.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {ach.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
                    {ach.links.map((link) =>
                      link.external ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          data-say={link.say}
                          className="inline-flex items-center gap-1 text-[var(--foreground)] transition-opacity hover:opacity-70"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          href={link.href}
                          data-say={link.say}
                          className="group inline-flex items-center gap-1 text-[var(--foreground)] transition-opacity hover:opacity-70"
                        >
                          {link.label}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Licenses & Certifications Section (LinkedIn Synced) */}
        <section
          data-tour="certifications"
          className="mx-auto w-full max-w-2xl px-5 pt-2 pb-8 lg:max-w-none lg:px-8 lg:pt-4"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                Licenses &amp; Certifications
              </h2>
              <span className="text-[11px] text-[var(--muted-foreground)]">
                {filteredCerts.length}
              </span>
            </div>
            <a
              href="https://www.dicoding.com/users/3789638/academies"
              target="_blank"
              rel="noreferrer"
              data-say="Open my Dicoding Academy profile ↗"
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[var(--foreground)] transition-opacity hover:opacity-70"
            >
              Dicoding Profile
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {["All", "Flutter", "Android", "Fundamentals"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCertCategory(cat)}
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${
                  certCategory === cat
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Certificates List */}
          <ul className="space-y-3">
            {visibleCerts.map((cert) => (
              <li
                key={cert.id}
                role="button"
                tabIndex={0}
                data-say="Tap to preview certificate 📜"
                onClick={() => setSelectedCert(cert)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCert(cert);
                  }
                }}
                className="group cursor-pointer rounded-2xl border bg-[var(--card)]/40 p-3.5 transition-colors hover:bg-[var(--accent)]/60"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-[var(--background)] p-2">
                    <img
                      alt={cert.issuer}
                      src={`https://cdn.simpleicons.org/${cert.issuerLogo}`}
                      className="h-full w-full object-contain opacity-85 transition group-hover:opacity-100"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                        {cert.date} {cert.hours ? `· ${cert.hours}` : ""}
                      </span>
                      <span className="shrink-0 rounded-full border bg-[var(--background)] px-2 py-0.5 text-[9px] font-bold text-[var(--foreground)]">
                        {cert.badge}
                      </span>
                    </div>

                    <p className="mt-0.5 text-sm font-semibold leading-snug text-[var(--foreground)] group-hover:underline">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[var(--muted-foreground)]">
                      {cert.issuer}
                    </p>

                    {/* Skills Pills */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {cert.skills.slice(0, 4).map((sk) => (
                        <span
                          key={sk}
                          className="rounded-md border bg-[var(--background)]/70 px-1.5 py-0.5 text-[9px] text-[var(--muted-foreground)]"
                        >
                          {sk}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="rounded-md border bg-[var(--background)]/70 px-1.5 py-0.5 text-[9px] text-[var(--muted-foreground)]">
                          +{cert.skills.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-say="Verify directly on Dicoding.com ↗"
                        className="inline-flex items-center gap-1 text-[var(--foreground)] transition-opacity hover:opacity-75"
                      >
                        Verify on Dicoding
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>

                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          data-say="Open official PDF 📄"
                          className="inline-flex items-center gap-0.5 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                        >
                          PDF
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {filteredCerts.length > 4 && (
            <button
              type="button"
              data-say={
                showAllCerts
                  ? "Show fewer certificates"
                  : `See all ${filteredCerts.length} certificates`
              }
              onClick={() => setShowAllCerts((s) => !s)}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              {showAllCerts
                ? "Show less"
                : `See all (${filteredCerts.length})`}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  showAllCerts ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </section>

        {/* Availability & Live Jakarta Time Card */}
        <section
          data-tour="availability"
          className="mx-auto w-full max-w-2xl px-5 pb-8 lg:max-w-none lg:px-8"
        >
          <div className="rounded-2xl border bg-[var(--card)]/50 p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00c853] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00c853]" />
              </span>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {profile.availabilityText}
              </p>
            </div>

            <div className="mt-3 flex items-end justify-between gap-3 border-t pt-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Jakarta time
                </p>
                <p className="mt-0.5 text-2xl font-bold tabular-nums tracking-tight text-[var(--foreground)]">
                  {jakartaTime}
                </p>
              </div>
              <p className="pb-1 text-right text-xs text-[var(--muted-foreground)]">
                {jakartaDate}
              </p>
            </div>

            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              {profile.responseTimeText} · {profile.email}
            </p>

            <div className="mt-4 flex gap-2">
              <a
                href={profile.cvUrl}
                data-say="Grab my CV 📄"
                download="Raihan_Ridho_Mubarok_CV.pdf"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--foreground)] px-3 py-2 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <a
                href={profile.whatsappUrl}
                data-say="Chat on WhatsApp 💬"
                target="_blank"
                rel="noreferrer"
                aria-label="Message me on WhatsApp"
                className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </aside>

      {/* Interactive Certificate Preview Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[190] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#0c0d12] text-white shadow-2xl"
          >
            {/* Top Gradient Banner & Visual Certificate Frame */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black p-6 sm:p-8">
              <div
                style={{
                  background: `radial-gradient(circle at 85% 15%, ${selectedCert.accentColor}45, transparent 60%)`,
                }}
                className="pointer-events-none absolute inset-0"
              />
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-1.5 text-white/80 hover:bg-white/20 hover:text-white"
                aria-label="Close certificate preview"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Official Certificate Image or Simulated Frame */}
              {selectedCert.imageUrl ? (
                <div className="relative z-10 overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative z-10 rounded-2xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 p-1.5">
                        <img
                          alt={selectedCert.issuer}
                          src={`https://cdn.simpleicons.org/${selectedCert.issuerLogo}`}
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                          Certificate of Completion
                        </p>
                        <p className="text-xs font-semibold text-white">
                          {selectedCert.issuer}
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        borderColor: `${selectedCert.accentColor}66`,
                        color: selectedCert.accentColor,
                      }}
                      className="rounded-full border bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    >
                      {selectedCert.badge}
                    </span>
                  </div>

                  <div className="py-5">
                    <p className="text-[10px] uppercase tracking-widest text-white/50">
                      This is proudly presented to
                    </p>
                    <p className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                      {profile.name}
                    </p>
                    <p className="mt-3 text-[11px] text-white/60">
                      for successfully completing and demonstrating mastery in
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-white sm:text-lg">
                      {selectedCert.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/75">
                      {selectedCert.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] text-white/60">
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified Credential · {selectedCert.date}
                    </span>
                    {selectedCert.credentialId && (
                      <span className="font-mono text-[10px] text-white/45">
                        ID: {selectedCert.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Skills & Action Bar */}
            <div className="space-y-4 bg-[#11131a] p-5 sm:px-8">
              <div>
                <p className="text-xs leading-relaxed text-white/75">
                  {selectedCert.description}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Skills &amp; Competencies Verified
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((sk) => (
                    <span
                      key={sk}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/90"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-black transition-opacity hover:opacity-90"
                >
                  Verify on Dicoding.com
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Open Full PDF
                    <Download className="h-3.5 w-3.5" />
                  </a>
                )}
                {selectedCert.projectSlug && (
                  <Link
                    href={`/projects/${selectedCert.projectSlug}`}
                    onClick={() => setSelectedCert(null)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Project
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instagram-Style Story Highlight Viewer Modal */}
      {activeHighlightIdx !== null && highlights[activeHighlightIdx] && (
        <div
          className="fixed inset-0 z-[180] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setActiveHighlightIdx(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseDown={() => setStoryPaused(true)}
            onMouseUp={() => setStoryPaused(false)}
            onTouchStart={() => setStoryPaused(true)}
            onTouchEnd={() => setStoryPaused(false)}
            className="relative flex h-[min(86vh,680px)] w-full max-w-[390px] flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-[#0d0d11] p-5 text-white shadow-2xl select-none"
          >
            {/* Progress Bars */}
            <div>
              <div className="flex gap-1.5">
                {highlights[activeHighlightIdx].slides.map((s, idx) => (
                  <div
                    key={s.id}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-white/20"
                  >
                    <div
                      className="h-full bg-white transition-all duration-100"
                      style={{
                        width:
                          idx < activeSlideIdx
                            ? "100%"
                            : idx === activeSlideIdx
                            ? `${storyProgress}%`
                            : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Header */}
              <div className="mt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-8 w-8 rounded-full border border-white/20 object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold leading-none">
                      {highlights[activeHighlightIdx].label}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/60">
                      @ean310 · {activeSlideIdx + 1}/
                      {highlights[activeHighlightIdx].slides.length}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHighlightIdx(null)}
                  className="rounded-full bg-white/10 p-1.5 text-white/80 hover:bg-white/20 hover:text-white"
                  aria-label="Close story"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Slide Body */}
            {(() => {
              const slide =
                highlights[activeHighlightIdx].slides[activeSlideIdx] ||
                highlights[activeHighlightIdx].slides[0];
              return (
                <div className="relative z-10 my-auto py-4">
                  <span
                    style={{ color: slide.accentColor }}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <Sparkles className="h-3 w-3" />
                    {slide.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                    {slide.title}
                  </h3>
                  {slide.subtitle && (
                    <p className="mt-1 text-xs font-medium text-white/70">
                      {slide.subtitle}
                    </p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-white/85">
                    {slide.body}
                  </p>
                  {slide.bullets && (
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-3">
                      {slide.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs text-white/80"
                        >
                          <Award
                            style={{ color: slide.accentColor }}
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {slide.ctaLabel && slide.ctaHref && (
                    <div className="mt-5">
                      <a
                        href={slide.ctaHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105"
                      >
                        {slide.ctaLabel}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Story Category Switcher Pills at Bottom */}
            <div className="relative z-20 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <div className="flex gap-1.5">
                {highlights.map((h, i) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => openHighlight(i)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      i === activeHighlightIdx
                        ? "bg-white text-black"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={prevStorySlide}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-white/20"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={nextStorySlide}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-white/20"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
