import { NextResponse } from "next/server";

export function GET() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://hexydog.com/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
