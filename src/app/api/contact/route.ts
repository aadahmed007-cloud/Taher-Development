// ============================================
// POST /api/contact - Customer Lead Submission
// Validates and stores customer leads from landing page
// GET /api/contact - Admin-only leads retrieval with pagination
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(
        (issue) => issue.message
      );
      return NextResponse.json(
        { error: "فشل التحقق من البيانات", details: errors },
        { status: 400 }
      );
    }

    const { name, phone, email, message } = validationResult.data;

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    };

    // Check for duplicate submissions (rate limit per email within 5 minutes)
    const recentLead = await db.lead.findFirst({
      where: {
        email: sanitizedData.email,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000),
        },
      },
    });

    if (recentLead) {
      return NextResponse.json(
        { error: "لقد أرسلت رسالة مؤخراً. يرجى الانتظار قبل الإرسال مرة أخرى." },
        { status: 429 }
      );
    }

    // Save lead to database
    const lead = await db.lead.create({
      data: sanitizedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت.",
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      { error: "حدث خطأ في الخادم. يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}

// GET endpoint for admin to retrieve leads (protected)
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.lead.count(),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[LEADS_GET_ERROR]", error);
    return NextResponse.json({ error: "خطأ في جلب البيانات" }, { status: 500 });
  }
}
