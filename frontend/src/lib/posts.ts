/**
 * Bài viết mục Tin tức (/tin-tuc).
 *
 * Đây là NƠI DUY NHẤT biết bài viết được lưu ở đâu. Hiện tại mỗi bài là một
 * file Markdown trong `content/tin-tuc/<slug>.md` (do agent viết bài tạo qua
 * Pull Request). Khi chuyển sang headless WordPress, chỉ cần viết lại hai hàm
 * `getAllPosts` và `getPost` bằng WordPress REST API; các trang không đổi.
 *
 * Định dạng file (mỗi giá trị frontmatter là chuỗi JSON để YAML không hiểu sai
 * dấu ":" trong tiêu đề hay biến ngày thành Date):
 *
 *   ---
 *   title: "Tiêu đề bài"
 *   description: "Mô tả 120-155 ký tự"
 *   date: "2026-10-08"
 *   updated: "2026-10-08"
 *   author: "Đà Nẵng Luxury Homes"
 *   cover: ""            # đường dẫn trong public/, ví dụ "/images/tin-tuc/x.jpg"
 *   coverAlt: ""
 *   keyword: "từ khoá chính"
 *   ---
 *   Nội dung Markdown (bắt đầu từ "## ", không dùng "# ").
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export const POSTS_PATH = "/tin-tuc";
const POSTS_DIR = path.join(process.cwd(), "content", "tin-tuc");
const SLUG_FILE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated: string;
  author: string;
  cover: string | null;
  coverAlt: string;
  keyword: string;
  readingMinutes: number;
};

export type PostWithContent = Post & { html: string };

function str(value: unknown, fallback = ""): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : fallback;
}

function readPost(slug: string): { post: Post; content: string } | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const date = str(data.date);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    content,
    post: {
      slug,
      title: str(data.title, slug),
      description: str(data.description),
      date,
      updated: str(data.updated, date),
      author: str(data.author),
      cover: str(data.cover) || null,
      coverAlt: str(data.coverAlt),
      keyword: str(data.keyword),
      readingMinutes: Math.max(1, Math.round(words / 220)),
    },
  };
}

/** Mọi bài viết, mới nhất trước. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => SLUG_FILE.test(name))
    .map((name) => readPost(name.replace(/\.md$/, ""))?.post)
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  // Body images sit below the cover, so let the browser defer them.
  return result.toString().replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

export async function getPost(slug: string): Promise<PostWithContent | null> {
  if (!SLUG_FILE.test(`${slug}.md`)) return null;
  const found = readPost(slug);
  if (!found) return null;
  return { ...found.post, html: await renderMarkdown(found.content) };
}

/** "2026-10-08" → "08/10/2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}
