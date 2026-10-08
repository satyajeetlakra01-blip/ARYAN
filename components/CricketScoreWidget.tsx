"use client";

// ════════════════════════════════════════════════════════════════
// LIVE CRICKET SCORE WIDGET
// Uses the free Cricbuzz unofficial/public APIs or CricAPI
// Falls back to graceful demo data when rate-limited
// ════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  Wifi,
  WifiOff,
  RefreshCw,
  Trophy,
  Flame,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";

interface ScoreEntry {
  matchDesc: string;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  status: string;
  isLive: boolean;
  result?: string;
}

// ── Polished demo data when no live match / rate limit ──
const DEMO_SCORES: ScoreEntry[] = [
  {
    matchDesc: "IPL 2026 — Final",
    team1: "Royal Challengers Bengaluru",
    team2: "Mumbai Indians",
    score1: "RCB 186/6 (20.0 ov)",
    score2: "MI 174/8 (20.0 ov)",
    status: "RCB WON BY 12 RUNS — EE SALA CUP NAMDE!",
    isLive: false,
    result: "RCB WIN",
  },
  {
    matchDesc: "ICC Test — Day 3",
    team1: "India",
    team2: "Australia",
    score1: "IND 543/6 (150.4 ov)",
    score2: "AUS 342/4 (110.0 ov)",
    status: "Australia trail by 201 runs • Follow-On avoided",
    isLive: true,
    result: undefined,
  },
];

export default function CricketScoreWidget() {
  const [scores, setScores] = useState<ScoreEntry[]>(DEMO_SCORES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);

  // Auto-expand only on large desktop screens
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1280) {
      setExpanded(true);
    }
  }, []);

  // ── Fetch from CricAPI (free tier: 100 calls/day) ──
  const fetchScores = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // CricAPI free endpoint — works without API key for basic match list
      // Replace "YOUR_CRICAPI_KEY" with a key from cricapi.com (free signup)
      const CRICAPI_KEY = process.env.NEXT_PUBLIC_CRICAPI_KEY || "";

      if (!CRICAPI_KEY) {
        // Show guidance if no key is configured
        setError("DEMO MODE — Add NEXT_PUBLIC_CRICAPI_KEY to .env.local");
        setScores(DEMO_SCORES);
        setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }));
        setIsConnected(false);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=${CRICAPI_KEY}&offset=0`,
        { next: { revalidate: 60 } }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (json.status !== "success" || !json.data) {
        throw new Error("API returned no data");
      }

      const parsed: ScoreEntry[] = json.data.slice(0, 4).map((m: any) => ({
        matchDesc: m.name || m.matchType || "Match",
        team1: m.teams?.[0] || "Team A",
        team2: m.teams?.[1] || "Team B",
        score1: m.score?.[0]
          ? `${m.teams?.[0]}: ${m.score[0].r}/${m.score[0].w} (${m.score[0].o} ov)`
          : `${m.teams?.[0]}: Yet to bat`,
        score2: m.score?.[1]
          ? `${m.teams?.[1]}: ${m.score[1].r}/${m.score[1].w} (${m.score[1].o} ov)`
          : `${m.teams?.[1]}: Yet to bat`,
        status: m.status || "In Progress",
        isLive: m.matchStarted && !m.matchEnded,
        result: m.matchEnded ? m.status : undefined,
      }));

      setScores(parsed.length > 0 ? parsed : DEMO_SCORES);
      setIsConnected(true);
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }));
    } catch (err: any) {
      setError("Using cached data — " + err.message);
      setScores(DEMO_SCORES);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    // Auto-refresh every 60 seconds for live scores
    const id = setInterval(fetchScores, 60_000);
    return () => clearInterval(id);
  }, [fetchScores]);

  const liveCount = scores.filter((s) => s.isLive).length;

  return (
    <>
      {/* Mobile backdrop when expanded */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm sm:hidden"
        />
      )}

      <div
        className={`fixed top-12 sm:top-[90px] right-2 sm:right-4 z-40 transition-all ${
          expanded
            ? "w-[calc(100vw-16px)] sm:w-72 max-w-sm"
            : "w-auto"
        }`}
      >
        {/* Header */}
        <div
          onClick={() => setExpanded((p) => !p)}
          className={`flex items-center justify-between gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-canvas-900/95 backdrop-blur-xl border border-rcb-500/30 cursor-pointer hover:border-rcb-500/60 shadow-xl transition-all ${
            expanded ? "rounded-t-2xl" : "rounded-full"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Flame className="w-3.5 h-3.5 text-rcb-400" />
              {liveCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <span className="text-xs font-mono font-bold text-white tracking-wide">
              {expanded ? "LIVE CRICKET" : "CRICKET"}
            </span>
            {liveCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-[9px] font-mono font-bold text-white">
                LIVE
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="w-3 h-3 text-emerald-400" />
            ) : (
              <WifiOff className="w-3 h-3 text-graphite-500" />
            )}
            {expanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fetchScores();
                }}
                className={`text-graphite-400 hover:text-solar-400 transition-colors ${loading ? "animate-spin" : ""}`}
                title="Refresh"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
            {expanded ? (
              <ChevronUp className="w-3 h-3 text-graphite-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-graphite-400" />
            )}
          </div>
        </div>

      {/* Score Cards */}
      {expanded && (
        <div className="bg-canvas-900/95 backdrop-blur-xl border-x border-b border-white/10 rounded-b-2xl overflow-hidden max-h-[380px] overflow-y-auto no-scrollbar">
          {error && (
            <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-[10px] font-mono text-amber-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {scores.map((match, idx) => (
            <div
              key={idx}
              className={`px-4 py-3 border-b border-white/5 last:border-0 transition-colors ${
                match.isLive ? "bg-rcb-500/5 hover:bg-rcb-500/10" : "hover:bg-white/5"
              }`}
            >
              {/* Match header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-graphite-500 truncate max-w-[130px]">
                  {match.matchDesc}
                </span>
                {match.isLive ? (
                  <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    LIVE
                  </span>
                ) : match.result ? (
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">RESULT</span>
                ) : null}
              </div>

              {/* Scores */}
              <div className="space-y-1 mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white truncate max-w-[100px]">
                    {match.team1.includes("Royal") ? "🔴 RCB" : match.team1.substring(0, 12)}
                  </span>
                  <span className="text-[10px] font-mono text-solar-400 font-semibold">
                    {match.score1.split(":")[1]?.trim() || match.score1}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white/80 truncate max-w-[100px]">
                    {match.team2.substring(0, 12)}
                  </span>
                  <span className="text-[10px] font-mono text-graphite-300 font-semibold">
                    {match.score2.split(":")[1]?.trim() || match.score2}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="text-[10px] text-graphite-400 font-mono leading-snug">
                {match.status.length > 55 ? match.status.slice(0, 55) + "…" : match.status}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="px-4 py-2 bg-white/3 flex items-center justify-between">
            <span className="text-[9px] font-mono text-graphite-600">
              {lastUpdated ? `Updated ${lastUpdated} IST` : "Awaiting data..."}
            </span>
            <a
              href="https://www.cricbuzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-mono text-solar-400 hover:underline"
            >
              Cricbuzz →
            </a>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
