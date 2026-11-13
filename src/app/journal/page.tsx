import Link from "next/link";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag, 
  ChevronRight, 
  Sparkles,
  Heart
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const metadata = {
  title: "Engineering Journal & Field Notes | Amay Kumar",
  description:
    "Honest reflections, technical lessons, and practical tutorials by Amay Kumar on cloud computing, AWS certification, Terraform, and Docker.",
};

export default function JournalPage() {
  const { journal } = PORTFOLIO_DATA;

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-purple-500/20 pb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-mono">
              {journal.length} Field Notes Published
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-950/20 text-xs font-mono text-pink-300">
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            <span>ENGINEERING JOURNAL & FIELD NOTES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
            Writings & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">Reflections</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl leading-relaxed">
            No ghostwriters, no automated generic buzzwords. Just honest, practical reflections from a college student learning distributed cloud infrastructure, clearing certifications, and debugging systems.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {journal.map((post) => (
            <article
              key={post.slug}
              className="tech-card p-6 sm:p-8 rounded-2xl border border-purple-500/20 hover:border-cyan-400/50 transition-all space-y-4 group relative hud-corner shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 pb-2 border-b border-purple-500/10">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-purple-950/60 border border-purple-700 text-purple-300">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3 text-purple-400" />
                    {post.publishedAt}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-cyan-300">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {post.readingTime}
                </span>
              </div>

              <div>
                <Link href={`/journal/${post.slug}`}>
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-xs sm:text-sm text-purple-300 font-mono mt-1">
                  {post.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {post.summary}
              </p>

              {/* Tags & Read Link */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/journal/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white font-bold group-hover:translate-x-1 transition-all"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
