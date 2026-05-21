// ============================================
// /api/seed - Database Seeding Endpoint
// Creates initial admin user and sample projects
// DEV ONLY - Blocked in production via middleware
// ============================================

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  // Extra production check (also enforced by middleware)
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "هذه الخدمة غير متاحة في بيئة الإنتاج" },
      { status: 403 }
    );
  }

  try {
    // Check if admin user already exists
    const existingAdmin = await db.user.findUnique({
      where: { email: "admin@taher.com" },
    });

    if (existingAdmin) {
      return NextResponse.json({
        message: "البيانات الأساسية موجودة بالفعل",
        adminExists: true,
      });
    }

    // Create admin user with hashed password from env or default
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || "Taher@Admin2024";
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    const admin = await db.user.create({
      data: {
        username: "admin",
        email: "admin@taher.com",
        passwordHash: hashedPassword,
        name: "المدير العام",
        role: "admin",
      },
    });

    // Seed initial projects (same as before but without exposing password)
    const projects = [
      {
        titleAr: "مجمع طاهر الفاخر",
        locationAr: "القاهرة الجديدة",
        price: "يبدأ من 5,000,000 ج.م",
        area: "180 - 350 م²",
        descriptionAr: "مجمع سكني فاخر يقع في قلب القاهرة الجديدة، يوفر تجربة معيشية استثنائية تجمع بين التصميم العصري والرفاهية المتكاملة. يضم المجمع وحدات سكنية متنوعة المساحات مع مرافق متكاملة تشمل حدائق واسعة ونادي صحي وحمامات سباحة.",
        status: "متاح للبيع",
        type: "سكني متكامل",
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        images: JSON.stringify([
          "https://picsum.photos/seed/taherresidence1/800/600",
          "https://picsum.photos/seed/taherresidence2/800/600",
          "https://picsum.photos/seed/taherresidence3/800/600",
        ]),
        amenities: JSON.stringify([
          "مساحات خضراء ولاندسكيب",
          "أنظمة أمن وحراسة 24/7",
          "كاميرات مراقبة ذكية",
          "جراجات خاصة تحت الأرض",
          "نادي صحي رياضي",
          "منطقة ألعاب أطفال",
        ]),
        floorPlans: JSON.stringify([
          { name: "نموذج (أ) - فاخر", image: "https://picsum.photos/seed/plan1/500/300", area: "180 - 220 m²" },
          { name: "نموذج (ب) - مميز", image: "https://picsum.photos/seed/plan2/500/300", area: "120 - 150 m²" },
        ]),
      },
      {
        titleAr: "أبراج النيل بلازا",
        locationAr: "الزمالك",
        price: "يبدأ من 12,000,000 ج.م",
        area: "200 - 450 م²",
        descriptionAr: "أبراج تجارية وإدارية فاخرة على ضفاف النيل، توفر مكاتب ومساحات عمل بتصاميم عالمية مع إطلالات بانورامية خلابة على نهر النيل. موقع استراتيجي في قلب الزمالك.",
        status: "تحت الإنشاء",
        type: "تجاري و إداري",
        images: JSON.stringify([
          "https://picsum.photos/seed/nileplaza1/800/600",
          "https://picsum.photos/seed/nileplaza2/800/600",
          "https://picsum.photos/seed/nileplaza3/800/600",
        ]),
        amenities: JSON.stringify([
          "إطلالة بانورامية على النيل",
          "مواقف ذكية متعددة الطوابق",
          "قاعات مؤتمرات متطورة",
          "خدمة كونسيرج 24 ساعة",
          "نظام إدارة ذكي للمبنى",
        ]),
        floorPlans: JSON.stringify([
          { name: "مكتب تنفيذي", image: "https://picsum.photos/seed/np-plan1/500/300", area: "80 - 120 m²" },
          { name: "جناح إداري", image: "https://picsum.photos/seed/np-plan2/500/300", area: "200 - 350 m²" },
        ]),
      },
      {
        titleAr: "كمبوند الأفق الأخضر",
        locationAr: "الشيخ زايد",
        price: "يبدأ من 8,500,000 ج.م",
        area: "250 - 500 م²",
        descriptionAr: "كمبوند سكني فاخر في الشيخ زايد يتميز بمساحاته الخضراء الواسعة وتصميمه المعماري الأنيق. يضم فيلات وتوين هاوس بتصاميم حديثة ومرافق ترفيهية متكاملة.",
        status: "مباع بالكامل",
        type: "فيلات وتوين هاوس",
        videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        images: JSON.stringify([
          "https://picsum.photos/seed/greenhorizon1/800/600",
          "https://picsum.photos/seed/greenhorizon2/800/600",
        ]),
        amenities: JSON.stringify([
          "نادي اجتماعي فاخر",
          "بحيرات صناعية",
          "مسارات مشي ودراجات",
          "منطقة تجارية داخلية",
          "أمن متقدم كبائن دخول",
        ]),
        floorPlans: JSON.stringify([
          { name: "توين هاوس مميز", image: "https://picsum.photos/seed/gh-plan1/500/300", area: "250 - 300 m²" },
          { name: "فيلا مستقلة", image: "https://picsum.photos/seed/gh-plan2/500/300", area: "400 - 500 m²" },
        ]),
      },
      {
        titleAr: "طاهر مول للأعمال",
        locationAr: "العاصمة الإدارية",
        price: "اتصل للتفاصيل",
        area: "50 - 300 م²",
        descriptionAr: "مجمع تجاري ضخم في العاصمة الإدارية الجديدة، يوفر فرصاً استثمارية فريدة في أفضل موقع تجاري. يضم محلات تجارية ومطاعم ومساحات مكتبية.",
        status: "متاح للإيجار",
        type: "مجمعات تجارية",
        images: JSON.stringify([
          "https://picsum.photos/seed/businessmall1/800/600",
          "https://picsum.photos/seed/businessmall2/800/600",
          "https://picsum.photos/seed/businessmall3/800/600",
        ]),
        amenities: JSON.stringify([
          "واجهات زجاجية عصرية",
          "ساحة طعام عالمية",
          "مسرح ترفيهي",
          "مواقف ذكية واسعة",
        ]),
        floorPlans: JSON.stringify([
          { name: "محل تجاري", image: "https://picsum.photos/seed/bm-plan1/500/300", area: "50 - 100 m²" },
          { name: "مساحة مكتبية", image: "https://picsum.photos/seed/bm-plan2/500/300", area: "150 - 300 m²" },
        ]),
      },
      {
        titleAr: "فيلات الساحل الشمالي",
        locationAr: "رأس الحكمة",
        price: "يبدأ من 15,000,000 ج.م",
        area: "300 - 600 م²",
        descriptionAr: "مصيف فاخر على ساحل البحر المتوسط في رأس الحكمة، يتميز بشواطئه الرملية البيضاء ومياهه الصافية. فيلات بتصاميم متوسطية أنيقة مع حدائق خاصة ومداخل مباشرة للشاطئ.",
        status: "متاح للبيع",
        type: "مصيف فاخر",
        images: JSON.stringify([
          "https://picsum.photos/seed/northcoast1/800/600",
          "https://picsum.photos/seed/northcoast2/800/600",
        ]),
        amenities: JSON.stringify([
          "شاطئ خاص",
          "مارينا لليخوت",
          "نادي شاطئي",
          "مطاعم وكافيهات",
          "خدمة غرف فندقية",
        ]),
        floorPlans: JSON.stringify([
          { name: "فيلا شاطئية", image: "https://picsum.photos/seed/nc-plan1/500/300", area: "300 - 450 m²" },
          { name: "قصر متوسطي", image: "https://picsum.photos/seed/nc-plan2/500/300", area: "500 - 600 m²" },
        ]),
      },
      {
        titleAr: "أكوا ريزيدنس",
        locationAr: "العين السخنة",
        price: "يبدأ من 3,500,000 ج.م",
        area: "120 - 250 م²",
        descriptionAr: "شاليهات فاخرة على خليج السخنة مع إطلالات بحرية ساحرة. تصميم عصري يمزج بين الراحة والفخامة مع مرافق ترفيهية متكاملة لقضاء أجمل الأوقات.",
        status: "متاح للبيع",
        type: "شاليهات فاخرة",
        images: JSON.stringify([
          "https://picsum.photos/seed/aquares1/800/600",
          "https://picsum.photos/seed/aquares2/800/600",
        ]),
        amenities: JSON.stringify([
          "حمامات سباحة متعددة",
          "شاطئ خاص",
          "غوص ومشروعات بحرية",
          "سبا ومركز علاج طبيعي",
        ]),
        floorPlans: JSON.stringify([
          { name: "شاليه ستوديو", image: "https://picsum.photos/seed/aq-plan1/500/300", area: "120 - 150 m²" },
          { name: "شاليه عائلي", image: "https://picsum.photos/seed/aq-plan2/500/300", area: "200 - 250 m²" },
        ]),
      },
      {
        titleAr: "جولدن فيو هيلز",
        locationAr: "التجمع الخامس",
        price: "يبدأ من 10,000,000 ج.م",
        area: "350 - 700 م²",
        descriptionAr: "فيلا مستقلة فاخرة في أرقى مناطق التجمع الخامس. تصميم معماري فريد يوفر خصوصية تامة مع حدائق واسعة ومرافق حصرية.",
        status: "متاح للبيع",
        type: "فيلات مستقلة",
        images: JSON.stringify([
          "https://picsum.photos/seed/goldenview1/800/600",
          "https://picsum.photos/seed/goldenview2/800/600",
        ]),
        amenities: JSON.stringify([
          "حديقة خاصة واسعة",
          "حمام سباحة خاص",
          "جراج لـ 3 سيارات",
          "غرفة حراس",
          "مصعد داخلي",
        ]),
        floorPlans: JSON.stringify([
          { name: "فيلا كلاسيك", image: "https://picsum.photos/seed/gv-plan1/500/300", area: "350 - 500 m²" },
          { name: "قصر ملكي", image: "https://picsum.photos/seed/gv-plan2/500/300", area: "550 - 700 m²" },
        ]),
      },
      {
        titleAr: "رويال تاورز",
        locationAr: "المنصورة الجديدة",
        price: "يبدأ من 2,800,000 ج.م",
        area: "130 - 220 م²",
        descriptionAr: "أبراج سكنية حديثة في المنصورة الجديدة بتصاميم عصرية وجودة بناء استثنائية. شقق فسيحة بإطلالات مميزة ومرافق خدمية متكاملة.",
        status: "تحت الإنشاء",
        type: "أبراج سكنية",
        images: JSON.stringify([
          "https://picsum.photos/seed/royaltowers1/800/600",
          "https://picsum.photos/seed/royaltowers2/800/600",
        ]),
        amenities: JSON.stringify([
          "لوبي فندقي",
          "حمام سباحة مشترك",
          "صالة رياضية",
          "منطقة لعب أطفال",
          "أمن وحراسة 24/7",
        ]),
        floorPlans: JSON.stringify([
          { name: "شقة ثلاث غرف", image: "https://picsum.photos/seed/rt-plan1/500/300", area: "130 - 160 m²" },
          { name: "بنتهاوس", image: "https://picsum.photos/seed/rt-plan2/500/300", area: "200 - 220 m²" },
        ]),
      },
      {
        titleAr: "منتجع لاجونا بيتش",
        locationAr: "الغردقة",
        price: "يبدأ من 4,200,000 ج.م",
        area: "100 - 280 م²",
        descriptionAr: "منتجع سياحي فاخر على شواطئ البحر الأحمر في الغردقة. يوفر تجربة عطلات استثنائية مع مرافق غوص ومشروعات بحرية عالمية المستوى.",
        status: "متاح للبيع",
        type: "منتجع سياحي",
        images: JSON.stringify([
          "https://picsum.photos/seed/lagunabeach1/800/600",
          "https://picsum.photos/seed/lagunabeach2/800/600",
        ]),
        amenities: JSON.stringify([
          "شاطئ خاص بكورال ريف",
          "مركز غوص معتمد",
          "مطاعم بحرية",
          "حوض سباحة لاجونا",
          "أنشطة مائية متنوعة",
        ]),
        floorPlans: JSON.stringify([
          { name: "ستوديو بحري", image: "https://picsum.photos/seed/lb-plan1/500/300", area: "100 - 130 m²" },
          { name: "جناح عائلي", image: "https://picsum.photos/seed/lb-plan2/500/300", area: "220 - 280 m²" },
        ]),
      },
    ];

    for (const projectData of projects) {
      await db.project.create({ data: projectData });
    }

    return NextResponse.json({
      success: true,
      message: "تم إنشاء البيانات الأساسية بنجاح",
      admin: { id: admin.id, email: admin.email, username: admin.username },
      projectsCount: projects.length,
      // NOTE: Never expose credentials in API responses
    });
  } catch (error) {
    console.error("[SEED_ERROR]", error);
    const message = process.env.NODE_ENV === "development"
      ? String(error)
      : "خطأ في إنشاء البيانات الأساسية";
    return NextResponse.json(
      { error: "خطأ في إنشاء البيانات الأساسية", details: message },
      { status: 500 }
    );
  }
}
