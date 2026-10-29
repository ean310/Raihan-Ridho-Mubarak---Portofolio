"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Compass,
  Headphones,
  Moon,
  Pause,
  Play,
  Sparkles,
  Sun,
  Volume2,
  X,
} from "lucide-react";

const TOUR_STEPS = [
  {
    selector: '[data-tour="profile"]',
    title: "1. Meet Raihan 👋",
    description:
      "Informatics graduate (3.81 GPA) & Bangkit Distinction Graduate specializing in Flutter, Kotlin/Jetpack Compose, and modern Frontend.",
  },
  {
    selector: '[data-tour="highlights"]',
    title: "2. Story Highlights ✨",
    description:
      "Tap any bubble (About, Stack, Now, Contact) to open an Instagram-style interactive story viewer.",
  },
  {
    selector: '[data-tour="experience"]',
    title: "3. Professional Journey 💼",
    description:
      "Explore Raihan's work across Pemerintah Kalurahan Gilangharjo, PT. Murgung (ConstMG), Bangkit Academy, and UAD.",
  },
  {
    selector: '[data-tour="featured"]',
    title: "4. Featured Showcase 🏆",
    description:
      "Swipe or click through 3D device mockups of WizzMate AI, Gilangharjo Portal, ConstMG, and certifications.",
  },
  {
    selector: '[data-tour="projects"]',
    title: "5. App Store Case Studies 📱",
    description:
      "Filter projects by category or click any project to open its full App Store-style detail page.",
  },
  {
    selector: '[data-tour="github"]',
    title: "6. GitHub Activity & Stack 🧰",
    description:
      "Check out @ean310's contribution matrix and the 26+ tools & technologies powering these projects.",
  },
];

