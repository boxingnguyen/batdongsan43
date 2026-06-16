import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "markdown/blogs");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string | object | null;
  };

  const items: Items = {};

  function processImages(content: string) {
    // You can modify this function to handle image processing
    // For example, replace image paths with actual HTML image tags
    return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      // You can modify the content here to include images
      items[field] = processImages(content);
    }

    if (field === "metadata") {
      // Include metadata, including the image information
      items[field] = { ...data, coverImage: data.coverImage || null };
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  // Ensure we have the `date` field available for sorting
  const requestedFields = Array.from(new Set([...fields, "date"]));

  const posts = slugs
    .map((slug) => getPostBySlug(slug, requestedFields))
    // sort posts by date in descending order (safely handle missing/null dates)
    .sort((post1, post2) => {
      const d1 = typeof post1.date === "string" ? post1.date : "";
      const d2 = typeof post2.date === "string" ? post2.date : "";
      return d1 > d2 ? -1 : 1;
    });

  return posts;
}
