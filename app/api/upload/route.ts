import { NextResponse } from "next/server";
import { isAdminCookie } from "@/lib/auth.server";
import { persistUploadFile, storageReady } from "@/lib/siteStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAdminCookie(request.headers.get("cookie"))) {
    return NextResponse.json({ error: "Please log in again to upload photos." }, { status: 401 });
  }

  if (!storageReady()) {
    return NextResponse.json(
      {
        error:
          "Photo storage is not set up on Vercel. Create a Blob store in the Vercel dashboard (Storage → Blob), connect it to this project, then redeploy.",
      },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size < 1) {
    return NextResponse.json({ error: "Please choose a photo." }, { status: 400 });
  }

  try {
    const url = await persistUploadFile(file);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not upload this photo." },
      { status: 500 }
    );
  }
}
