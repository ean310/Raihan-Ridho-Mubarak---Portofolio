"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, GitBranch, RefreshCw, Star } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0..4
}

export function RightSidebar() {
  const { profile, toolCategories } = PORTFOLIO_DATA;

  const [selectedYear, setSelectedYear] = useState<string>("last");
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalsByYear, setTotalsByYear] = useState<Record<string, number>>({});
  const [loadingGh, setLoadingGh] = useState<boolean>(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Drag-to-scroll ref for the 53-week horizontal dot matrix
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const fetchRealContributions = useCallback(
    async (yearParam: string) => {
      setLoadingGh(true);
      try {
        const res = await fetch(
          `/api/github?username=${encodeURIComponent(
            profile.githubUsername
          )}&year=${encodeURIComponent(yearParam)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Server route failed");
        const data = await res.json();
        if (Array.isArray(data.contributions)) {
          setContributions(data.contributions);
          setTotalContributions(data.total ?? 0);
          if (data.totalsByYear) {
            setTotalsByYear(data.totalsByYear);
          }
          setLoadingGh(false);
          return;
        }
      } catch {
        // Fallback direct fetch from jogruber GitHub Contributions API
        try {
          const directRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
              profile.githubUsername
            )}?y=${encodeURIComponent(yearParam)}`
          );
          const directData = await directRes.json();
          if (Array.isArray(directData.contributions)) {
            setContributions(directData.contributions);
            const tMap = directData.total || {};
            const totalVal =
              typeof tMap[yearParam] === "number"
                ? tMap[yearParam]
                : typeof tMap.lastYear === "number"
                ? tMap.lastYear
                : directData.contributions.reduce(
                    (acc: number, d: ContributionDay) => acc + (d.count || 0),
                    0
                  );
            setTotalContributions(totalVal);
          }
        } catch {
          // ignore
        }
      }
      setLoadingGh(false);
    },
    [profile.githubUsername]
  );

  useEffect(() => {
    fetchRealContributions(selectedYear);
  }, [selectedYear, fetchRealContributions]);

  // Group flat daily contributions into 7-day columns (Sunday..Saturday) like GitHub's calendar graph
  const weeks = useMemo(() => {
    if (!contributions.length) return [];
    const cols: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // Pad first week if it doesn't start on Sunday (0)
    const firstDate = new Date(`${contributions[0].date}T00:00:00`);
    const firstDayOfWeek = firstDate.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      cols.push(currentWeek);
    }
    return cols;
  }, [contributions]);

  const formatDateReadable = (isoDate: string) => {
    try {
      const dt = new Date(`${isoDate}T00:00:00`);
      return dt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoDate;
    }
  };

  const getDotSizePx = (day: ContributionDay) => {
    if (day.count <= 0 || day.level === 0) return 3;
    if (day.level === 1) return 5;
    if (day.level === 2) return 6.5;
    if (day.level === 3) return 8;
    return 9.5;
  };

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  const totalToolsCount = useMemo(() => {
    return toolCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [toolCategories]);

  const availableYears = useMemo(() => {
    const yrs = Object.keys(totalsByYear)
      .filter((k) => /^\d{4}$/.test(k))
      .sort((a, b) => Number(b) - Number(a));
    return ["last", ...(yrs.length ? yrs : ["2026", "2025", "2024", "2023"])];
  }, [totalsByYear]);

  const pinnedRepos = [
    {
      name: "Iq11k/Capstone-WizzMate",
      desc: "AI Travel Companion for Indonesian Tourism (Kotlin, TFLite, Maps API)",
      lang: "Kotlin",
      langColor: "#7F52FF",
      href: "https://github.com/Iq11k/Capstone-WizzMate",
    },
    {
      name: "ConstMg/FrontEnd-ConstMG",
      desc: "Construction Project Management & Tracking Platform for PT. Murgung",
      lang: "JavaScript",
      langColor: "#F7DF1E",
      href: "https://github.com/ConstMg",
    },
    {
      name: "ean310/StoryApp",
      desc: "Geotagged Story Sharing App with Kotlin, Paging 3, Room & Maps SDK",
      lang: "Kotlin",
      langColor: "#7F52FF",
      href: "https://github.com/ean310/StoryApp",
    },
    {
      name: "ean310/a195-flutter-fundamental-labs",
      desc: "Multi-Platform Flutter Clean Architecture, BLoC, Riverpod & TDD Labs",
      lang: "Dart",
      langColor: "#0175C2",
      href: "https://github.com/ean310/a195-flutter-fundamental-labs",
    },
  ];

  return (
    <aside className="relative no-scrollbar lg:h-screen lg:overflow-y-auto lg:overscroll-contain lg:border-l lg:pb-24">
      {/* Live Synchronized GitHub Contributions Section */}
      <section
        data-tour="github"
        className="mx-auto w-full max-w-2xl px-5 py-8 lg:max-w-none lg:px-6 lg:pt-20"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
              GitHub
            </h2>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-say={`Synced live with @${profile.githubUsername} ↗`}
              className="inline-flex items-center gap-1 rounded-full border bg-[var(--muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--foreground)] transition-opacity hover:opacity-80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00c853]" />@
              {profile.githubUsername}
              <ArrowUpRight className="h-2.5 w-2.5" />
            </a>
          </div>

          <button
            type="button"
            data-say="Refresh live GitHub data ↻"
            onClick={() => fetchRealContributions(selectedYear)}
            aria-label="Refresh GitHub contributions"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-[var(--muted-foreground)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
          >
            <RefreshCw
              className={`h-3 w-3 ${loadingGh ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {/* Year Filter Pills */}
        <div className="mb-3 flex gap-1 overflow-x-auto pb-0.5 no-scrollbar">
          {availableYears.map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setSelectedYear(yr)}
              data-say={
                yr === "last"
                  ? "Show rolling last 12 months"
                  : `Show ${yr} contributions`
              }
              className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${
                selectedYear === yr
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              }`}
            >
              {yr === "last" ? "Last year" : yr}
            </button>
          ))}
        </div>

        {/* Exact jmancheta.cloud Dot-Matrix Graph (dir="rtl" auto-scrolls to newest week on the right) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={() => {
            stopDragging();
            setHoveredDay(null);
          }}
          data-say="Drag me ↔ or hover a dot"
          dir="rtl"
          className="cursor-grab select-none active:cursor-grabbing no-scrollbar overflow-x-auto pb-1"
        >
          <div dir="ltr" className="flex w-max gap-[2px]">
            {loadingGh && weeks.length === 0
              ? Array.from({ length: 52 }).map((_, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[2px]">
                    {Array.from({ length: 7 }).map((__, dIdx) => (
                      <span
                        key={dIdx}
                        className="flex items-center justify-center"
                        style={{ width: 14, height: 14 }}
                      >
                        <span
                          className="rounded-full animate-pulse"
                          style={{
                            width: 3,
                            height: 3,
                            backgroundColor:
                              "color-mix(in srgb, var(--muted-foreground) 35%, transparent)",
                          }}
                        />
                      </span>
                    ))}
                  </div>
                ))
              : weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[2px]">
                    {week.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <span
                            key={`empty-${wIdx}-${dIdx}`}
                            style={{ width: 14, height: 14 }}
                          />
                        );
                      }
                      const dotSize = getDotSizePx(day);
                      const readableDate = formatDateReadable(day.date);
                      const label =
                        day.count === 0
                          ? `No contributions on ${readableDate}`
                          : `${day.count} contribution${
                              day.count > 1 ? "s" : ""
                            } on ${readableDate}`;
                      return (
                        <span
                          key={day.date}
                          data-say={label}
                          onMouseEnter={() => setHoveredDay(day)}
                          className="group/dot flex items-center justify-center"
                          style={{ width: 14, height: 14 }}
                        >
                          <span
                            className="rounded-full transition-transform duration-150 group-hover/dot:scale-125"
                            style={{
                              width: `${dotSize}px`,
                              height: `${dotSize}px`,
                              backgroundColor:
                                day.count > 0
                                  ? "var(--foreground)"
                                  : "color-mix(in srgb, var(--muted-foreground) 35%, transparent)",
                            }}
                          />
                        </span>
                      );
                    })}
                  </div>
                ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-[var(--muted-foreground)]">
          {hoveredDay ? (
            <span className="font-medium text-[var(--foreground)]">
              {hoveredDay.count === 0
                ? `No contributions on ${formatDateReadable(hoveredDay.date)}`
                : `${hoveredDay.count} contribution${
                    hoveredDay.count > 1 ? "s" : ""
                  } on ${formatDateReadable(hoveredDay.date)}`}
            </span>
          ) : (
            <>
              <span className="font-semibold text-[var(--foreground)]">
                {totalContributions}
              </span>{" "}
              contributions in{" "}
              {selectedYear === "last" ? "the last year" : selectedYear}
            </>
          )}
        </p>

        {/* Highlighted Repositories */}
        <div className="mt-4 grid grid-cols-1 gap-2">
          {pinnedRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.href}
              target="_blank"
              rel="noreferrer"
              data-say={`Open ${repo.name} on GitHub ↗`}
              className="group flex flex-col rounded-xl border bg-[var(--background)]/60 p-3 transition-colors hover:bg-[var(--accent)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 truncate text-xs font-semibold text-[var(--foreground)]">
                  <GitBranch className="h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)]" />
                  <span className="truncate">{repo.name}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]" />
              </div>
              <p className="mt-1 line-clamp-1 text-[11px] text-[var(--muted-foreground)]">
                {repo.desc}
              </p>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-[var(--muted-foreground)]">
                <span className="inline-flex items-center gap-1">
                  <span
                    style={{ backgroundColor: repo.langColor }}
                    className="h-2 w-2 rounded-full"
                  />
                  {repo.lang}
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <Star className="h-2.5 w-2.5" /> Featured
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section
        data-tour="tools"
        className="mx-auto w-full max-w-2xl px-5 pb-10 pt-2 lg:max-w-none lg:px-6 lg:pt-0"
      >
        <div className="mb-4 flex items-baseline gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            Tools &amp; Technologies
          </h2>
          <span className="text-[11px] text-[var(--muted-foreground)]">
            {totalToolsCount}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {toolCategories.map((category) => (
            <div key={category.name}>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[var(--muted-foreground)]">
                {category.name}
                <span
                  className="h-px flex-1 bg-[var(--border)]"
                  aria-hidden="true"
                />
                <span className="tabular-nums">{category.items.length}</span>
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    data-say={`I use ${item.name}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border bg-[var(--background)] py-1 pl-1.5 pr-2.5 transition-colors hover:bg-[var(--accent)]"
                  >
                    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                      <img
                        alt=""
                        loading="lazy"
                        src={
                          item.iconUrl ||
                          `https://cdn.simpleicons.org/${item.iconSlug}`
                        }
                        className={`h-3.5 w-3.5 object-contain opacity-80 transition duration-300 group-hover:opacity-100 ${
                          item.invertDark
                            ? "dark:invert"
                            : "grayscale group-hover:grayscale-0"
                        }`}
                      />
                    </span>
                    <span className="text-xs text-[var(--foreground)]">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
