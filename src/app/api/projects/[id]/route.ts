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
        images: JSON.parse(project.images),
        amenities: JSON.parse(project.amenities),
        floorPlans: JSON.parse(project.floorPlans),
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

    // Build update data object with only provided fields
    const updateData: Record<string, any> = {};

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
        images: JSON.parse(updatedProject.images),
        amenities: JSON.parse(updatedProject.amenities),
        floorPlans: JSON.parse(updatedProject.floorPlans),
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
