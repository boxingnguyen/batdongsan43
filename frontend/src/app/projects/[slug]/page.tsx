import { buildMetadata, buildJsonLd } from "@/lib/seo";
import { getSEO } from "@/config/projects-seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  try {
    return buildMetadata(getSEO(slug)); // full: og, twitter, canonical...
  } catch {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: "Không tìm thấy dự án" };
    return { title: project.title, description: project.description.slice(0, 160) };
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  let jsonLd: string | null = null;
  try { jsonLd = buildJsonLd(getSEO(slug)); } catch { jsonLd = null; }

  return (
    <div className="bg-[#F9F9F9] text-[#634F3F]">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      {/* Hero */}
      <section className="relative aspect-[21/9] max-h-[70vh] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-20">
          <span className="inline-block rounded-sm bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#634F3F]">
            {project.status}
          </span>
          <h1 className="mt-4 font-serif text-3xl text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            {project.location}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-20 md:py-24">
        <div className="prose prose-[#634F3F] max-w-none">
          <p className="text-lg leading-relaxed text-[#634F3F]/90">
            {project.description}
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-[#634F3F]/70 transition-colors hover:text-[#4a3829]"
          >
            &larr; Back to Projects
          </Link>
        </div>
      </section>
    </div>
  );
}