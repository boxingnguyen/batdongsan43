import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/config/site";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-20 md:py-24">
      <header className="mb-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#634F3F]/70">
          Our Developments
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#634F3F] md:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#634F3F]/80">
          A curated selection of exceptional developments — from visionary urban
          towers to waterfront masterpieces.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const isSoleil = project.slug === "wyndham-soleil-danang";
          return (
            <Link
              key={project.id}
              href={isSoleil ? `${SITE_URL}/` : `/projects/${project.slug}`}
              target={isSoleil ? "_blank" : undefined}
              rel={isSoleil ? "noopener noreferrer" : undefined}
              className="group flex flex-col overflow-hidden rounded-[4px] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute right-3 top-3 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#634F3F]">
                  {project.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h2 className="font-serif text-xl text-[#4a3829] transition-colors group-hover:text-[#634F3F]">
                  {project.title}
                </h2>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#634F3F]/70">
                  {project.location}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#634F3F]/80 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}