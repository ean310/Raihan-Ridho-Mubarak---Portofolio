import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0..4
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "ean310";
  const year = searchParams.get("year") || "last";

  try {
    // Primary: github-contributions-api (parses GitHub's official contributions page with exact counts & levels)
    const apiUrl = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
      username
    )}?y=${encodeURIComponent(year)}`;

    const [contribRes, allYearsRes, userRes] = await Promise.all([
      fetch(apiUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 300 },
      }),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
          username
        )}`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 600 },
        }
      ),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 600 },
      }),
    ]);

    if (!contribRes.ok) {
      throw new Error(`Contribution API returned ${contribRes.status}`);
    }

    const contribData = await contribRes.json();
    const allYearsData = allYearsRes.ok ? await allYearsRes.json() : null;
    const userData = userRes.ok ? await userRes.json() : null;

    const contributions: ContributionDay[] = contribData.contributions || [];
    const totalMap = contribData.total || {};
    const totalForPeriod =
      typeof totalMap[year] === "number"
        ? totalMap[year]
        : typeof totalMap.lastYear === "number"
        ? totalMap.lastYear
        : contributions.reduce((sum, d) => sum + (d.count || 0), 0);

    return NextResponse.json({
      username,
      year,
      total: totalForPeriod,
      totalsByYear: allYearsData?.total || totalMap,
      contributions,
      profile: userData
        ? {
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            avatar_url: userData.avatar_url,
            bio: userData.bio,
          }
        : null,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch live GitHub contributions",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

