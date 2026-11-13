import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Share2, 
  BookOpen, 
  Heart,
  ChevronRight,
  Download
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function generateStaticParams() {
  return PORTFOLIO_DATA.journal.map((post) => ({
    slug: post.slug,
  }));
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = PORTFOLIO_DATA.journal.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = PORTFOLIO_DATA.journal.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white pt-24 pb-20 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-purple-500/20 pb-4">
          <Link
            href="/journal"
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Field Notes</span>
          </Link>
          <span className="text-purple-400 font-mono">{post.category}</span>
        </div>

        {/* Post Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1 text-purple-300">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {post.readingTime}
            </span>
            <span>•</span>
            <span className="text-slate-400">By Amay Kumar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-mono font-medium text-purple-200">
            {post.subtitle}
          </p>
        </div>

        {/* Author Byline Card */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-mono font-bold text-white text-sm">
              AK
            </div>
            <div>
              <div className="font-mono font-bold text-white">Amay Kumar</div>
              <div className="text-slate-400 text-[11px]">
                BCA Student @ DY Patil Pune • AWS Certified Cloud Practitioner
              </div>
            </div>
          </div>
          <Link
            href="/about"
            className="text-xs font-mono text-cyan-400 hover:underline shrink-0"
          >
            About Amay →
          </Link>
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-slate-200 font-sans text-base sm:text-lg leading-relaxed pt-4 border-t border-purple-500/10">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-purple-500/20 space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Topics & Technologies:
          </span>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Read Next Section */}
        {otherPosts.length > 0 && (
          <div className="pt-8 border-t border-purple-500/20 space-y-4">
            <h3 className="text-lg font-mono font-bold text-white">
              More Field Notes from Amay
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {otherPosts.slice(0, 2).map((other) => (
                <Link
                  key={other.slug}
                  href={`/journal/${other.slug}`}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-cyan-400/40 transition-all space-y-2 block group"
                >
                  <span className="text-[10px] font-mono text-purple-400 uppercase">
                    {other.category}
                  </span>
                  <h4 className="text-sm font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans line-clamp-2">
                    {other.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
