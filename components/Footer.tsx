export default function Footer() {
  return (
    <footer className="bg-black text-center p-6 text-yellow-500 border-t border-yellow-600 mt-10">
      <p className="mb-2">معانا الحياة ريحتها حلوة</p>
      <p>
        Made & Developed by{' '}
        {/* [السطر 9]: امسح اللينك ده وحط رابط بروفايل لينكد إن بتاعك هنا */}
        <a 
          href="https://www.linkedin.com/in/amir-gawish-3b7173403?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="underline font-bold text-white hover:text-yellow-400"
        >
          Amir Gawish
        </a>
      </p>
    </footer>
  );
}