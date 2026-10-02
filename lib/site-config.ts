// الملف: lib/site-config.ts
export const SITE_CONFIG = {
  brandName: "هندسة بيرفيوم - Handasa Perfume",
  
  // [السطر رقم 5] - حط هنا لينك صفحة الفيسبوك بتاعتكم
  facebookUrl: "https://facebook.com/YOUR_PAGE_LINK",

  // [السطر رقم 8] - حط هنا رقم الواتساب لاستقبال الطلبات (بالكود الدولي بدون علامة +، مثلاً: 2010xxxxxxxx)
  whatsappNumber: "2010XXXXXXXX",

  // [السطر رقم 11] - حط هنا لينك موقع اكسسوارات تِبـر الخارجي
  tabarUrl: "https://tabar-store.com",

  // [السطر رقم 14] - حط هنا لينك موقع عطور المحاكاة (تطيب)
  tatayebUrl: "https://tatayeb-store.com",

  // [السطر رقم 17] - حط هنا لينك بروفايل لينكد إن الخاص بك (لإضافته في حقوق الملكية أسفل الموقع)
  linkedinUrl: "https://linkedin.com/in/amir-gawish",

  // [السطر رقم 20] - رابط اللوجو العلوي للموقع
  topLogoUrl: "/images/logo.png",

  // [السطر رقم 23] - رابط اللوجو السفلي للموقع (الفوتر)
  bottomLogoUrl: "/images/logo.png",

  // الأسعار الأساسية الثابتة
  prices: {
    rose: 30,        // سعر الوردة الواحدة
    babyFlower: 45,  // سعر إضافة البيبي فلاور
    butterfly: 30,   // سعر فراشات الزينة
  },

  // أسعار الشحن التلقائية حسب المحافظة
  shippingRates: {
    "كفر الشيخ والبحيرة": 65,
    "محافظات بحري": 80,
    "قبلي / الصعيد": 90,
    "سيناء": 100,
  }
};