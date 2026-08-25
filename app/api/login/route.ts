import { NextResponse } from "next/server";
import { adminCookieHeader, getAdminPassword } from "@/lib/auth.server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || body.password !== getAdminPassword()) {
    return NextResponse.json({ error: "That password isn't right." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", adminCookieHeader());
  return response;
}
