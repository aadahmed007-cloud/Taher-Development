import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { userUpdateSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";

// PUT /api/users - Update current user profile
export async function PUT(request: NextRequest) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = userUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(
        (issue) => issue.message
      );
      return NextResponse.json(
        { error: "فشل التحقق من البيانات", details: errors },
        { status: 400 }
      );
    }

    const { name, email, currentPassword, newPassword } = validationResult.data;

    const userId = (session!.user as Record<string, unknown>).id as string;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};

    // Update name if provided
    if (name && name.trim()) {
      updateData.name = name.trim();
    }

    // Update email if provided and different
    if (email && email.trim() && email.trim() !== user.email) {
      const existingUser = await db.user.findUnique({ where: { email: email.trim() } });
      if (existingUser) {
        return NextResponse.json({ error: "البريد الإلكتروني مستخدم بالفعل" }, { status: 400 });
      }
      updateData.email = email.trim();
    }

    // Change password if currentPassword and newPassword are provided
    if (currentPassword && newPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isValidPassword) {
        return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      updateData.passwordHash = hashedPassword;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "لم يتم تقديم أي تغييرات" }, { status: 400 });
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "تم تحديث البيانات بنجاح",
      user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
    });
  } catch (error) {
    console.error("[USER_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "خطأ في تحديث البيانات" }, { status: 500 });
  }
}
