import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

export default function FloatingSocials() {
  // [السطر 4]: حط لينك صفحة الفيسبوك بتاعتك هنا بين العلامتين
  const facebookLink = "https://www.facebook.com/share/19n1gxAxMd/";
  
  // [السطر 7]: حط رقم الواتساب بتاعك هنا بصيغة دولية (مثلاً: 201012345678)
  const whatsappNumber = "20106651085";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=مرحباً، أريد الاستفسار عن الأوردر`;

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">
      {/* [السطر 14]: زر الفيسبوك */}
      <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition">
        <FaFacebook size={24} />
      </a>
      {/* [السطر 18]: زر الواتساب */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition">
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
}