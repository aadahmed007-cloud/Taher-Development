// ============================================
// /api/projects - Full CRUD API
// GET: Public - fetch all projects
// POST: Admin only - create new project
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { projectCreateSchema } from "@/lib/validations";

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

// ============================================
// GET /api/projects - Fetch all projects (Public)
// ============================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "0");
    const status = searchParams.get("status") || undefined;

    // Validate status filter against allowed values
    const where = status && ALLOWED_STATUSES.includes(status) ? { status } : {};

    const projects = await db.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      ...(limit > 0 ? { take: limit } : {}),
    });

    // Parse JSON fields for each project with safe parsing
    const parsedProjects = projects.map((project) => ({
      ...project,
      images: safeJsonParse(project.images, []),
      amenities: safeJsonParse(project.amenities, []),
      floorPlans: safeJsonParse(project.floorPlans, []),
    }));

    return NextResponse.json({ projects: parsedProjects });
  } catch (error) {
    console.error("[PROJECTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "خطأ في جلب المشاريع" },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/projects - Create new project (Admin Only)
// ============================================
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

    const body = await request.json();

    // Validate with Zod schema
    const validationResult = projectCreateSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(
        (issue) => issue.message
      );
      return NextResponse.json(
        { error: "فشل التحقق من البيانات", details: errors },
        { status: 400 }
      );
    }

    const {
      titleAr,
      locationAr,
      price,
      area,
      descriptionAr,
      status,
      type,
      videoLink,
      images,
      amenities,
      floorPlans,
    } = validationResult.data;

    // Create project with JSON-serialized array fields
    const project = await db.project.create({
      data: {
        titleAr: titleAr.trim(),
        locationAr: locationAr.trim(),
        price: price.trim(),
        area: area?.trim() || null,
        descriptionAr: descriptionAr?.trim() || null,
        status: status || "متاح للبيع",
        type: type?.trim() || null,
        videoLink: videoLink?.trim() || null,
        images: JSON.stringify(images || []),
        amenities: JSON.stringify(amenities || []),
        floorPlans: JSON.stringify(floorPlans || []),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم إضافة المشروع بنجاح",
        project: {
          ...project,
          images: safeJsonParse(project.images, []),
          amenities: safeJsonParse(project.amenities, []),
          floorPlans: safeJsonParse(project.floorPlans, []),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[PROJECTS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "خطأ في إنشاء المشروع" },
      { status: 500 }
    );
  }
}
