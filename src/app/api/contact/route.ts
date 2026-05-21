// ============================================
// POST /api/contact - Customer Lead Submission
// Validates and stores customer leads from landing page
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Server-side validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.push("الاسم مطلوب ويجب أن يكون حرفين على الأقل");
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      errors.push("رقم الهاتف مطلوب ويجب أن يكون 8 أرقام على الأقل");
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("البريد الإلكتروني غير صالح");
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      errors.push("الرسالة مطلوبة ويجب أن تكون 5 أحرف على الأقل");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "فشل التحقق من البيانات", details: errors },
        { status: 400 }
      );
    }

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
export async function GET() {
  const { getServerSession } = await import("next-auth/next");
  const { authOptions } = await import("@/lib/auth");

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "غير مصرح بالوصول" }, { status: 401 });
  }

  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("[LEADS_GET_ERROR]", error);
    return NextResponse.json({ error: "خطأ في جلب البيانات" }, { status: 500 });
  }
}
