import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// PATCH /api/contact/[id] - Mark lead as read/unread
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();

    const existingLead = await db.lead.findUnique({ where: { id } });
    if (!existingLead) {
      return NextResponse.json({ error: "الرسالة غير موجودة" }, { status: 404 });
    }

    const updatedLead = await db.lead.update({
      where: { id },
      data: { isRead: body.isRead !== undefined ? body.isRead : true },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("[LEAD_PATCH_ERROR]", error);
    return NextResponse.json({ error: "خطأ في تحديث الرسالة" }, { status: 500 });
  }
}

// DELETE /api/contact/[id] - Delete a lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;

    const existingLead = await db.lead.findUnique({ where: { id } });
    if (!existingLead) {
      return NextResponse.json({ error: "الرسالة غير موجودة" }, { status: 404 });
    }

    await db.lead.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "تم حذف الرسالة بنجاح" });
  } catch (error) {
    console.error("[LEAD_DELETE_ERROR]", error);
    return NextResponse.json({ error: "خطأ في حذف الرسالة" }, { status: 500 });
  }
}
