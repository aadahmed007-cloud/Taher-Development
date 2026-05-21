// ============================================
// /api/projects/[id] - Single Project CRUD
// GET: Public - fetch single project
// PUT: Admin only - update project
// DELETE: Admin only - delete project
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

// Allowed project status values
const ALLOWED_STATUSES = [
  "متاح للبيع",
  "تحت الإنشاء",
  "مباع بالكامل",
  "متاح للإيجار",
];

/**
 * Safe JSON parse helper - returns fallback instead of throwing
 */
function safeJsonParse(jsonString: string, fallback: unknown = null): unknown {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

/**
 * Delete associated image files from the filesystem
 */
async function deleteProjectFiles(project: { images: string; floorPlans: string }) {
  const imageUrls: string[] = safeJsonParse(project.images, []) as string[];
  const floorPlanData: { image?: string }[] = safeJsonParse(project.floorPlans, []) as { image?: string }[];
  const floorPlanUrls = floorPlanData.map((fp) => fp.image).filter(Boolean) as string[];

  const allUrls = [...imageUrls, ...floorPlanUrls];

  for (const url of allUrls) {
    // Only delete local files (paths starting with /uploads/)
    if (typeof url === "string" && url.startsWith("/uploads/")) {
      try {
        const filePath = path.join(process.cwd(), "public", url);
        await unlink(filePath);
      } catch {
        // File may not exist, ignore errors
      }
    }
  }
}

// ============================================
// GET /api/projects/[id] - Fetch single project (Public)
// ============================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { error: "المشروع غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      project: {
        ...project,
        images: safeJsonParse(project.images, []),
        amenities: safeJsonParse(project.amenities, []),
        floorPlans: safeJsonParse(project.floorPlans, []),
      },
    });
  } catch (error) {
    console.error("[PROJECT_GET_ERROR]", error);
    return NextResponse.json(
      { error: "خطأ في جلب المشروع" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT /api/projects/[id] - Update project (Admin Only)
// ============================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح بالوصول. يرجى تسجيل الدخول أولاً." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const existingProject = await db.project.findUnique({ where: { id } });
    if (!existingProject) {
      return NextResponse.json(
        { error: "المشروع غير موجود" },
        { status: 404 }
      );
    }

    // Validate status if provided
    if (body.status && !ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json(
        {
          error: "فشل التحقق من البيانات",
          details: [`حالة المشروع غير صالحة. القيم المسموحة: ${ALLOWED_STATUSES.join("، ")}`],
        },
        { status: 400 }
      );
    }

    // Build update data object with only provided fields
    const updateData: Record<string, unknown> = {};

    if (body.titleAr !== undefined) updateData.titleAr = body.titleAr.trim();
    if (body.locationAr !== undefined) updateData.locationAr = body.locationAr.trim();
    if (body.price !== undefined) updateData.price = body.price.trim();
    if (body.area !== undefined) updateData.area = body.area?.trim() || null;
    if (body.descriptionAr !== undefined) updateData.descriptionAr = body.descriptionAr?.trim() || null;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.type !== undefined) updateData.type = body.type?.trim() || null;
    if (body.videoLink !== undefined) updateData.videoLink = body.videoLink?.trim() || null;
    if (body.images !== undefined) updateData.images = JSON.stringify(body.images);
    if (body.amenities !== undefined) updateData.amenities = JSON.stringify(body.amenities);
    if (body.floorPlans !== undefined) updateData.floorPlans = JSON.stringify(body.floorPlans);

    const updatedProject = await db.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "تم تحديث المشروع بنجاح",
      project: {
        ...updatedProject,
        images: safeJsonParse(updatedProject.images, []),
        amenities: safeJsonParse(updatedProject.amenities, []),
        floorPlans: safeJsonParse(updatedProject.floorPlans, []),
      },
    });
  } catch (error) {
    console.error("[PROJECT_PUT_ERROR]", error);
    return NextResponse.json(
      { error: "خطأ في تحديث المشروع" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE /api/projects/[id] - Delete project (Admin Only)
// ============================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "غير مصرح بالوصول. يرجى تسجيل الدخول أولاً." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existingProject = await db.project.findUnique({ where: { id } });
    if (!existingProject) {
      return NextResponse.json(
        { error: "المشروع غير موجود" },
        { status: 404 }
      );
    }

    // Delete associated files before deleting the project record
    await deleteProjectFiles(existingProject);

    await db.project.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "تم حذف المشروع بنجاح",
    });
  } catch (error) {
    console.error("[PROJECT_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "خطأ في حذف المشروع" },
      { status: 500 }
    );
  }
}
