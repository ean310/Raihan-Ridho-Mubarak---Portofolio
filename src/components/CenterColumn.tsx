"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  Medal,
  Sparkles,
  Trophy,
} from "lucide-react";
import { FeaturedSlide, PORTFOLIO_DATA } from "@/data/portfolio";

export function CenterColumn() {
  const { featuredSlides, projects } = PORTFOLIO_DATA;
  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const columnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo(0, 0);
    if (columnRef.current) {
      columnRef.current.scrollTop = 0;
    }
  }, []);

  const categories = ["All", "Mobile", "AI", "Web", "UI/UX"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === selectedCategory || p.tags.includes(selectedCategory)
        );

  const prevSlide = () => {
    setSlideIdx((prev) => (prev === 0 ? featuredSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIdx((prev) => (prev === featuredSlides.length - 1 ? 0 : prev + 1));
  };

  const renderBadgeIcon = (icon: FeaturedSlide["badgeIcon"], size = "h-3.5 w-3.5") => {
    switch (icon) {
      case "sparkles":
        return <Sparkles className={size} />;
      case "globe":
        return <Globe className={size} />;
      case "layers":
        return <Layers className={size} />;
      case "trophy":
        return <Trophy className={size} />;
      default:
        return <Medal className={size} />;
    }
  };

  const renderSlideVisual = (slide: FeaturedSlide) => {
    if (slide.visualType === "phones-fan") {
      const screens = slide.visualTheme.screens || [];
      const offsets = [
        { o: -1, a: 1, z: 9 },
        { o: 0, a: 0, z: 10 },
        { o: 1, a: 1, z: 9 },
      ];
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {offsets.map((cfg, idx) => {
            const scr = screens[idx] || screens[0];
            return (
              <div
                key={idx}
                style={
                  {
                    "--o": cfg.o,
                    "--a": cfg.a,
                    zIndex: cfg.z,
                  } as React.CSSProperties
                }
                className="absolute top-1/2 aspect-[9/20] w-[28%] max-w-[112px] overflow-hidden rounded-2xl border bg-[var(--background)] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:translateX(calc(var(--o)*74%))_translateY(calc(-45%_+_var(--a)*4px))_rotate(calc(var(--o)*8deg))] group-hover:[transform:translateX(calc(var(--o)*88%))_translateY(calc(-49%_+_var(--a)*4px))_rotate(calc(var(--o)*10deg))]"
              >
                {scr?.imageUrl ? (
                  <img
                    src={scr.imageUrl}
                    alt={scr.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full flex-col justify-between bg-gradient-to-b ${
                      scr?.color || "from-sky-600 to-slate-950"
                    } p-2.5 pt-6 text-white`}
                  >
                    <div>
                      <span className="inline-block rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
                        {scr?.stat}
                      </span>
                      <p className="mt-1.5 text-[11px] font-bold leading-tight">
                        {scr?.title}
                      </p>
                      <p className="mt-0.5 text-[8px] text-white/75">
                        {scr?.subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    if (slide.visualType === "macbook") {
      return (
        <div className="absolute inset-x-[9%] top-1/2 -translate-y-1/2 overflow-hidden rounded-xl border bg-[var(--background)] shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[54%] group-hover:scale-[1.03]">
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 text-white">
            {slide.visualTheme.imageUrl ? (
              <img
                src={slide.visualTheme.imageUrl}
                alt={slide.title}
                className="h-full w-full object-cover object-top"
              />
            ) : null}
          </div>
        </div>
      );
    }

    // Tilted Certificate Visual (exact jmancheta.cloud style with real certificate image)
    if (slide.visualTheme.certImageUrl) {
      return (
        <div className="absolute inset-x-[9%] top-1/2 -translate-y-1/2 -rotate-3 overflow-hidden rounded-md shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[54%] group-hover:rotate-0 group-hover:scale-[1.03]">
          <img
            src={slide.visualTheme.certImageUrl}
            alt={slide.title}
            className="h-auto w-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="absolute inset-x-[9%] top-1/2 -translate-y-1/2 -rotate-3 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-4 text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[53%] group-hover:rotate-0 group-hover:scale-[1.03]">
        <div
          style={{
            background: `radial-gradient(circle at 85% 15%, ${slide.visualTheme.accent}45, transparent 60%)`,
          }}
          className="
            pointer-events-none absolute inset-0"
        />
        <div className="relative z-10 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[9px] font-bold tracking-widest uppercase text-amber-400">
              {slide.visualTheme.label}
            </span>
            <Trophy className="h-4 w-4 text-amber-400" />
          </div>
          <div className="py-3">
            <p className="text-[9px] uppercase tracking-wider text-white/55">
              Presented to
            </p>
            <p className="mt-0.5 text-sm font-bold tracking-tight text-white">
              Raihan Ridho Mubarok
            </p>
            <p className="mt-1 text-[10px] font-medium text-white/75">
              {slide.visualTheme.sublabel}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[8px] text-white/55">
            <span>Verified Credential</span>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-300">
              Distinction / Expert
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={columnRef}
      className="relative no-scrollbar min-w-0 lg:h-screen lg:overflow-y-auto lg:overscroll-contain"
    >
      {/* Featured Carousel Section */}
      <section data-tour="featured" className="px-5 pt-8 lg:pt-20">
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
              Featured
              <span className="ml-2 font-normal tabular-nums normal-case tracking-normal">
                {slideIdx + 1}/{featuredSlides.length}
              </span>
            </h2>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous featured slide"
                data-say="← Previous"
                onClick={prevSlide}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next featured slide"
                data-say="Next →"
                onClick={nextSlide}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Slide Viewport */}
          <div className="overflow-hidden">
            {(() => {
              const currentSlide = featuredSlides[slideIdx];
              const cardContent = (
                <>
                  {/* Visual Column */}
                  <div className="relative h-60 overflow-hidden bg-[var(--muted)] sm:h-full">
                    {renderSlideVisual(currentSlide)}
                    <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border bg-[var(--background)] px-2.5 py-1 text-[11px] font-semibold text-[var(--foreground)] shadow-sm">
                      {renderBadgeIcon(currentSlide.badgeIcon, "h-3.5 w-3.5")}
                      {currentSlide.badge}
                    </span>
                  </div>

                  {/* Info Column */}
                  <div className="flex h-full flex-col p-5">
                    <div className="flex items-center gap-3">
                      {currentSlide.iconUrl ? (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[22%] border bg-white p-1 shadow-sm">
                          <img
                            src={currentSlide.iconUrl}
                            alt={currentSlide.title}
                            className="h-full w-full rounded-[16%] object-contain"
                          />
                        </span>
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[22%] border bg-[var(--muted)] text-[var(--foreground)]">
                          {renderBadgeIcon(currentSlide.badgeIcon, "h-5 w-5")}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-lg font-bold tracking-tight text-[var(--foreground)]">
                          {currentSlide.title}
                        </p>
                        <p className="truncate text-xs text-[var(--muted-foreground)]">
                          {currentSlide.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-3 min-h-[60px] text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {currentSlide.description}
                    </p>

                    <dl className="mt-4 grid grid-cols-3 gap-2">
                      {currentSlide.stats.map((st) => (
                        <div key={st.label}>
                          <dt className="sr-only">{st.label}</dt>
                          <dd className="text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-xl">
                            {st.value}
                          </dd>
                          <dd className="line-clamp-2 min-h-[28px] text-[11px] leading-tight text-[var(--muted-foreground)]">
                            {st.label}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--foreground)]">
                      {currentSlide.ctaLabel}
                      {currentSlide.external ? (
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      ) : (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                  </div>
                </>
              );

              return currentSlide.external ? (
                <a
                  key={currentSlide.id}
                  href={currentSlide.href}
                  target="_blank"
                  rel="noreferrer"
                  data-say={currentSlide.say}
                  className="group grid overflow-hidden rounded-2xl border transition-colors hover:bg-[var(--accent)] sm:h-[304px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                >
                  {cardContent}
                </a>
              ) : (
                <Link
                  key={currentSlide.id}
                  href={currentSlide.href}
                  data-say={currentSlide.say}
                  className="group grid overflow-hidden rounded-2xl border transition-colors hover:bg-[var(--accent)] sm:h-[304px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
                >
                  {cardContent}
                </Link>
              );
            })()}
          </div>

          {/* Slide Dots */}
          <div className="mt-3 flex justify-center gap-1.5">
            {featuredSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setSlideIdx(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === slideIdx
                    ? "w-5 bg-[var(--foreground)]"
                    : "w-1.5 bg-[var(--muted-foreground)]/35 hover:bg-[var(--muted-foreground)]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects List Section */}
      <section
        id="projects"
        className="mx-auto w-full max-w-2xl scroll-mt-6 py-8 lg:max-w-none lg:px-5 lg:pt-10 lg:pb-24"
      >
        <div
          data-tour="projects"
          className="mb-3 flex items-center justify-between gap-2 px-5"
        >
          <div className="flex items-baseline gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
              Projects
            </h2>
            <span className="text-[11px] text-[var(--muted-foreground)]">
              {filteredProjects.length}
            </span>
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-say="Filter by category"
              onClick={() => setFilterDropdownOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
            >
              {selectedCategory}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {filterDropdownOpen && (
              <div className="absolute right-0 top-full z-30 mt-1.5 w-36 overflow-hidden rounded-xl border bg-[var(--background)] p-1 shadow-xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setFilterDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "text-[var(--foreground)] hover:bg-[var(--accent)]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-70">
                      {cat === "All"
                        ? projects.length
                        : projects.filter(
                            (p) => p.category === cat || p.tags.includes(cat)
                          ).length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col lg:gap-1">
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-say={`Open ${project.name} case study →`}
              className="group flex w-full items-start gap-3.5 rounded-xl px-5 py-3.5 text-left transition-colors hover:bg-[var(--accent)]"
            >
              {/* App Store Squircle Icon */}
              {project.iconUrl ? (
                <span
                  style={{
                    width: 46,
                    height: 46,
                    background: project.iconBg,
                  }}
                  className="mt-0.5 flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/10 p-1 shadow-sm grayscale-[35%] transition duration-300 group-hover:scale-105 group-hover:grayscale-0 dark:border-white/10"
                >
                  <img
                    src={project.iconUrl}
                    alt={project.name}
                    className="h-full w-full rounded-lg object-contain"
                  />
                </span>
              ) : (
                <span
                  style={{
                    width: 46,
                    height: 46,
                    background: project.iconBg,
                  }}
                  className="mt-0.5 flex shrink-0 items-center justify-center rounded-xl border border-white/10 text-sm font-extrabold tracking-tight text-white shadow-sm grayscale-[40%] transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                >
                  {project.iconText}
                </span>
              )}

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-[15px] font-semibold text-[var(--foreground)]">
                    {project.name}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[var(--muted-foreground)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]" />
                  <span className="ml-auto shrink-0 rounded-full border bg-[var(--muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--muted-foreground)]">
                    {project.year}
                  </span>
                </span>

                {/* Category & Tech Pills */}
                <span className="mt-1 flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-2 py-0.5 text-[10px] leading-4 text-[var(--muted-foreground)]"
                    >
                      {tag}
                    </span>
                  ))}
                </span>

                <span className="mt-1.5 line-clamp-2 block text-[13px] leading-relaxed text-[var(--muted-foreground)]">
                  {project.shortDescription}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

