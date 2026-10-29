import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.danangluxuryhomes.vn";

export const metadata = {
  title: "Dự Án Căn Hộ Cao Cấp Đà Nẵng | Ethereal Estate",
  description:
    "Khám phá các dự án căn hộ cao cấp Đà Nẵng: S-Light Tower, Sun FourS Tower, The Legend, Camellia. Bảng giá mới nhất, pháp lý sở hữu lâu dài. Tư vấn miễn phí từ Ethereal Estate.",
  keywords: [
    "dự án căn hộ Đà Nẵng",
    "căn hộ cao cấp Đà Nẵng",
    "bất động sản Đà Nẵng",
    "S-Light Tower",
    "Sun FourS Tower",
    "The Legend Đà Nẵng",
    "Camellia Sơn Trà",
    "căn hộ sở hữu lâu dài Đà Nẵng",
  ],
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
  openGraph: {
    title: "Dự Án Căn Hộ Cao Cấp Đà Nẵng | Ethereal Estate",
    description:
      "Khám phá các dự án căn hộ cao cấp Đà Nẵng: S-Light Tower, Sun FourS Tower, The Legend, Camellia. Bảng giá mới nhất, pháp lý sở hữu lâu dài.",
    url: `${BASE_URL}/projects`,
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: `${BASE_URL}/images/home/cover-image.jpg`,
        width: 800,
        height: 454,
        alt: "Dự Án Căn Hộ Cao Cấp Đà Nẵng – Ethereal Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Dự Án Căn Hộ Cao Cấp Đà Nẵng | Ethereal Estate",
    description:
      "Khám phá các dự án căn hộ cao cấp Đà Nẵng: S-Light Tower, Sun FourS Tower, The Legend, Camellia. Pháp lý sở hữu lâu dài.",
    images: [`${BASE_URL}/images/home/cover-image.jpg`],
  },
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
          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
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
