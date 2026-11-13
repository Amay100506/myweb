import { NextResponse } from "next/server";

export async function GET() {
  const username = "Amay100506";

  const fallbackData = {
    profile: {
      login: username,
      name: "Amay Kumar",
      avatar_url: "https://avatars.githubusercontent.com/u/100506?v=4",
      bio: "Software Engineering • Cloud Computing • AI Systems",
      public_repos: 12,
      followers: 18,
      following: 24,
      html_url: `https://github.com/${username}`,
    },
    repos: [
      {
        id: 1,
        name: "priosort-android",
        description: "Intelligent Android notification prioritization and customization service.",
        language: "Java",
        stargazers_count: 8,
        forks_count: 2,
        html_url: `https://github.com/${username}`,
        updated_at: new Date().toISOString(),
        topics: ["android", "java", "notifications", "productivity"],
      },
      {
        id: 2,
        name: "rakshak-road-vision",
        description: "Edge AI and computer vision pipeline for real-time urban road hazard detection.",
        language: "Python",
        stargazers_count: 14,
        forks_count: 4,
        html_url: `https://github.com/${username}`,
        updated_at: new Date().toISOString(),
        topics: ["computer-vision", "yolo", "opencv", "edge-ai"],
      },
      {
        id: 3,
        name: "notifyiq-service",
        description: "Intelligent notification prioritization concept and webhook telemetry broker.",
        language: "Python",
        stargazers_count: 6,
        forks_count: 1,
        html_url: `https://github.com/${username}`,
        updated_at: new Date().toISOString(),
        topics: ["fastapi", "nextjs", "notification-prioritization"],
      },
      {
        id: 4,
        name: "cloud-sentinel-monitor",
        description: "Dockerized asynchronous microservice health monitor and CLI probe tool.",
        language: "Python",
        stargazers_count: 5,
        forks_count: 1,
        html_url: `https://github.com/${username}`,
        updated_at: new Date().toISOString(),
        topics: ["docker", "devops", "monitoring", "python"],
      },
    ],
    stats: {
      totalStars: 33,
      totalForks: 8,
      topLanguages: [
        { name: "Python", percentage: 48, color: "#3572A5" },
        { name: "Java", percentage: 26, color: "#b07219" },
        { name: "TypeScript", percentage: 16, color: "#3178c6" },
        { name: "C++", percentage: 10, color: "#f34b7d" },
      ],
    },
    cachedAt: new Date().toISOString(),
  };

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "AmayKumar-Portfolio-Nexus",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(fallbackData);
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    if (!Array.isArray(reposData)) {
      return NextResponse.json(fallbackData);
    }

    // Compute languages and stars
    let totalStars = 0;
    let totalForks = 0;
    const langCounts: Record<string, number> = {};

    reposData.forEach((repo: { stargazers_count?: number; forks_count?: number; language?: string }) => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });

    const totalLangInstances = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const langColors: Record<string, string> = {
      Python: "#3572A5",
      Java: "#b07219",
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      "C++": "#f34b7d",
      C: "#555555",
      HTML: "#e34c26",
    };

    const topLanguages = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangInstances) * 100),
        color: langColors[name] || "#a855f7",
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return NextResponse.json({
      profile: {
        login: userData.login,
        name: userData.name || "Amay Kumar",
        avatar_url: userData.avatar_url,
        bio: userData.bio || "Software Engineering • Cloud Computing • AI Systems",
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        html_url: userData.html_url,
      },
      repos: reposData.slice(0, 6),
      stats: {
        totalStars,
        totalForks,
        topLanguages: topLanguages.length ? topLanguages : fallbackData.stats.topLanguages,
      },
      cachedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(fallbackData);
  }
}
