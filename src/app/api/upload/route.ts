import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { v4 as uuidv4 } from "uuid";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  // Require admin authentication
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "لم يتم إرسال أي ملفات" },
        { status: 400 }
      );
    }

    const uploadDir = process.env.UPLOAD_DIR || "./upload";
    const absoluteUploadDir = path.resolve(uploadDir);

    // Ensure upload directory exists
    await mkdir(absoluteUploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        return NextResponse.json(
          { error: "بيانات الملف غير صالحة" },
          { status: 400 }
        );
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `نوع الملف غير مسموح به: ${file.type}. يُسمح فقط بملفات الصور.` },
          { status: 400 }
        );
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `حجم الملف يتجاوز الحد المسموح (10 ميجابايت): ${file.name}` },
          { status: 400 }
        );
      }

      // Generate unique filename preserving extension
      const ext = path.extname(file.name) || ".jpg";
      const uniqueName = `${uuidv4()}${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(absoluteUploadDir, uniqueName);

      await writeFile(filePath, buffer);

      urls.push(`/upload/${uniqueName}`);
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء رفع الملفات" },
      { status: 500 }
    );
  }
}
