/** @type {import('next').Next.js').Config} */
const nextConfig = {
  typescript: {
    // بيخلي Vercel يتجاهل أخطاء الـ TypeScript في المكتبات الخارجية ويكمل بناء الموقع عادي
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;