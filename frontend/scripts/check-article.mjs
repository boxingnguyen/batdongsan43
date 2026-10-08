#!/usr/bin/env node
/**
 * Kiểm tra bài viết mục Tin tức trước khi tạo Pull Request.
 * Agent viết bài (writer_agent) chạy script này; bạn cũng có thể chạy tay.
 *
 *   node scripts/check-article.mjs content/tin-tuc/<slug>.md [...]     (trong thư mục frontend/)
 *
 * In ra {"problems": [...]} dạng JSON. Danh sách rỗng = bài hợp lệ.
 * Mã thoát khác 0 = bản thân script bị lỗi.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const FRONTEND = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = path.join(FRONTEND, "content", "tin-tuc");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Project pages that exist on the site (src/data/projects.ts minus external
// ones, the same rule as src/config/site-pages.ts).
function projectSlugs() {
  const src = fs.readFileSync(path.join(FRONTEND, "src/data/projects.ts"), "utf8");
  const external = ["wyndham-soleil-danang"];
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]).filter((s) => !external.includes(s));
}

function knownPaths() {
  const posts = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => /^[a-z0-9-]+\.md$/.test(f)).map((f) => `/tin-tuc/${f.slice(0, -3)}`)
    : [];
  return new Set(["/", "/projects", "/lien-he", "/tin-tuc", "/so-do-trang",
    ...projectSlugs().map((s) => `/projects/${s}`), ...posts]);
}

const text = (html) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function checkFile(file, known) {
  const problems = [];
  const abs = path.resolve(FRONTEND, file);
  const slug = path.basename(abs, ".md");
  const tag = `[${slug}]`;
  if (path.dirname(abs) !== POSTS_DIR || !abs.endsWith(".md")) return [`${file}: not in content/tin-tuc/*.md`];
  if (!SLUG.test(slug)) problems.push(`${tag} file name must be lowercase ASCII words joined by hyphens`);
  if (!fs.existsSync(abs)) return [`${tag} file does not exist`];

  let parsed;
  try {
    parsed = matter(fs.readFileSync(abs, "utf8"));
  } catch (e) {
    return [`${tag} frontmatter is not valid YAML: ${e.message}`];
  }
  const { data, content } = parsed;
  for (const key of ["title", "description", "date", "updated", "author"]) {
    if (typeof data[key] !== "string" || !data[key].trim()) problems.push(`${tag} frontmatter "${key}" must be a non-empty quoted string`);
  }
  for (const key of ["date", "updated"]) {
    if (typeof data[key] === "string" && !DATE.test(data[key])) problems.push(`${tag} "${key}" must look like 2026-10-08`);
  }
  if (typeof data.title === "string" && (data.title.length < 20 || data.title.length > 70)) {
    problems.push(`${tag} title is ${data.title.length} characters (needs 20-70, ideally under 60)`);
  }
  if (typeof data.description === "string" && (data.description.length < 70 || data.description.length > 160)) {
    problems.push(`${tag} description is ${data.description.length} characters (needs 70-160)`);
  }
  if (data.cover) {
    if (typeof data.cover !== "string" || !data.cover.startsWith("/")) problems.push(`${tag} cover must be a path in public/, e.g. "/images/tin-tuc/x.jpg"`);
    else if (!fs.existsSync(path.join(FRONTEND, "public", data.cover))) problems.push(`${tag} cover image ${data.cover} is not in public/`);
    if (!data.coverAlt) problems.push(`${tag} a cover image needs coverAlt`);
  }

  const html = String(await remark().use(remarkGfm).use(remarkHtml).process(content));
  if (/<h1[\s>]/.test(html)) problems.push(`${tag} body contains an H1 ("# "); the title is already the H1, use "## "`);
  const headings = [...html.matchAll(/<h[2-6]>(.*?)<\/h[2-6]>/g)].map((m) => text(m[1]));
  if ([...html.matchAll(/<h2>/g)].length < 3) {
    problems.push(`${tag} body needs at least 3 "## " sections`);
  }
  const dupes = headings.filter((h, i) => headings.indexOf(h) !== i);
  if (dupes.length) problems.push(`${tag} duplicate headings: ${JSON.stringify([...new Set(dupes)])}`);
  if (headings.includes(data.title)) problems.push(`${tag} a heading repeats the title`);

  const links = [...html.matchAll(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/g)].map((m) => ({ href: m[1], label: text(m[2]) }));
  const labels = links.map((l) => l.label);
  const dupLabels = labels.filter((l, i) => labels.indexOf(l) !== i);
  if (dupLabels.length) problems.push(`${tag} the same link text is used more than once: ${JSON.stringify([...new Set(dupLabels)])}`);
  for (const { href, label } of links) {
    if (!label) problems.push(`${tag} link to ${href} has no text`);
    if (href.startsWith("http://")) problems.push(`${tag} use https:// for ${href}`);
    if (href.startsWith("/")) {
      const clean = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
      if (!known.has(clean)) problems.push(`${tag} internal link ${href} does not exist on the site`);
    }
  }
  if (links.filter((l) => /^https?:/.test(l.href)).length > 10) problems.push(`${tag} more than 10 external links`);
  return problems;
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node scripts/check-article.mjs content/tin-tuc/<slug>.md [...]");
  process.exit(2);
}
const known = knownPaths();
const problems = [];
for (const file of files) problems.push(...(await checkFile(file, known)));
console.log(JSON.stringify({ problems }));
