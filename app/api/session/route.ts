import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/auth.server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isAdminCookie(request.headers.get("cookie")) });
}
