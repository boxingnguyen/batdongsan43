export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://thecamellia.vn/wp-content/themes/main/assets/images/matbang/t4.svg",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return new Response("SVG not available", { status: 502 });
    const text = await res.text();
    return new Response(text, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response("Failed to fetch SVG", { status: 500 });
  }
}
