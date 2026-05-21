// ============================================
// POST /api/upload - Image Upload Handler
// Handles file uploads via Cloudinary or local storage
// Converts uploaded project images into secure dynamic URLs
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح بالوصول. يرجى تسجيل الدخول أولاً." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "لم يتم اختيار أي ملفات" },
        { status: 400 }
      );
    }

    // Validate file types and sizes
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB for high-res photos
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: نوع ملف غير مدعوم. يُسمح بـ JPEG, PNG, WEBP فقط.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: حجم الملف يتجاوز الحد الأقصى (10MB).`);
        continue;
      }

      // ============================================
      // Cloudinary Upload (Production)
      // Uncomment this block when CLOUDINARY_URL is configured
      // ============================================
      /*
      const cloudinaryUrl = process.env.CLOUDINARY_URL;
      if (cloudinaryUrl) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", `data:${file.type};base64,${buffer.toString("base64")}`);
        cloudinaryFormData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET || "taher_projects");
        cloudinaryFormData.append("folder", "taher-development/projects");

        const cloudName = cloudinaryUrl.split("@")[1] || cloudinaryUrl.split("/").pop();
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: cloudinaryFormData }
        );

        if (uploadResponse.ok) {
          const result = await uploadResponse.json();
          uploadedUrls.push(result.secure_url);
        } else {
          errors.push(`${file.name}: فشل الرفع إلى Cloudinary`);
        }
        continue;
      }
      */

      // ============================================
      // Local File Storage (Development / Fallback)
      // ============================================
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const ext = path.extname(sanitized);
      const filename = `project_${timestamp}_${Math.random().toString(36).substring(2, 8)}${ext}`;

      // Ensure upload directory exists
      const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      // Return the public URL path
      uploadedUrls.push(`/uploads/projects/${filename}`);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      errors: errors.length > 0 ? errors : undefined,
      message: `تم رفع ${uploadedUrls.length} ملف بنجاح${errors.length > 0 ? ` مع ${errors.length} أخطاء` : ""}`,
    });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "خطأ في رفع الملفات" },
      { status: 500 }
    );
  }
}
