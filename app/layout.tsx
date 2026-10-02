import './globals.css';

export const metadata = {
  title: 'هندسة بيرفيوم',
  description: 'معانا الحياة ريحتها حلوة',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}