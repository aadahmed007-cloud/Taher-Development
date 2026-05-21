// ============================================
// Zod Validation Schemas - Taher Development
// Reusable schemas for API route input validation
// ============================================

import { z } from "zod";

// Allowed project statuses
const ALLOWED_STATUSES = [
  "متاح للبيع",
  "تحت الإنشاء",
  "مباع بالكامل",
  "متاح للإيجار",
] as const;

// ============================================
// Contact Form Schema
// ============================================
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم مطلوب ويجب أن يكون حرفين على الأقل")
    .max(100, "الاسم يجب ألا يتجاوز 100 حرف"),
  phone: z
    .string()
    .min(8, "رقم الهاتف مطلوب ويجب أن يكون 8 أرقام على الأقل")
    .max(20, "رقم الهاتف يجب ألا يتجاوز 20 رقم"),
  email: z
    .string()
    .email("البريد الإلكتروني غير صالح")
    .max(200, "البريد الإلكتروني يجب ألا يتجاوز 200 حرف"),
  message: z
    .string()
    .min(5, "الرسالة مطلوبة ويجب أن تكون 5 أحرف على الأقل")
    .max(5000, "الرسالة يجب ألا تتجاوز 5000 حرف"),
});

// ============================================
// Project Create Schema
// ============================================
export const projectCreateSchema = z.object({
  titleAr: z
    .string()
    .min(2, "اسم المشروع مطلوب ويجب أن يكون حرفين على الأقل")
    .max(200, "اسم المشروع يجب ألا يتجاوز 200 حرف"),
  locationAr: z
    .string()
    .min(2, "موقع المشروع مطلوب ويجب أن يكون حرفين على الأقل")
    .max(200, "موقع المشروع يجب ألا يتجاوز 200 حرف"),
  price: z
    .string()
    .min(1, "السعر مطلوب")
    .max(100, "السعر يجب ألا يتجاوز 100 حرف"),
  area: z.string().max(50, "المساحة يجب ألا تتجاوز 50 حرف").optional().nullable(),
  descriptionAr: z
    .string()
    .max(10000, "الوصف يجب ألا يتجاوز 10000 حرف")
    .optional()
    .nullable(),
  status: z.enum(ALLOWED_STATUSES, {
    message: `حالة المشروع غير صالحة. القيم المسموحة: ${ALLOWED_STATUSES.join("، ")}`,
  }).default("متاح للبيع"),
  type: z.string().max(100, "النوع يجب ألا يتجاوز 100 حرف").optional().nullable(),
  videoLink: z
    .string()
    .url("رابط الفيديو غير صالح")
    .max(500, "رابط الفيديو يجب ألا يتجاوز 500 حرف")
    .optional()
    .nullable()
    .or(z.literal("")),
  images: z.array(z.string().url("رابط الصورة غير صالح")).max(20, "الحد الأقصى 20 صورة").optional().default([]),
  amenities: z.array(z.string().max(200)).max(50, "الحد الأقصى 50 مرفق").optional().default([]),
  floorPlans: z
    .array(
      z.object({
        name: z.string().max(200),
        image: z.string().url("رابط صورة المخطط غير صالح"),
        area: z.string().max(100),
      })
    )
    .max(20, "الحد الأقصى 20 مخطط")
    .optional()
    .default([]),
});

// ============================================
// Project Update Schema (partial of create)
// ============================================
export const projectUpdateSchema = projectCreateSchema.partial();

// ============================================
// User Update Schema
// ============================================
export const userUpdateSchema = z
  .object({
    name: z
      .string()
      .min(2, "الاسم يجب أن يكون حرفين على الأقل")
      .max(100, "الاسم يجب ألا يتجاوز 100 حرف")
      .optional(),
    email: z
      .string()
      .email("البريد الإلكتروني غير صالح")
      .max(200, "البريد الإلكتروني يجب ألا يتجاوز 200 حرف")
      .optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل")
      .max(100, "كلمة المرور يجب ألا تتجاوز 100 حرف")
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // If newPassword is provided, currentPassword must also be provided
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: "يجب إدخال كلمة المرور الحالية لتغييرها",
      path: ["currentPassword"],
    }
  )
  .refine(
    (data) => {
      // newPassword and confirmPassword must match
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "كلمة المرور الجديدة وتأكيدها غير متطابقتين",
      path: ["confirmPassword"],
    }
  );
