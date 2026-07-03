import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/config/site";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Project`,
    description: project.description.slice(0, 160),
  };
}

function ExternalRedirect({ url }: { url: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F9F9F9]">
      <div className="text-center">
        <p className="mb-4 text-lg text-[#634F3F]">Redirecting...</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Click here if not redirected
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.open('${url}', '_blank'); history.back();`,
          }}
        />
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  if (slug === "wyndham-soleil-danang") {
    return <ExternalRedirect url={`${SITE_URL}/`} />;
  }

  return (
    <div className="bg-[#F9F9F9] text-[#634F3F]">
      {/* Hero */}
      <section className="relative aspect-[21/9] max-h-[70vh] w-full overflow-hidden">
        <ImageWithSkeleton
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