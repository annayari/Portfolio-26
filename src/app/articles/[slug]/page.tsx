import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { articleBodies } from "@/lib/articleBodies";
import { BackButton } from "@/components/ui/BackButton";

export function generateStaticParams() {
  return articles.filter((a) => a.hasPage).map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug && a.hasPage);
  if (!article) notFound();

  const body = articleBodies[slug];

  return (
    <div className="max-w-2xl mx-auto px-6 py-6 md:py-8">

      <BackButton />

      {/* Date + read time */}
      {(article.date || article.readTime) && (
        <p className="font-body text-sm mb-3" style={{ color: '#6B6B7A' }}>
          {article.date}
          {article.date && article.readTime ? " · " : ""}
          {article.readTime ? `${article.readTime} min read` : ""}
        </p>
      )}

      {/* Title */}
      <h1 className="font-display font-bold text-3xl text-ink-primary mt-0 mb-3 leading-tight tracking-tight">
        {article.title}
      </h1>

      {/* Meta — author · platform · language */}
      <p className="font-body text-sm mb-10" style={{ color: '#6B6B7A' }}>
        Anna Yarigina · {article.platform} · Originally published in {article.language === "ua" ? "Ukrainian" : "English"}
      </p>

      {/* Single allowed divider */}
      <hr className="border-t border-border mt-0 mb-10" />

      {/* Body */}
      {body ?? (
        <p className="font-body text-base text-ink-primary leading-relaxed mb-5">
          Article content coming soon.
        </p>
      )}

      {/* Back link */}
      <div className="mt-4">
      </div>

    </div>
  );
}