export function InteractiveShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [splashKey, setSplashKey] = useState(0);
  const [railCollapsed, setRailCollapsed] = useState(false);

  // Cursor tooltip state for [data-say]
  const [cursorSay, setCursorSay] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Ambient coding beats state
  const [musicOpen, setMusicOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Guided tour state
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [tourRect, setTourRect] = useState<DOMRect | null>(null);

  const tracks = [
    {
      title: "Midnight Flutter Flow",
      artist: "Lo-Fi Study Synth · 78 BPM",
      chords: [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0], // Am7
        [174.61, 220.0, 261.63, 349.23], // Fmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
      ],
    },
    {
      title: "Kotlin Compose Dreams",
      artist: "Ambient Chillwave · 72 BPM",
      chords: [
        [293.66, 349.23, 440.0, 523.25], // Dm7
        [196.0, 246.94, 293.66, 349.23], // G7
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 415.3], // A7sus
      ],
    },
  ];

  // Theme initialization & MacBook "hello" splash lifecycle
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = saved || "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.style.colorScheme = initial;
  }, []);

  useEffect(() => {
    if (!showSplash) return;
    const htmlEl = document.documentElement;
    const prevOverflow = htmlEl.style.overflow;
    htmlEl.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(() => setSplashFading(true), 3350);
    const hideTimer = window.setTimeout(() => {
      setShowSplash(false);
      setSplashFading(false);
    }, 3950);

    return () => {
      htmlEl.style.overflow = prevOverflow;
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [showSplash, splashKey]);

  const triggerHelloSplash = () => {
    setSplashFading(false);
    setSplashKey((k) => k + 1);
    setShowSplash(true);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
  };

  // Cursor follower for [data-say]
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const sayEl = target?.closest?.("[data-say]") as HTMLElement | null;
      if (sayEl) {
        setCursorSay(sayEl.getAttribute("data-say"));
      } else {
        setCursorSay(null);
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Background Canvas Dots & Meteor Streaks
  const dotsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const streaksCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const dotsCanvas = dotsCanvasRef.current;
    const streaksCanvas = streaksCanvasRef.current;
    if (!dotsCanvas || !streaksCanvas) return;

    const dCtx = dotsCanvas.getContext("2d");
    const sCtx = streaksCanvas.getContext("2d");
    if (!dCtx || !sCtx) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const drawDots = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      dotsCanvas.width = width * dpr;
      dotsCanvas.height = height * dpr;
      dotsCanvas.style.width = `${width}px`;
      dotsCanvas.style.height = `${height}px`;
      dCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      streaksCanvas.width = width * dpr;
      streaksCanvas.height = height * dpr;
      streaksCanvas.style.width = `${width}px`;
      streaksCanvas.style.height = `${height}px`;
      sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dCtx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      dCtx.fillStyle = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.16)";
      const gap = 22;
      for (let x = 12; x < width; x += gap) {
        for (let y = 12; y < height; y += gap) {
          dCtx.beginPath();
          dCtx.arc(x, y, 1, 0, Math.PI * 2);
          dCtx.fill();
        }
      }
    };

    drawDots();
    window.addEventListener("resize", drawDots);

    interface Streak {
      x: number;
      y: number;
      len: number;
      speed: number;
      opacity: number;
    }

    const streaks: Streak[] = Array.from({ length: 4 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 70 + Math.random() * 60,
      speed: 1.5 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.25,
    }));

    const renderStreaks = () => {
      sCtx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = isDark ? "255, 255, 255" : "15, 15, 15";

      for (const st of streaks) {
        st.x += st.speed;
        st.y += st.speed * 0.55;
        if (st.x > width + 150 || st.y > height + 150) {
          st.x = Math.random() * width * 0.7 - 120;
          st.y = -60;
        }
        const grad = sCtx.createLinearGradient(
          st.x,
          st.y,
          st.x - st.len,
          st.y - st.len * 0.55
        );
        grad.addColorStop(0, `rgba(${baseColor}, ${st.opacity})`);
        grad.addColorStop(1, `rgba(${baseColor}, 0)`);
        sCtx.strokeStyle = grad;
        sCtx.lineWidth = 1.2;
        sCtx.beginPath();
        sCtx.moveTo(st.x, st.y);
        sCtx.lineTo(st.x - st.len, st.y - st.len * 0.55);
        sCtx.stroke();
      }
      animId = requestAnimationFrame(renderStreaks);
    };

    animId = requestAnimationFrame(renderStreaks);

    return () => {
      window.removeEventListener("resize", drawDots);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  // Web Audio API Lo-Fi Synth Player
  const stopAudio = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const startAudio = (idx = trackIndex) => {
    stopAudio();
    try {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      let step = 0;
      const playChord = () => {
        const chord = tracks[idx].chords[step % tracks[idx].chords.length];
        step++;
        const now = ctx.currentTime;
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = i % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.025, now + 0.35);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 2.25);
        });
      };

      playChord();
      intervalRef.current = window.setInterval(playChord, 2300);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  // Guided Tour positioning
  useEffect(() => {
    if (tourStep === null) {
      setTourRect(null);
      return;
    }
    const step = TOUR_STEPS[tourStep];
    if (!step) return;
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const updateRect = () => {
        setTourRect(el.getBoundingClientRect());
      };
      updateRect();
      const t = window.setTimeout(updateRect, 350);
      window.addEventListener("resize", updateRect);
      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", updateRect);
      };
    }
  }, [tourStep]);

  return (
    <>
      {/* Background Dots, Streaks & Grain */}
      <div aria-hidden="true" className="page-bg">
        <div className="page-bg-dots">
          <canvas ref={dotsCanvasRef} className="absolute left-0 top-0" />
        </div>
        <div className="page-bg-streaks">
          <canvas ref={streaksCanvasRef} className="absolute left-0 top-0" />
        </div>
      </div>

      {/* Main Content */}
      {children}

      {/* Desktop Cursor Tooltip for [data-say] */}
      {cursorSay && (
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${cursorPos.x + 16}px, ${cursorPos.y + 16}px, 0)`,
          }}
          className="pointer-events-none fixed left-0 top-0 z-[120] hidden rounded-full border bg-[var(--background)]/95 px-3 py-1 text-xs font-medium text-[var(--foreground)] shadow-lg backdrop-blur-md transition-opacity duration-150 lg:block"
        >
          {cursorSay}
        </div>
      )}

      {/* Guided Tour Overlay */}
      {tourStep !== null && TOUR_STEPS[tourStep] && (
        <div className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-[2px] transition-opacity">
          {tourRect && (
            <div
              style={{
                top: Math.max(8, tourRect.top - 8),
                left: Math.max(8, tourRect.left - 8),
                width: tourRect.width + 16,
                height: tourRect.height + 16,
              }}
              className="pointer-events-none fixed rounded-2xl border-2 border-sky-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.55)] transition-all duration-300"
            />
          )}
          <div className="fixed bottom-6 left-1/2 z-[160] w-[min(92vw,400px)] -translate-x-1/2 rounded-2xl border bg-[var(--background)] p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full border bg-[var(--muted)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--foreground)]">
                Step {tourStep + 1} of {TOUR_STEPS.length}
              </span>
              <button
                type="button"
                onClick={() => setTourStep(null)}
                className="rounded-full p-1 text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                aria-label="Close tour"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-2.5 text-base font-bold text-[var(--foreground)]">
              {TOUR_STEPS[tourStep].title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
              {TOUR_STEPS[tourStep].description}
            </p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={tourStep === 0}
                onClick={() => setTourStep((s) => (s !== null && s > 0 ? s - 1 : 0))}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)] disabled:opacity-40"
              >
                ← Previous
              </button>
              {tourStep < TOUR_STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setTourStep((s) => (s !== null ? s + 1 : 0))}
                  className="rounded-lg bg-[var(--foreground)] px-4 py-1.5 text-xs font-semibold text-[var(--background)] transition-opacity hover:opacity-90"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setTourStep(null)}
                  className="rounded-lg bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Finish Tour ✨
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Quick-Actions Rail (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        {/* Ambient Coding Music Mini-Player Popover */}
        {musicOpen && (
          <div className="mb-1 w-72 rounded-2xl border bg-[var(--background)]/95 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <Volume2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[var(--foreground)]">
                    Coding Beats Radio 🎧
                  </p>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    Web Audio Lo-Fi Synth
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMusicOpen(false)}
                className="rounded-full p-1 text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-3 rounded-xl border bg-[var(--muted)] p-3">
              <p className="truncate text-xs font-semibold text-[var(--foreground)]">
                {tracks[trackIndex].title}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-[var(--muted-foreground)]">
                {tracks[trackIndex].artist}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isPlaying) {
                      stopAudio();
                    } else {
                      startAudio(trackIndex);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--foreground)] px-3 py-1.5 text-xs font-semibold text-[var(--background)] transition-opacity hover:opacity-90"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" /> Play
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = (trackIndex + 1) % tracks.length;
                    setTrackIndex(nextIdx);
                    if (isPlaying) startAudio(nextIdx);
                  }}
                  className="rounded-lg border bg-[var(--background)] px-2.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--accent)]"
                >
                  Switch Track ↻
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          {/* Collapse / Expand toggle */}
          <div className="group relative">
            <button
              type="button"
              data-say={railCollapsed ? "Show quick actions" : "Hide quick actions"}
              onClick={() => setRailCollapsed((c) => !c)}
              aria-label={railCollapsed ? "Expand quick actions" : "Collapse quick actions"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-[var(--background)] text-[var(--muted-foreground)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
            >
              {railCollapsed ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {!railCollapsed && (
            <div className="flex flex-col items-center gap-2">
              {/* Guided Tour Button */}
              <div className="group relative">
                <button
                  type="button"
                  data-say="Take a guided tour 🧭"
                  onClick={() => setTourStep(0)}
                  aria-label="Take a guided tour"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-[var(--background)] text-[var(--foreground)] shadow-lg transition-colors hover:bg-[var(--accent)]"
                >
                  <Compass className="h-5 w-5" />
                </button>
              </div>

              {/* Replay Hello Splash Button */}
              <div className="group relative">
                <button
                  type="button"
                  data-say="Replay 'hello' intro ✨"
                  onClick={triggerHelloSplash}
                  aria-label="Replay hello intro"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-[var(--background)] text-[var(--foreground)] shadow-lg transition-colors hover:bg-[var(--accent)]"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>

              {/* Playlist / Lo-Fi Beats Button */}
              <div className="group relative">
                <button
                  type="button"
                  data-say="Play coding beats 🎧"
                  onClick={() => setMusicOpen((o) => !o)}
                  aria-label="Play my playlist"
                  className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border bg-[var(--background)] shadow-lg transition-colors hover:bg-[var(--accent)] ${
                    isPlaying ? "border-emerald-500 text-emerald-500" : "text-[var(--foreground)]"
                  }`}
                >
                  <Headphones className="h-5 w-5" />
                  {isPlaying && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                    </span>
                  )}
                </button>
              </div>

              {/* Theme Toggle Button */}
              <button
                type="button"
                data-tour="theme"
                data-say={theme === "dark" ? "Lights on? ☀️" : "Lights off? 🌙"}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-[var(--background)] text-[var(--foreground)] shadow-lg transition-colors hover:bg-[var(--accent)]"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MacBook-Style Cursive "hello" First-Boot Splash Screen */}
      {showSplash && (
        <div
          key={splashKey}
          aria-hidden="true"
          onClick={() => setShowSplash(false)}
          className={`fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-[var(--background)] text-[var(--foreground)] transition-opacity duration-600 ease-in-out ${
            splashFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg
            className={`w-[min(60vw,411px)] overflow-visible transition-transform duration-600 ease-in-out ${
              splashFading ? "scale-[1.06]" : "scale-100"
            }`}
            viewBox="0 0 1230.94 414.57"
            fill="none"
            stroke="currentColor"
            strokeWidth="34"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g transform="translate(311.08 476.02)">
              <path
                className="hello-stroke-1"
                d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-38.5,260-44.11,322.48"
              />
              <path
                className="hello-stroke-2"
                d="M-179.66-85.83c8.11-54.76,34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31"
              />
            </g>
          </svg>
        </div>
      )}
    </>
  );
}

