import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { POSTS_PATH, formatDate, getAllPosts } from "@/lib/posts";

const TITLE = "Tin tức & cẩm nang mua căn hộ Đà Nẵng";
const DESCRIPTION =
  "Cẩm nang cho người mua căn hộ Đà Nẵng: thủ tục pháp lý, vay mua nhà, so sánh khu vực và cập nhật các dự án căn hộ cao cấp.";

export const metadata: Metadata = {
  title: `${TITLE} | ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: POSTS_PATH },
  openGraph: { type: "website", locale: "vi_VN", url: POSTS_PATH, title: TITLE, description: DESCRIPTION },
};

export default function NewsIndexPage() {
  const posts = getAllPosts();
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: "Tin tức", url: `${SITE_URL}${POSTS_PATH}` },
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-28 pb-20" lang="vi">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />
      <div className="mx-auto max-w-5xl px-5 md:px-20">
        <header className="mb-14 border-b border-[#E8E2D9] dark:border-[#d2c4bb]/30 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7462] dark:text-[#d2c4bb] mb-4">
            Tin tức
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium italic text-[#4a3829] dark:text-[#faddc8] mb-5">
            {TITLE}
          </h1>
          <p className="max-w-2xl text-lg text-[#4e453e] dark:text-[#d2c4bb]">{DESCRIPTION}</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-[#4e453e] dark:text-[#d2c4bb]">Chưa có bài viết nào. Mời bạn quay lại sau.</p>
        ) : (
          <ol className="space-y-12">
            {posts.map((post) => (
              <li key={post.slug} className={post.cover ? "grid gap-6 md:grid-cols-[280px_1fr] md:items-start" : undefined}>
                {post.cover ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#f3efe9]">
                    <Image src={post.cover} alt={post.coverAlt || post.title} fill sizes="(min-width: 768px) 280px, 100vw" className="object-cover" />
                  </div>
                ) : null}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8a7462] dark:text-[#d2c4bb] mb-2">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} phút đọc
                  </p>
                  <h2 className="text-2xl font-serif font-medium text-[#4a3829] dark:text-[#faddc8] mb-3">
                    <Link href={`${POSTS_PATH}/${post.slug}`} className="hover:underline underline-offset-4">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-[#4e453e] dark:text-[#d2c4bb]">{post.description}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
