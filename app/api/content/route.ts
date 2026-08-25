import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/auth.server";
import { loadPublishedContent, resetPublishedContent, savePublishedContent } from "@/lib/siteStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await loadPublishedContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  if (!isAdminCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "Please log in again to save." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Nothing to save." }, { status: 400 });
  }

  try {
    const saved = await savePublishedContent(body);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save website content." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAdminCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "Please log in again to reset." }, { status: 401 });
  }

  try {
    const saved = await resetPublishedContent();
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not reset website content." },
      { status: 500 }
    );
  }
}
