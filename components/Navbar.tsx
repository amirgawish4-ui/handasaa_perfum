import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-yellow-500 p-4 flex justify-between items-center border-b border-yellow-600">
      <div className="flex items-center gap-3">
        {/* [السطر 8]: هنا مكان اللوجو بتاع البراند فوق */}
        <Image src="/logo.png" alt="هندسة بيرفيوم" width={50} height={50} className="rounded-full border border-yellow-500" />
        <span className="text-xl font-bold">هندسة بيرفيوم</span>
      </div>
      
      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:text-white">الرئيسية</Link>
        
        {/* [السطر 18]: امسح اللينك ده وحط لينك موقع تبر مكانه */}
        <a href="https://tepar-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          اكسسوارات تبر
        </a>
        
        {/* [السطر 22]: امسح اللينك ده وحط لينك موقع عطور محاكاة (طيب) مكانه */}
        <a href="https://tatayab.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          عطور محاكاة
        </a>
      </div>
    </nav>
  );
}