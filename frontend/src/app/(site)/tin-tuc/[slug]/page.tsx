import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_FULL_NAME, SITE_NAME, SITE_URL } from "@/config/site";
import { ROOT_SEO_CONFIG } from "@/config/site-seo";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { POSTS_PATH, formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

// Only the files in content/tin-tuc exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const absolute = (src: string) => (/^https?:\/\//.test(src) ? src : `${SITE_URL}${src}`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const url = `${POSTS_PATH}/${post.slug}`;
  const image = absolute(post.cover || ROOT_SEO_CONFIG.og.image);
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    ...(post.keyword && { keywords: [post.keyword] }),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: image, alt: post.coverAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const url = `${SITE_URL}${POSTS_PATH}/${post.slug}`;
  const articleJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absolute(post.cover || ROOT_SEO_CONFIG.og.image),
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "vi",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: post.author || SITE_FULL_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_FULL_NAME, url: SITE_URL },
  }).replace(/</g, "\\u003c");
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: "Tin tức", url: `${SITE_URL}${POSTS_PATH}` },
    { name: post.title, url },
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <article lang="vi" className="mx-auto max-w-3xl px-5">
        <nav aria-label="Đường dẫn" className="mb-8 text-xs font-semibold uppercase tracking-[0.2em]">
          <Link href={POSTS_PATH} className="text-[#8a7462] hover:text-[#4a3829] dark:text-[#d2c4bb] dark:hover:text-[#faddc8]">
            ← Tin tức & cẩm nang
          </Link>
        </nav>
        <h1 className="text-4xl md:text-5xl font-serif font-medium leading-tight text-[#4a3829] dark:text-[#faddc8] mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-[#4e453e] dark:text-[#d2c4bb] mb-6">{post.description}</p>
        <p className="border-t border-[#E8E2D9] dark:border-[#d2c4bb]/30 pt-4 text-sm text-[#8a7462] dark:text-[#d2c4bb] mb-10">
          {post.author && <>{post.author} · </>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated !== post.date && (
            <> · cập nhật <time dateTime={post.updated}>{formatDate(post.updated)}</time></>
          )}
          {" "}· {post.readingMinutes} phút đọc
        </p>

        {post.cover && (
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-sm bg-[#f3efe9]">
            <Image src={post.cover} alt={post.coverAlt || post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
        )}

        <div className="article-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="mt-16 rounded-sm bg-[#f6f2ec] dark:bg-[#1A1A1A] p-8">
          <p className="font-serif text-2xl text-[#4a3829] dark:text-[#faddc8] mb-2">Cần tư vấn chọn căn hộ?</p>
          <p className="text-[#4e453e] dark:text-[#d2c4bb] mb-6">
            Để lại thông tin, chuyên viên sẽ gửi bảng giá và chính sách bán hàng mới nhất của từng dự án.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/lien-he" className="bg-[#4a3829] hover:bg-[#6f5a4a] text-white px-8 py-3 rounded-sm text-sm font-semibold tracking-wider">
              Nhận tư vấn miễn phí
            </Link>
            <Link href="/projects" className="border border-[#4a3829] text-[#4a3829] dark:border-[#faddc8] dark:text-[#faddc8] px-8 py-3 rounded-sm text-sm font-semibold tracking-wider">
              Xem các dự án
            </Link>
          </div>
        </aside>
      </article>
    </main>
  );
}
