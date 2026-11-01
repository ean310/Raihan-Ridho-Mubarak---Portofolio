"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Layers,
  Monitor,
  Share2,
  Smartphone,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio";

export function ProjectDetailClient({ project }: { project: ProjectItem }) {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedOverview, setExpandedOverview] = useState(false);
  const [activeScreenIdx, setActiveScreenIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard navigation for zoom lightbox
  useEffect(() => {
    if (activeScreenIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveScreenIdx(null);
      if (e.key === "ArrowRight") {
        setActiveScreenIdx((prev) =>
          prev === null ? 0 : (prev + 1) % project.screens.length
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveScreenIdx((prev) =>
          prev === null
            ? 0
            : (prev - 1 + project.screens.length) % project.screens.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeScreenIdx, project.screens.length]);

  const otherProjects = PORTFOLIO_DATA.projects.filter(
    (p) => p.slug !== project.slug
  );

  const primaryActionHref =
    project.liveUrl || project.downloadUrl || project.repoUrl || "#";
  const primaryActionLabel = project.liveUrl
    ? "Open"
    : project.downloadUrl
    ? "Get APK"
    : "Source";

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${project.name} — Raihan Ridho Mubarok`,
          text: project.tagline,
          url,
        });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Combine screen highlights into "What's Included" checklist items
  const whatsIncluded = useMemo(() => {
    const list: string[] = [];
    for (const scr of project.screens) {
      for (const h of scr.highlights) {
        if (!list.includes(h)) list.push(h);
      }
    }
    return list.slice(0, 10);
  }, [project.screens]);

  // Combine keyFeatures + architecture into "Under the Hood" highlight cards
  const underTheHood = useMemo(() => {
    const cards = project.keyFeatures.map((kf) => ({
      title: kf.title,
      body: kf.description,
    }));
    project.architecture.forEach((arch, idx) => {
      const parts = arch.split(":");
      if (parts.length > 1) {
        cards.push({
          title: parts[0].trim(),
          body: parts.slice(1).join(":").trim(),
        });
      } else {
        cards.push({
          title: `Architecture Layer 0${idx + 1}`,
          body: arch,
        });
      }
    });
    return cards;
  }, [project.keyFeatures, project.architecture]);

  const isPhoneProject = project.screens[0]?.device === "phone";

  return (
    <div className="min-h-screen pb-20">
      {/* Sticky App Store Navigation Bar (exact jmancheta.cloud style) */}
      <header
        className={`sticky top-0 z-30 border-b bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl transition-colors ${
          scrolled ? "border-[var(--border)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-5">
          <Link
            href="/"
            data-say="Back to home"
            className="-ml-1.5 inline-flex items-center gap-1 text-[15px] font-medium text-[var(--foreground)] transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" />
            Projects
          </Link>

          <div
            className={`flex min-w-0 items-center gap-2.5 transition duration-300 ${
              scrolled
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            {project.iconUrl ? (
              <span
                style={{ width: 28, height: 28, background: project.iconBg }}
                className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[22%] border border-black/5 p-0.5 dark:border-white/10"
              >
                <img
                  src={project.iconUrl}
                  alt={project.name}
                  className="h-full w-full rounded-[16%] object-contain"
                />
              </span>
            ) : (
              <span
                style={{ width: 28, height: 28, background: project.iconBg }}
                className="flex shrink-0 items-center justify-center rounded-[22%] border border-black/5 text-[10px] font-extrabold text-white"
              >
                {project.iconText}
              </span>
            )}
            <span className="hidden max-w-[40vw] truncate text-sm font-semibold text-[var(--foreground)] sm:block">
              {project.name}
            </span>
            <a
              href={primaryActionHref}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-[var(--foreground)] px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-[var(--background)] transition-opacity hover:opacity-85"
            >
              {primaryActionLabel}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 pb-16">
        {/* App Store Header (#app-header) */}
        <div id="app-header" className="flex gap-4 pt-4 sm:gap-7 sm:pt-8">
          <div className="flex sm:hidden">
            {project.iconUrl ? (
              <span
                style={{ width: 112, height: 112, background: project.iconBg }}
                className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[22%] border border-black/5 p-2 shadow-sm dark:border-white/10"
              >
                <img
                  src={project.iconUrl}
                  alt={project.name}
                  className="h-full w-full rounded-[16%] object-contain"
                />
              </span>
            ) : (
              <span
                style={{ width: 112, height: 112, background: project.iconBg }}
                className="flex shrink-0 items-center justify-center rounded-[22%] border border-black/5 text-3xl font-black tracking-tight text-white"
              >
                {project.iconText}
              </span>
            )}
          </div>
          <div className="hidden sm:flex">
            {project.iconUrl ? (
              <span
                style={{ width: 168, height: 168, background: project.iconBg }}
                className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[22%] border border-black/5 p-3 shadow-sm dark:border-white/10"
              >
                <img
                  src={project.iconUrl}
                  alt={project.name}
                  className="h-full w-full rounded-[16%] object-contain"
                />
              </span>
            ) : (
              <span
                style={{ width: 168, height: 168, background: project.iconBg }}
                className="flex shrink-0 items-center justify-center rounded-[22%] border border-black/5 text-5xl font-black tracking-tight text-white"
              >
                {project.iconText}
              </span>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col py-0.5">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-0.5 line-clamp-2 text-sm text-[var(--muted-foreground)] sm:mt-1 sm:text-lg">
              {project.tagline}
            </p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)] sm:text-sm">
              {project.developer}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
              <a
                href={primaryActionHref}
                target="_blank"
                rel="noreferrer"
                data-say={`${primaryActionLabel} ${project.name} ↗`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--foreground)] px-6 py-1.5 text-sm font-bold uppercase tracking-wide text-[var(--background)] transition-opacity hover:opacity-85"
              >
                {primaryActionLabel}
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {project.repoUrl && project.repoUrl !== primaryActionHref && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-say="View GitHub repository ↗"
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  GitHub
                </a>
              )}

              {project.downloadUrl &&
                project.downloadUrl !== primaryActionHref && (
                  <a
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-say="Download Android APK 📦"
                    className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    APK
                  </a>
                )}

              <button
                type="button"
                data-say="Share this project"
                onClick={handleShare}
                aria-label={`Share ${project.name}`}
                className="relative ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* App Store Metadata Strip (exact jmancheta.cloud 7-column strip) */}
        <div className="no-scrollbar -mx-5 mt-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <dl className="flex min-w-max divide-x border-y py-3 sm:min-w-0">
            <div className="flex w-[108px] shrink-0 flex-col items-center px-2 text-center sm:w-auto sm:flex-1">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Category
              </dt>
              <dd className="mt-1 flex h-7 items-center text-xl font-bold text-[var(--foreground)]">
                <Sparkles className="h-5 w-5" />
              </dd>
              <dd className="line-clamp-2 text-[11px] leading-tight text-[var(--muted-foreground)]">
                {project.category}
              </dd>
            </div>

            <div className="flex w-[108px] shrink-0 flex-col items-center px-2 text-center sm:w-auto sm:flex-1">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Platform
              </dt>
              <dd className="mt-1 flex h-7 items-center text-xl font-bold text-[var(--foreground)]">
                {isPhoneProject ? (
                  <Smartphone className="h-5 w-5" />
                ) : (
                  <Monitor className="h-5 w-5" />
                )}
              </dd>
              <dd className="line-clamp-2 text-[11px] leading-tight text-[var(--muted-foreground)]">
                {project.platform}
              </dd>
            </div>

            <div className="flex w-[108px] shrink-0 flex-col items-center px-2 text-center sm:w-auto sm:flex-1">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Year
              </dt>
              <dd className="mt-1 flex h-7 items-center text-xl font-bold text-[var(--foreground)]">
                {project.year}
              </dd>
              <dd className="line-clamp-2 text-[11px] leading-tight text-[var(--muted-foreground)]">
                {project.status}
              </dd>
            </div>

            <div className="flex w-[108px] shrink-0 flex-col items-center px-2 text-center sm:w-auto sm:flex-1">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Role
              </dt>
              <dd className="mt-1 flex h-7 items-center text-xl font-bold text-[var(--foreground)]">
                <UserCheck className="h-5 w-5" />
              </dd>
              <dd className="line-clamp-2 text-[11px] leading-tight text-[var(--muted-foreground)]">
                {project.role}
              </dd>
            </div>

            {project.metrics.slice(0, 3).map((m) => (
              <div
                key={m.label}
                className="flex w-[108px] shrink-0 flex-col items-center px-2 text-center sm:w-auto sm:flex-1"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  {m.label}
                </dt>
                <dd className="mt-1 flex h-7 items-center text-xl font-bold text-[var(--foreground)]">
                  {m.value}
                </dd>
                <dd className="line-clamp-2 text-[11px] leading-tight text-[var(--muted-foreground)]">
                  {m.sub}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* SECTION 0: Preview (Clean frameless horizontal snap carousel like caramove on jmancheta.cloud) */}
        <section className="pt-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Preview
          </h2>
          <div>
            <div className="relative">
              <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:scroll-px-0 sm:px-0">
                {project.screens.map((scr, idx) =>
                  scr.device === "phone" ? (
                    <button
                      key={scr.title}
                      data-shot="true"
                      data-say="Click to zoom 🔍"
                      type="button"
                      onClick={() => setActiveScreenIdx(idx)}
                      aria-label={`Open ${project.name} screenshot ${idx + 1}: ${scr.title}`}
                      className="group relative h-[460px] shrink-0 snap-start overflow-hidden rounded-[22px] border bg-[var(--muted)] lg:h-[540px]"
                    >
                      {scr.imageUrl && (
                        <img
                          src={scr.imageUrl}
                          alt={`${project.name} — ${scr.title}`}
                          loading="lazy"
                          className="h-full w-auto object-contain transition duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                    </button>
                  ) : (
                    <button
                      key={scr.title}
                      data-shot="true"
                      data-say="Click to zoom 🔍"
                      type="button"
                      onClick={() => setActiveScreenIdx(idx)}
                      aria-label={`Open ${project.name} screenshot ${idx + 1}: ${scr.title}`}
                      className="group relative aspect-[16/10] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border bg-[var(--muted)] sm:w-[560px]"
                    >
                      {scr.imageUrl && (
                        <img
                          src={scr.imageUrl}
                          alt={`${project.name} — ${scr.title}`}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)]">
              {isPhoneProject ? (
                <Smartphone className="h-3.5 w-3.5" />
              ) : (
                <Monitor className="h-3.5 w-3.5" />
              )}
              {project.platform}
            </p>
          </div>
        </section>

        {/* SECTION 1: Expandable Overview Paragraph */}
        <section className="mt-6 border-t pt-6">
          <div className="relative">
            <div
              className={`space-y-3 text-[15px] leading-relaxed text-[var(--foreground)] ${
                expandedOverview ? "" : "line-clamp-3"
              }`}
            >
              {project.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {!expandedOverview && (
              <button
                type="button"
                onClick={() => setExpandedOverview(true)}
                className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                more
              </button>
            )}
          </div>
        </section>

        {/* SECTION 2: What's Included (2-column checklist) */}
        <section className="mt-6 border-t pt-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
            What&apos;s Included
          </h2>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {whatsIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[15px] leading-snug text-[var(--foreground)]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 3: The Context & Engineering Goal */}
        <section className="mt-6 border-t pt-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
            The Problem &amp; Solution
          </h2>
          <p className="text-[15px] leading-relaxed text-[var(--foreground)]">
            {project.overview[project.overview.length - 1] ||
              project.shortDescription}
          </p>
        </section>

        {/* SECTION 4: By the Numbers */}
        <section className="mt-6 border-t pt-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
            By the Numbers
          </h2>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <li key={m.label}>
                <p className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  {m.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-[var(--muted-foreground)] sm:text-sm">
                  {m.label} — {m.sub}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 5: Under the Hood (Horizontal Snap Highlight Cards) */}
        <section className="mt-6 border-t pt-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Under the Hood
          </h2>
          <ol className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:scroll-px-0 sm:px-0">
            {underTheHood.map((item, idx) => (
              <li
                key={item.title}
                className="w-[290px] shrink-0 snap-start rounded-2xl bg-[var(--muted)] p-5 sm:w-[340px]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Highlight 0{idx + 1}
                </p>
                <p className="mt-1.5 text-[17px] font-bold leading-snug text-[var(--foreground)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* SECTION 6: Information (Full-width divided table) */}
        <section className="mt-6 border-t pt-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
            Information
          </h2>
          <dl className="divide-y text-sm">
            <div className="flex items-start justify-between gap-6 py-3">
              <dt className="shrink-0 text-[var(--muted-foreground)]">
                Developer
              </dt>
              <dd className="text-right text-[var(--foreground)]">
                {project.developer}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-6 py-3">
              <dt className="shrink-0 text-[var(--muted-foreground)]">
                Category
              </dt>
              <dd className="text-right text-[var(--foreground)]">
                {project.category}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-6 py-3">
              <dt className="shrink-0 text-[var(--muted-foreground)]">
                Platform
              </dt>
              <dd className="text-right text-[var(--foreground)]">
                {project.platform}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-6 py-3">
              <dt className="shrink-0 text-[var(--muted-foreground)]">
                Timeline
              </dt>
              <dd className="text-right text-[var(--foreground)]">
                {project.year} · {project.status}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-6 py-3">
              <dt className="shrink-0 text-[var(--muted-foreground)]">Role</dt>
              <dd className="text-right text-[var(--foreground)]">
                {project.role}
              </dd>
            </div>

            {project.repoUrl && (
              <div className="flex items-center justify-between gap-6 py-3">
                <dt className="text-[var(--muted-foreground)]">Source</dt>
                <dd className="min-w-0">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-1 font-medium text-[var(--foreground)] hover:underline"
                  >
                    <span className="truncate">
                      {project.repoUrl.replace("https://", "")}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </dd>
              </div>
            )}

            {project.secondaryRepoUrl && (
              <div className="flex items-center justify-between gap-6 py-3">
                <dt className="text-[var(--muted-foreground)]">
                  Secondary Repository
                </dt>
                <dd className="min-w-0">
                  <a
                    href={project.secondaryRepoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-1 font-medium text-[var(--foreground)] hover:underline"
                  >
                    <span className="truncate">
                      {project.secondaryRepoUrl.replace("https://", "")}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </dd>
              </div>
            )}

            {project.liveUrl && (
              <div className="flex items-center justify-between gap-6 py-3">
                <dt className="text-[var(--muted-foreground)]">Website</dt>
                <dd className="min-w-0">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-1 font-medium text-[var(--foreground)] hover:underline"
                  >
                    <span className="truncate">
                      {project.liveUrl.replace("https://", "")}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </dd>
              </div>
            )}

            {project.downloadUrl && (
              <div className="flex items-center justify-between gap-6 py-3">
                <dt className="text-[var(--muted-foreground)]">Android APK</dt>
                <dd className="min-w-0">
                  <a
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-1 font-medium text-[var(--foreground)] hover:underline"
                  >
                    <span className="truncate">Download Release Build</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </dd>
              </div>
            )}

            <div className="py-3">
              <dt className="text-[var(--muted-foreground)]">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border px-2.5 py-0.5 text-xs text-[var(--foreground)]"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        {/* SECTION 7: More Projects (Exact jmancheta.cloud style) */}
        <section className="mt-6 border-t pt-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
            More Projects
          </h2>
          <ul className="no-scrollbar -mx-5 flex snap-x gap-x-6 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
            {otherProjects.map((other) => (
              <li
                key={other.slug}
                className="w-[260px] shrink-0 snap-start sm:w-auto"
              >
                <Link
                  href={`/projects/${other.slug}`}
                  data-say={`Open ${other.name} →`}
                  className="group flex items-center gap-3 py-2.5"
                >
                  {other.iconUrl ? (
                    <span
                      style={{
                        width: 60,
                        height: 60,
                        background: other.iconBg,
                      }}
                      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[22%] border border-black/5 p-1.5 dark:border-white/10"
                    >
                      <img
                        src={other.iconUrl}
                        alt={other.name}
                        className="h-full w-full rounded-[16%] object-contain"
                      />
                    </span>
                  ) : (
                    <span
                      style={{
                        width: 60,
                        height: 60,
                        background: other.iconBg,
                      }}
                      className="flex shrink-0 items-center justify-center rounded-[22%] border border-black/5 text-base font-extrabold text-white"
                    >
                      {other.iconText}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-[var(--foreground)] group-hover:underline">
                      {other.name}
                    </span>
                    <span className="block truncate text-xs text-[var(--muted-foreground)]">
                      {other.tags.join(" · ")}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-[var(--foreground)] px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-[var(--background)] transition-opacity hover:opacity-85">
                    Open
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Full-Screen Zoom Lightbox Modal when clicking any Preview device */}
      {activeScreenIdx !== null && project.screens[activeScreenIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setActiveScreenIdx(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border bg-[var(--background)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between border-b px-5 py-3.5">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Preview {activeScreenIdx + 1} of {project.screens.length} ·{" "}
                  {project.screens[activeScreenIdx].badge}
                </span>
                <h3 className="truncate text-base font-bold text-[var(--foreground)]">
                  {project.screens[activeScreenIdx].title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={() =>
                    setActiveScreenIdx((prev) =>
                      prev === null
                        ? 0
                        : prev === 0
                        ? project.screens.length - 1
                        : prev - 1
                    )
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={() =>
                    setActiveScreenIdx((prev) =>
                      prev === null
                        ? 0
                        : prev === project.screens.length - 1
                        ? 0
                        : prev + 1
                    )
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setActiveScreenIdx(null)}
                  className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Body */}
            <div className="flex flex-col items-center justify-center overflow-y-auto bg-[var(--muted)]/50 p-5">
              {project.screens[activeScreenIdx].imageUrl && (
                <img
                  src={project.screens[activeScreenIdx].imageUrl}
                  alt={project.screens[activeScreenIdx].title}
                  className={`rounded-xl border border-black/15 shadow-2xl dark:border-white/15 ${
                    project.screens[activeScreenIdx].device === "phone"
                      ? "max-h-[68vh] w-auto rounded-[24px]"
                      : "max-h-[68vh] w-full object-contain"
                  }`}
                />
              )}
              <p className="mt-4 max-w-2xl text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
                {project.screens[activeScreenIdx].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
